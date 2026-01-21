import { CohereClient } from "cohere-ai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import {v2 as cloudinary} from 'cloudinary';
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import OpenAI from 'openai';

const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY,
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Log API key status on startup
console.log('🔑 Cohere API Key loaded:', process.env.COHERE_API_KEY ? `${process.env.COHERE_API_KEY.substring(0, 10)}...` : 'MISSING');
console.log('🔑 OpenAI API Key loaded:', process.env.OPENAI_API_KEY ? `${process.env.OPENAI_API_KEY.substring(0, 10)}...` : 'MISSING');

// Comprehensive NSFW and inappropriate keyword blocklist
const BLOCKED_KEYWORDS = [
    // Explicit sexual terms
    'nude', 'naked', 'nsfw', 'porn', 'sex', 'sexual', 'xxx', 'erotic', 'adult',
    'bikini', 'underwear', 'lingerie', 'topless', 'breast', 'boob', 'nipple',
    'penis', 'vagina', 'genital', 'dick', 'cock', 'pussy', 'ass', 'butt',
    'seductive', 'sexy', 'hot', 'aroused', 'intimate', 'provocative',
    'cleavage', 'revealing', 'exposed', 'sensual', 'passionate',
    // Violence
    'blood', 'gore', 'violent', 'kill', 'murder', 'dead', 'death', 'torture',
    'gun', 'weapon', 'knife', 'shoot', 'stab', 'attack', 'brutal',
    // Hate speech
    'racist', 'nazi', 'hate', 'supremacist', 'terrorist',
    // Minors (combined with suggestive content)
    'child', 'kid', 'teen', 'young', 'minor', 'loli', 'shota', 'underage',
    // Other inappropriate
    'drug', 'cocaine', 'heroin', 'meth', 'weed', 'marijuana'
];

// Check if prompt contains blocked keywords
const containsBlockedKeywords = (text) => {
    const lowerText = text.toLowerCase();
    return BLOCKED_KEYWORDS.some(keyword => lowerText.includes(keyword));
};

// OpenAI Moderation API check (FREE)
const checkContentModeration = async (text) => {
    try {
        const moderation = await openai.moderations.create({
            model: "omni-moderation-latest", // Recommended model
            input: text,
        });
        
        const result = moderation.results[0];
        const flagged = result.flagged;
        const categories = result.categories;
        
        // Check if any harmful category is flagged
        const flaggedCategories = Object.keys(categories).filter(key => categories[key]);
        
        return {
            flagged,
            categories: flaggedCategories,
            scores: result.category_scores
        };
    } catch (error) {
        console.error('⚠️ OpenAI Moderation Error:', error.message);
        
        // If rate limit (429), skip OpenAI check and rely on keyword blocklist only
        if (error.status === 429) {
            console.log('⚠️ OpenAI rate limit reached, skipping AI moderation (keyword check already passed)');
            return { flagged: false, categories: [], scores: {} };
        }
        
        // For other errors, be cautious and flag it
        return { flagged: true, categories: ['moderation_error'], scores: {} };
    }
};

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
            return await cohere.chat({
                model: "command-r-08-2024",
                message: prompt,
                maxTokens: length,
                temperature: 0.7,
            });
        });
        const content = response.text

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
            return await cohere.chat({
                model: "command-r-08-2024",
                message: prompt,
                maxTokens: 100,
                temperature: 0.7,
            });
        });
        const content = response.text

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

        // STEP 1: Check blocked keywords first (instant, free)
        if (containsBlockedKeywords(prompt)) {
            return res.status(400).json({
                success: false,
                message: "Your prompt contains inappropriate content. Please try a different description."
            });
        }

        // STEP 2: OpenAI Moderation check (free API)
        const moderationResult = await checkContentModeration(prompt);
        
        if (moderationResult.flagged) {
            
            // Log flagged attempt to database for tracking
            await sql`
                INSERT INTO creations (user_id, prompt, content, type, publish, is_flagged, moderation_status, moderation_categories)
                VALUES (
                    ${userId},
                    ${prompt},
                    '',
                    'image',
                    false,
                    true,
                    'rejected',
                    ${JSON.stringify(moderationResult.categories)}
                )
            `;
            
            return res.status(400).json({
                success: false,
                message: "Your prompt violates our content policy. Please ensure your request is appropriate and respectful."
            });
        }

        // STEP 3: Proceed with image generation if passed moderation
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

        // STEP 4: Save to database with moderation info
        // If prompt passed moderation, allow publish only if user requested it
        // Otherwise, keep it private
        await sql`
            INSERT INTO creations (user_id, prompt, content, type, publish, is_flagged, moderation_status, moderation_categories)
            VALUES (
                ${userId},
                ${prompt},
                ${secure_url},
                'image',
                ${publish ?? false},
                false,
                'approved',
                ${JSON.stringify([])}
            )
        `;

        res.json({success: true, content: secure_url})

} catch(error) {
    console.error('Generate Image Error:', error.message);
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
            return await cohere.chat({
                model: "command-r-08-2024",
                message: prompt,
                maxTokens: 1500,
                temperature: 0.7,
            });
        });

        const content = response.text;

        await sql` INSERT INTO creations (user_id, prompt, content, type)
            VALUES (${userId}, ${JSON.stringify({headline, about, experience, skills})}, ${content}, 'linkedin-optimize') `;

        if(plan !== 'premium'){
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            })
        }

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
