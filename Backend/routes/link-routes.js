/*
  * File: 
    *link-routes.js

  * Description: 
    *This file contains the routes for the Plaid API.
    *The routes are used to create a link token, exchange a public token for an access token, get transactions, get balance, get accounts, get recurring income, get total monthly income, and get categories.
  * 
*/

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