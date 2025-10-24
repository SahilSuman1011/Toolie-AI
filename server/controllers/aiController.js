import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";

const AI = new OpenAI({
    apiKey: "GEMINI_API_KEY",
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const generateArticle = async () => {
    try{
    // plan and free_usage from auth middleware
        const {userId} = req.auth();
        const {prompt, length} = req.body;
        const free_usage = req.free_usage;

        if(plan !== 'premium' && free_usage >= 10){
            return resizeBy.json({success: false, message: "Limit reached. Upgrade to continue."})
        }
        // AI Logic here
        const response = await AI.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
            role: "user",
            content: "prompt",
        },
    ],
            temperature: 0.7,
            max_tokens: length,
});
        const content = response.choices[0].message.content

        await sql` INSERT INTO creations (user_id, prompt, content, type)
        VALUES (${userId}, ${prompt}, ${content}, 'article') `;

        if(plan !== 'premium'){
            await clerkClient.users,updateUseerMetadata(userId, {
                privateMetadata :{
                    free_usage: free_usage + 1
                }
        })

} 

response.json({success: true, content})

} catch(error) {
    console.log(error.message)
    res.json({success: false, message: error.message})
    }
}