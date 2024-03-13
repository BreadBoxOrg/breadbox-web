require('dotenv').config();
const express = require('express');
// const app = express();
const { Configuration, PlaidApi, Products, PlaidEnvironments} = require('plaid');
const util = require('util');
const bodyParser = require('body-parser');
const moment = require('moment');
const cors = require('cors');
const AppError = require('../../middleware/appError')

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
const PORT1 = 3000;
// const plaidClient = new plaid.Client({
//     clientID: PLAID_CLIENT_ID,
//     secret: PLAID_SECRET,
//     env: PLAID_ENV,

// }); 

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
          return next(new AppError('Could not generate token response'));
          console.log("Error:", error);
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

const getTransactions = async (req, res, next) => {
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
            console.log(data);
  
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
          // const res = await client.transactionsSync(req)
          // const data = res.data;
          // console.log(data);

          // // Add this page of results
          // added = added.concat(data.added);
          // modified = modified.concat(data.modified);
          // removed = removed.concat(data.removed);
          // hasMore = data.has_more;
          // // Update cursor to the next cursor
          // cursor = data.next_cursor;
        }
  
        const compareTxnsByDateAscending = (a, b) => (a.date > b.date) - (a.date < b.date);
        // Return the 8 most recent transactions
        const recently_added = [...added].sort(compareTxnsByDateAscending).slice(-8);
        //const monthly_transactions = [...added].sort(compareTxnsByDateAscending).slice(-30);
        res.json({recently_transactions: recently_added});
      })
      .catch(next);
}
  
const getBalance = (req, res, next ) => {
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
//     app.get('/api/balance', function (request, response, next) {
//         Promise.resolve()
//         .then(async function () {
//             const balanceResponse = await client.accountsBalanceGet({
//             access_token: ACCESS_TOKEN,
//             });
//             console.log(balanceResponse);
//             response.json(balanceResponse.data);
//         })
//         .catch(next);
//     });

const getAccounts = (req, res, next ) => {
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
//     app.get('/api/accounts', function (request, response, next) {
//         Promise.resolve()
//           .then(async function () {
//             const accountsResponse = await client.accountsGet({
//               access_token: ACCESS_TOKEN,
//             });
//             response.json(accountsResponse.data);
//           })
//           .catch(next);
//       });
    module.exports = {
        createToken,
        exchangeToken,
        getBalance,
        getAccounts,
        getTransactions
    }
    //   exports.createToken = createToken;
    //   exports.exchangeToken = exchangeToken;
    //   exports.getBalance = getBalance;
    //   exports.getAccounts = getAccounts;
    //   exports.getTransactions = getTransactions;
