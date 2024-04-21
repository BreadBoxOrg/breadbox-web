/*
  * File: 
    *sendchat.js

  * Description: 
    * This file sends the message to the backend and recieves a response
    * It uses the fetch API to send the message to the backend
    * It uses the response from the backend to get the response from the chatbot
    * Sends the message and the financial data when needed to the backend.
*/
async function sendMessage(message, financialData) {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    const response = await fetch(`${backendURL}/chat/sendmessage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({message: message, financialData: financialData})
    });
    const data = await response.json();
    return data.completion.choices[0].message.content;
}

module.exports = {sendMessage};