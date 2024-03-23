const express = require('express');
const router = express.Router();
require('dotenv').config();
const {createToken,
    exchangeToken,
    plaidGetBalance,
    plaidGetAccounts,
    plaidGetTransactions,
    plaidGetIncomeStream,
    plaidGetTotalMonthlyIncome,
    plaidGetCategories} = require('../api/plaid/link-controller')

router.post('/create_link_token', createToken);
router.post('/exchange_link_token', exchangeToken);
router.get('/transactions', plaidGetTransactions);
router.get('/balance',  plaidGetBalance);
router.get('/accounts', plaidGetAccounts);
router.get('/recurringIncome', plaidGetIncomeStream);
router.post('/totalMonthlyIncome', plaidGetTotalMonthlyIncome);
router.get('/categories', plaidGetCategories);

module.exports = router;