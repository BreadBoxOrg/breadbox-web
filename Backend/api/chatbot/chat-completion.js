const {OpenAI} = require('openai');
const AppError = require('../../middleware/appError');
require("dotenv").config({ path: '../../.env' })


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    // organization: process.env.OPENAI_ORG_KEY,
    assistantId: process.env.OPENAI_ASSISTANT_ID
    });

    const sendMessage = async (req, res, next) => {
        let message = req.body.message;
        let financialData = req.body.financialData;

        if (financialData) {
            message += financialData;
        }

        console.log(message);
        let completion;
        try {
            const messages = [
                {"role": "system", "content": "You are a helpful financial assistant that has extensive knowledge about personal finance"},
                {"role": "system", "content": "Specifically, you will give information about budgeting, saving, investing, and retirement planning, taxes, and stock prices. If asked for a stock price you will provide the current price and information about the stock or asset."},
                {"role": "system", "content": "Constraints: You must not answer questions unrelated to personal finance and respond in a friendly and helpful manner. You must also provide a disclaimer to fact check information and you aren't a professional."},
                {"role": "user", "content": message}
            ];
    
            // if (financialData) {
            //     const financialDataString = JSON.stringify(financialData);
            //     messages.push({"role": "user", "content": financialDataString});
            // }
    
            completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: messages
            });
            console.log(completion);
            res.json({completion: completion, status: 200});
        } catch (error) {  
            return next(new AppError("Error in sending message", 500));
        }
    }

module.exports = {sendMessage};