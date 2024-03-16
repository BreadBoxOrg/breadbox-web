// var router = express.Router();
// const { dotenv } = require("dotenv");

// var express = require('express');
require("dotenv").config({ path: '../../.env' });
const { OpenAI } = require("openai");

console.log(process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_KEY
});

console.log(openai);

sendMessage("hello, what are tomatoes?");

async function sendMessage(message) {

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Adjust model as needed
      messages: [ 
        {"role": "system", "content": "You are a helpful gardening assistant that has extensive knowledge about plants"},
        {"role": "system", "content": "Specifically, you will give information about watering schedule, amount of sunlight, nutrient schedule, and pruning schedule if applicable"},
        {"role": "user", "content": message }],
      // stream: true
  });

  console.log(completion.choices[0].message.content);
  // module.exports = {sendMessage};
  return completion.choices[0].message.content;
}


