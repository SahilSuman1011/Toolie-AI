import sql from "../configs/db.js"


export const getUserCreations = async (req, res) => {
    try{
        const {userId} = req.auth;
        // creation dhundho user ki
        const creations = await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_At DESC`;

        

    } catch(error){
        res.json({success: false, message: error.message});
    }
}