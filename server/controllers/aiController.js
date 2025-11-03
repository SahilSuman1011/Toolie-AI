import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import { response } from "express";
import {v2 as cloudinary} from 'cloudinary';
import axios from "axios";

const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

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
        // AI Logic here 
        const response = await AI.chat.completions.create({
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
        // AI Logic here 
        const response = await AI.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: [{role: "user", content: prompt,},],
            temperature: 0.7,
            max_tokens: 100,
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
    console.log(error.message)
    res.json({success: false, message: error.message})
    }
}

export const generateImage = async (req, res) => {
    try{
    // plan and free_usage from auth middleware
        const {userId} = req.auth();
        const {prompt, publish} = req.body;
        const plan = req.plan;

        if(plan !== 'premium'){
            return res.json({success: false, message: " This feature is only available for premium subscriptions."})
        }
        // AI Logic here 
        const formData = new FormData()
        formData.append('prompt', prompt)
        const {data} = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
            Headers: {'x-api-key': process.env.CLIPDROP_API_KEY,},
            responseType: 'arraybuffer',
        })

        const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`;

        const {secure_url} = await cloudinary.uploader.upload(base64Image)

        await sql` INSERT INTO creations (user_id, prompt, content, type, publish)
        VALUES (${userId}, ${prompt}, ${content}, 'image', ${publish ?? false}) `;

res.json({success: true, content: secure_url})

} catch(error) {
    console.log(error.message)
    res.json({success: false, message: error.message})
    }
}