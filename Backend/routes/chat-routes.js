const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
// const chatCompletionValidator = require('../middleware/validatiors');
const app = express();

app.use(bodyParser.json());

const { sendMessage } = require('../api/chatbot/chat-completion');


router.post("/sendmessage", sendMessage);

module.exports = router;