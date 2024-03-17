// var router = express.Router();
// const { dotenv } = require("dotenv");

// var express = require('express');



// const configuration = new Configuration({
//   organization: "org-sdfds34dsf",
//   apiKey: process.env.OPENAI_API_KEY,
// });
require("dotenv").config({ path: '../../.env' })
const { OpenAI } = require("openai");

console.log(process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function main() {
  try {

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();