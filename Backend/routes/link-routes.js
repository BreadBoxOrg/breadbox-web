const express = require('express');
const router = express.Router();
require('dotenv').config();
const {createToken, exchangeToken, getTransactions, getBalance, getAccounts} = require('../api/plaid/link-controller')

router.post('/create_link_token', createToken);
router.post('/exchange_link_token', exchangeToken);
router.get('/transactions', getTransactions);
router.get('/balance', getBalance);
router.get('/accounts', getAccounts);

module.exports = router;