const {OpenAI} = require('openai');
const AppError = require('../../middleware/appError');
require("dotenv").config({ path: '../../.env' })


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    // organization: process.env.OPENAI_ORG_KEY,
    assistantId: process.env.OPENAI_ASSISTANT_ID
    });


const sendMessage = async (req, res, next) => {

    const message = req.body.message;

    console.log(message);
    console.log(openai);
    let completion;
    try {
        completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {"role": "system", "content": "You are a helpful financial assistant that has extensive knowledge about personal finance"},
                {"role": "system", "content": "Specifically, you will give information about budgeting, saving, investing, and retirement planning"},
                {"role": "system", "content": "Constraints: You must not answer questions unrelated to personal finance and respod in a friendly and helpful manner. You must also provide a disclaimer to fact check information and you aren't a professional."},
                {"role": "user", "content": message}
            ]
        });
        res.json({completion: completion, status: 200});
    } catch (error) {  
        return next(new AppError("Error in sending message", 500));
    }
}

module.exports = {sendMessage};