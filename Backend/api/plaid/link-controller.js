require('dotenv').config();
const express = require('express');
// const app = express();
const { Configuration, PlaidApi, Products, PlaidEnvironments} = require('plaid');
const util = require('util');
const bodyParser = require('body-parser');
const moment = require('moment');
const cors = require('cors');
const AppError = require('../../middleware/appError');
const Transaction = require('../../utils/transaction');
const TransactionRecuring = require('../../utils/transactionRecurring');

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || 'sandbox';
const PLAID_COUNTRY_CODES = process.env.PLAID_COUNTRY_CODES;
const PLAID_PRODUCTS = (process.env.PLAID_PRODUCTS || Products.Transactions).split(
    ',',
  );

  console.log("Plaid Client ID:", PLAID_CLIENT_ID);
  console.log("Plaid Secret:", PLAID_SECRET);
  console.log("Plaid Environment:", PLAID_ENV);
  console.log("Plaid Country Codes:", PLAID_COUNTRY_CODES);
  console.log("Plaid Products:", PLAID_PRODUCTS);
  
const PLAID_REDIRECT_URI = process.env.PLAID_REDIRECT_URI || '';

const configuration = new Configuration({
    basePath: PlaidEnvironments[PLAID_ENV],
    baseOptions: {
      headers: {
        'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
        'PLAID-SECRET': PLAID_SECRET,
        'Plaid-Version': '2020-09-14',
      },
    },
  });

  console.log("Configuration:", configuration);

const client = new PlaidApi(configuration);

  const app = express();
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());
app.use(cors());
// setup .env file
app.post('/api/info', function (request, response, next) {
    response.json({
      item_id: ITEM_ID,
      access_token: ACCESS_TOKEN,
      products: PLAID_PRODUCTS,
    });
  });

// for parsing json 

const createToken = async (req, res, next) => {
    Promise.resolve()
      .then(async function () {
        const configs = {
          user: {
            // This should correspond to a unique id for the current user.
            client_user_id: 'user-id',
          },
          client_name: 'Plaid Quickstart',
          products: ["transactions"],
          country_codes: ["US"],
          language: 'en',
          "client_id": PLAID_CLIENT_ID,
          "secret": PLAID_SECRET,
        };
        console.log("------------------------------------------------------------");
        console.log("Link Configs:", configs);
        console.log("------------------------------------------------------------");
        if (PLAID_REDIRECT_URI !== '') {
          configs.redirect_uri = PLAID_REDIRECT_URI;
        }
        let createTokenResponse;
        try {
          createTokenResponse = await client.linkTokenCreate(configs);
          res.status(200).json(createTokenResponse.data);
        console.log("Create Token Response:", createTokenResponse);
        } catch (error) { 
          console.log("CREATE_TOKEN_DEBUG:", error);
          return next(new AppError('Could not generate token response'));
          
        }
      })
      .catch(next);
}

  let ACCESS_TOKEN;

  const exchangeToken = async (req, res, next) => {

    const publicToken = req.body.public_token;
    try {
        const tokenResponse = await client.itemPublicTokenExchange({
        public_token: publicToken,
      });
    
      // These values should be saved to a persistent database and
      // associated with the currently signed-in user
      const accessToken = tokenResponse.data.access_token;
      ACCESS_TOKEN = accessToken;
      const itemID = tokenResponse.data.item_id;
      console.log('-------------------------------------------------------------------------------------------');
      console.log(accessToken);
      console.log(itemID);
      console.log('-----------------------------------------------------------------------------------------------');
      res.status(200).json({ public_token_exchange: 'complete' });
    } catch (error) {
      console.log("Error:", error);
      return next(new AppError('Could not generate exchange token'));
      // handle error
    }
  } 

const plaidGetTransactions = async (req, res, next) => {
  Promise.resolve()
      .then(async function () {
        // Set cursor to empty to receive all historical updates
        let cursor = null;
        console.log('ACCESS_TOKEN_DEBUG: ' + ACCESS_TOKEN);
        // New transaction updates since "cursor"
        let added = [];
        let modified = [];
        // Removed transaction ids
        let removed = [];
        let hasMore = true;
        // Iterate through each page of new transaction updates for item
        while (hasMore) {
          const req = {
            access_token: ACCESS_TOKEN,
            cursor: cursor,
          };
          try {
            const res = await client.transactionsSync(req);
            const data = res.data;
            //console.log(data);
            // Add this page of results
            added = added.concat(data.added);
            modified = modified.concat(data.modified);
            removed = removed.concat(data.removed);
            hasMore = data.has_more;
            // Update cursor to the next cursor
            cursor = data.next_cursor;
          } catch (error) {
            console.log("Error:", error);
            return next(new AppError('Could sync transactions'));
          }
        }
  
        const compareTxnsByDateAscending = (a, b) => (a.date > b.date) - (a.date < b.date);
        // Return the 8 most recent transactions
        const recently_added = [...added].sort(compareTxnsByDateAscending);
        // const monthly_transactions = [...added].sort(compareTxnsByDateAscending).slice(-30);
        let transactionList = [];
        let i = 0;
        recently_added.forEach(plaidTransactions => {
          console.log(`${plaidTransactions.date}`);
          let name = plaidTransactions.name;
          if (name === "") {
            name = plaidTransactions.merchant_name;
          }
          let breadboxTransaction = new Transaction({
            accountId: plaidTransactions.account_id, 
            accountOwner: plaidTransactions.account_owner,
            amount: plaidTransactions.amount,
            date: plaidTransactions.date,
            catagory: plaidTransactions.category,
            merchantName: name,
            paymentChannel: plaidTransactions.payment_channel, 
            paymentMeta: plaidTransactions.payment_meta.payee,
            currency: plaidTransactions.iso_currency_code,
          });
          console.log(`Transaction #[${++i}]: ${breadboxTransaction}`);
          transactionList.push(breadboxTransaction);
        });

        req = {
          access_token: ACCESS_TOKEN,
        };
        let transactionRecuringList = [];
        try {

          const response = await client.transactionsRecurringGet(req);
          let inflowStreams = response.data.inflow_streams;
          let outflowStreams = response.data.outflow_streams;
          console.log(`out----------------------------------------------------------->`);
          console.log(outflowStreams);

         
          outflowStreams.forEach(outflowTransactions => {
          console.log(`OUTFLOW: ${outflowTransactions}`);
          let name = outflowTransactions.merchant_name;
          console.log("NAME_DEBUG1 " + name);
          if (name === "") {
            name = outflowTransactions.description;
          } 
          if (name === "") {
            name = outflowTransactions.personal_finance_category.primary;
          }
          let breadboxTransactionRecuring = {
            accountId: outflowTransactions.account_id,
            amount: outflowTransactions.average_amount.amount,
            first_date: outflowTransactions.first_date,
            last_date: outflowTransactions.last_date,
            frequency: outflowTransactions.frequency,
            catagory: outflowTransactions.personal_finance_category,
            merchantName: name,
            isActive: outflowTransactions.is_active,
            currency: outflowTransactions.iso_currency_code,
            description: outflowTransactions.description,
          }
          transactionRecuringList.push(breadboxTransactionRecuring);
        });
        } catch (err)  {
          console.log(`RECURING_TRANSACTION_DEBUG: ${err}`);
          res.status(500).json(err);
        }

        
        res.status(200).json({
          one_time_cost: transactionList,
          recuring_cost: transactionRecuringList
        });
      })
      .catch(next);
}

// gets the entire income stream no restraints 
const plaidGetIncomeStream = async (req, res, next) => {
  let inFlowTransactionList = [];
  try {
    req = {
      access_token: ACCESS_TOKEN,
    };
    const response = await client.transactionsRecurringGet(req);
    let inflowStreams = response.data.inflow_streams;
    // console.log(`<-----------------------------------------------------------in`);
    // console.log(inflowStreams);
    
    
    inflowStreams.forEach(inFlowTransaction => {
      // console.log(`INFLOW: ${inflowStreams}`);
      let name = inFlowTransaction.merchant_name;
      if (name === "") {
        name = inFlowTransaction.personal_finance_category.primary;
      } 
      if (name === "") {
        name = inFlowTransaction.category[0];
      }
      console.log(inFlowTransaction.last_amount.amount);
      let breadboxInFlowTransactionRecuring = new TransactionRecuring({
        accountId: inFlowTransaction.account_id,
        amount: inFlowTransaction.last_amount.amount,
        first_date: inFlowTransaction.first_date,
        last_date: inFlowTransaction.last_date,
        frequency: inFlowTransaction.frequency,
        catagory: inFlowTransaction.personal_finance_category,
        merchantName: name,
        isActive: inFlowTransaction.is_active,
        currency: inFlowTransaction.iso_currency_code,
        description: inFlowTransaction.description,
      });
      inFlowTransactionList.push(breadboxInFlowTransactionRecuring);
    });
    res.status(200).json(inFlowTransactionList);
  } catch(err)  {
    res.status(500).json(err);
    console.log(err);
  }
}

const plaidGetBalance = async (req, res, next ) => {
    Promise.resolve()
        .then(async function () {
            const balanceResponse = await client.accountsBalanceGet({
            access_token: ACCESS_TOKEN,
            });
            console.log(balanceResponse);
            res.status(200).json(balanceResponse.data);
        })
        .catch(next);
}


// gets the combined income for a certain month and year 
const getIncomeForMonth = async (date) => {
  try {
    // Accessing the JSON data from the request
    let monthTotal = 0; // Initialize monthTotal
    const searchYear = parseInt(date.substring(0, 4), 10);
    const searchMonth = parseInt(date.substring(5, 7), 10);

    // Define the function to compare transactions by date
    const compareTxnsByDateAscending = (a, b) => (new Date(a.date) - new Date(b.date));

    try {
      const response = await client.transactionsRecurringGet({ access_token: ACCESS_TOKEN });
      let inflowStreams = response.data.inflow_streams;

      // Filter and process inflow streams
      inflowStreams.forEach(inFlowTransaction => {
        let transactionYear = new Date(inFlowTransaction.first_date).getFullYear();
        let transactionMonth = new Date(inFlowTransaction.first_date).getMonth() + 1; // getMonth() is 0-indexed
        if (transactionYear === searchYear && transactionMonth === searchMonth) {
          monthTotal += inFlowTransaction.last_amount.amount;
        }
      });

      // Filter one-time transactions for the specific month
      const filteredTransactions = (await client.transactionsSync({ access_token: ACCESS_TOKEN })).data.added
        .filter(txn => {
          const txnDate = new Date(txn.date);
          return txnDate.getFullYear() === searchYear && txnDate.getMonth() + 1 === searchMonth;
        })
        .sort(compareTxnsByDateAscending);

      // Sum the amounts from filtered transactions
      filteredTransactions.forEach(txn => {
        monthTotal += txn.amount;
      });

      return {
        totalIncomeForMonth: monthTotal,
        year: searchYear
      };

    } catch (err) {
      throw err;
    }
  } catch (err) {
    throw err;
  }
}

const plaidGetTotalMonthlyIncome = async (req, res, next) => {
  const date = req.body.date;
  const searchYear = parseInt(date.substring(0, 4), 10); // Extract year
  const MONTHS = 12;
  let monthlyIncomes = [];
  let totalAmountYear = 0;
  try {
    for (let i = 0; i < MONTHS; i++) {
      let dateObject = new Date(searchYear, i, 1); // Set to first day of each month
      let dateString = `${dateObject.getFullYear()}-${String(dateObject.getMonth() + 1).padStart(2, '0')}-01`;
      let incomeForMonth = await getIncomeForMonth(dateString);
      totalAmountYear += incomeForMonth.totalIncomeForMonth;
      monthlyIncomes.push({
        month: i + 1,
        year: incomeForMonth.year,
        income: incomeForMonth.totalIncomeForMonth,
      });
    }
    res.status(200).json({
      monthly_break_down: monthlyIncomes,
      yearly_total: totalAmountYear});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }

};

const plaidGetAccounts = (req, res, next ) => {
    Promise.resolve()
        .then(async function () {
            const balanceResponse = await client.accountsBalanceGet({
            access_token: ACCESS_TOKEN,
            });
            console.log(balanceResponse);
            res.json(balanceResponse.data);
        })
        .catch(next);
}

    module.exports = {
        createToken,
        exchangeToken,
        plaidGetBalance,
        plaidGetAccounts,
        plaidGetTransactions,
        plaidGetIncomeStream,
        plaidGetTotalMonthlyIncome
  }
