const express = require('express');
const router = express.Router();
// const chatCompletionValidator = require('../middleware/validatiors');

const { sendMessage } = require('../api/chatbot/chat-completion');


router.post("/sendmessage", sendMessage);

module.exports = router;