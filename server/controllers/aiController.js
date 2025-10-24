

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
        

    } catch(error) {

    }
}