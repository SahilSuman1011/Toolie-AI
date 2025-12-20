import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import {v2 as cloudinary} from 'cloudinary';
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

// Log API key status on startup (first 10 chars only for security)
console.log('🔑 Gemini API Key loaded:', process.env.GEMINI_API_KEY ? `${process.env.GEMINI_API_KEY.substring(0, 10)}...` : 'MISSING');

// Helper function for retry logic with exponential backoff
const retryWithBackoff = async (fn, maxRetries = 5, baseDelay = 3000) => {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            const isRateLimitError = error.status === 429 || 
                                    error.response?.status === 429 ||
                                    error.message?.includes('429') ||
                                    error.message?.includes('rate limit') ||
                                    error.constructor.name === 'RateLimitError';
            
            if (isRateLimitError && i < maxRetries - 1) {
                // Exponential backoff: 3s, 6s, 12s, 24s
                const delay = baseDelay * Math.pow(2, i);
                console.log(`⏳ Rate limit hit. Waiting ${delay/1000}s before retry... (Attempt ${i + 1}/${maxRetries})`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                throw error;
            }
        }
    }
};

export const generateArticle = async (req, res) => {
    try{
    // plan and free_usage from auth middleware
        const {userId} = req.auth();
        const {prompt, length} = req.body;
        const free_usage = req.free_usage;
        const plan = req.plan;

        if (!plan) {
            return res.status(400).json({success: false, message: "User plan not found"});
        }

        if (!prompt || !length) {
            return res.status(400).json({success: false, message: "Prompt and length are required"});
        }

        if(plan !== 'premium' && free_usage >= 10){
            return res.json({success: false, message: "Limit reached. Upgrade to continue."})
        }
        // AI Logic here with retry
        const response = await retryWithBackoff(async () => {
            return await AI.chat.completions.create({
                model: "gemini-2.0-flash",
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
                temperature: 0.7,
                max_tokens: length,
            });
        });
        const content = response.choices[0].message.content

        await sql` INSERT INTO creations (user_id, prompt, content, type)
        VALUES (${userId}, ${prompt}, ${content}, 'article') `;

        if(plan !== 'premium'){
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            })

} 

res.json({success: true, content})

} catch(error) {
    console.log(error.message)
    res.json({success: false, message: error.message})
    }
}

export const generateBlogTitle = async (req, res) => {
    try{
    // plan and free_usage from auth middleware
        const {userId} = req.auth();
        const {prompt} = req.body;
        const free_usage = req.free_usage;
        const plan = req.plan;

        if(plan !== 'premium' && free_usage >= 10){
            return res.json({success: false, message: "Limit reached. Upgrade to continue."})
        }
        // AI Logic here with retry
        const response = await retryWithBackoff(async () => {
            return await AI.chat.completions.create({
                model: "gemini-2.0-flash",
                messages: [{role: "user", content: prompt,},],
                temperature: 0.7,
                max_tokens: 100,
            });
        });
        const content = response.choices[0].message.content

        await sql` INSERT INTO creations (user_id, prompt, content, type)
        VALUES (${userId}, ${prompt}, ${content}, 'blog-title') `;

        if(plan !== 'premium'){
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            })
} 

res.json({success: true, content})

} catch(error) {
    console.error('Generate Blog Title Error:', error);
    const isRateLimitError = error.status === 429 || error.response?.status === 429 || error.constructor.name === 'RateLimitError';
    const message = isRateLimitError 
        ? 'AI service is very busy right now. Please wait 2-3 minutes and try again, or try with shorter content.'
        : error.message || 'Failed to generate blog title';
    res.status(isRateLimitError ? 429 : 500).json({success: false, message})
    }
}

export const generateImage = async (req, res) => {
    try{
    // plan and free_usage from auth middleware
        const {userId} = req.auth();
        const {prompt, publish} = req.body;
        const plan = req.plan;

        if(plan !== 'premium'){
            return res.json({success: false, message: "This feature is only available for premium subscriptions."})
        }
        // AI Logic here 
        const formData = new FormData();
        formData.append('prompt', prompt);

        const headers = {
            ...formData.getHeaders(),
            'x-api-key': process.env.CLIPDROP_API_KEY,
        };

        const response = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
            headers,
            responseType: 'arraybuffer',
        });

        const data = response.data;
        const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`;

        const uploadResult = await cloudinary.uploader.upload(base64Image);
        const secure_url = uploadResult.secure_url;

        await sql` INSERT INTO creations (user_id, prompt, content, type, publish)
        VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false}) `;

        res.json({success: true, content: secure_url})

} catch(error) {
    console.error('Generate Image Error:', error);
    res.status(500).json({success: false, message: error.message || 'Failed to generate image'})
    }
}

export const removeImageBackground = async (req, res) => {
    try{
    // plan and free_usage from auth middleware
        const {userId} = req.auth();
        const image = req.file;
        const plan = req.plan;

        if(plan !== 'premium'){
            return res.json({success: false, message: "This feature is only available for premium subscriptions."})
        }
        // AI Logic here

        const {secure_url} = await cloudinary.uploader.upload(image.path,{
            transformation: [
                {
                    effect: 'background_removal',
                    background_removal: 'remove_the_background'
                }
            ]
    })

        await sql` INSERT INTO creations (user_id, prompt, content, type)
        VALUES (${userId}, 'Remove background from image', ${secure_url}, 'image') `;

        res.json({success: true, content: secure_url})

} catch(error) {
    console.error('Remove Image Background Error:', error);
    res.status(500).json({success: false, message: error.message || 'Failed to remove background'})
    }
}

export const removeImageObject = async (req, res) => {
    try{
    // plan and free_usage from auth middleware
        const {userId} = req.auth();
        const image = req.file;
        const {object} = req.body;
        const plan = req.plan;

        if(plan !== 'premium'){
            return res.json({success: false, message: "This feature is only available for premium subscriptions."})
        }
        // AI Logic here

        const {public_id} = await cloudinary.uploader.upload(image.path)

        const imageUrl = cloudinary.url(public_id, {
            transformation:[{effect: `gen_remove:${object}`}],
            resource_type: 'image'
        })
    

        await sql` INSERT INTO creations (user_id, prompt, content, type)
        VALUES (${userId}, ${`Removed ${object} from image`}, ${imageUrl}, 'image') `;

        res.json({success: true, content: imageUrl})

} catch(error) {
    console.error('Remove Image Object Error:', error);
    res.status(500).json({success: false, message: error.message || 'Failed to remove object'})
    }
}

export const linkedinOptimize = async (req, res) => {
    try {
        const {userId} = req.auth();
        const {headline, about, experience, skills} = req.body;
        const plan = req.plan;

        if(plan !== 'premium'){
            return res.json({success: false, message: "This feature is only available for premium subscriptions."})
        }

        if (!headline || !about || !experience) {
            return res.status(400).json({success: false, message: "Headline, about, and experience sections are required"});
        }

        const prompt = `Optimize the following LinkedIn profile sections for better visibility and impact:

Headline: ${headline}

About Section: ${about}

Experience: ${experience}

${skills ? `Skills: ${skills}

` : ''}Please enhance each section while maintaining authenticity and professionalism. Focus on:
1. SEO optimization with relevant keywords
2. Clear value proposition
3. Achievement-focused language
4. Industry-specific terminology
5. Engagement and readability
6. Quantifiable achievements and metrics
7. Leadership and expertise highlights

Return the optimized content in markdown format with the following sections:

## Optimized Headline
[Enhanced headline with strong keywords and value proposition]

## About Section
[Enhanced about section]

## Experience Highlights
[Enhanced experience section]

${skills ? `## Key Skills & Expertise
[Enhanced skills section]

` : ''}Make each section impactful, professional, and optimized for LinkedIn's algorithm while maintaining authenticity.`;

        const response = await retryWithBackoff(async () => {
            return await AI.chat.completions.create({
                model: "gemini-2.0-flash",
                messages: [{role: "user", content: prompt}],
                temperature: 0.7,
                max_tokens: 1500,
            });
        });

        const content = response.choices[0].message.content;

        await sql` INSERT INTO creations (user_id, prompt, content, type)
            VALUES (${userId}, ${JSON.stringify({headline, about, experience, skills})}, ${content}, 'linkedin-optimize') `;

        res.json({success: true, content})

    } catch(error) {
        console.error('LinkedIn Optimize Error:', error);
        const isRateLimitError = error.status === 429 || error.response?.status === 429 || error.constructor.name === 'RateLimitError';
        const message = isRateLimitError 
            ? 'AI service is very busy right now. Please wait 2-3 minutes and try again. Consider using shorter content if this persists.'
            : error.message || 'Failed to optimize LinkedIn profile';
        res.status(isRateLimitError ? 429 : 500).json({success: false, message})
    }
}

