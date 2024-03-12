'use strict';

// instantiates express
require('dotenv').config();
const express = require('express');
// const app = express();
const { Configuration, PlaidApi, Products, PlaidEnvironments} = require('plaid');
const util = require('util');
const bodyParser = require('body-parser');
const moment = require('moment');
const cors = require('cors');

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




app.post('/create_link_token', function (request, response, next) {
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
        response.json(createTokenResponse.data);
        console.log("Create Token Response:", createTokenResponse);
        } catch (error) { 
          console.log("Error:", error);
        }
      })
      .catch(next);
  });
  
  let ACCESS_TOKEN;

  app.post('/exchange_public_token', async function (
    request,
    response,
    next,
  ) {
    const publicToken = request.body.public_token;
    try {
        const tokenResponse = await client.itemPublicTokenExchange({
        public_token: publicToken,
      });
  
      // These values should be saved to a persistent database and
      // associated with the currently signed-in user
      const accessToken = tokenResponse.data.access_token;
      ACCESS_TOKEN = accessToken;
      const itemID = tokenResponse.data.item_id;
      console.log('-----------------------------------------');
      console.log(accessToken);
      console.log(itemID);
      console.log('-----------------------------------------');
      response.status(200).json({ public_token_exchange: 'complete' });
    } catch (error) {
      console.log("Error:", error);
      // handle error
    }
  });

  
  app.get('/api/transactions', function (request, response, next) {
    Promise.resolve()
      .then(async function () {
        // Set cursor to empty to receive all historical updates
        let cursor = null;
  
        // New transaction updates since "cursor"
        let added = [];
        let modified = [];
        // Removed transaction ids
        let removed = [];
        let hasMore = true;
        // Iterate through each page of new transaction updates for item
        while (hasMore) {
          const request = {
            access_token: ACCESS_TOKEN,
            cursor: cursor,
          };
          const response = await client.transactionsSync(request)
          const data = response.data;
          console.log(data);
          
          // Add this page of results
          added = added.concat(data.added);
          modified = modified.concat(data.modified);
          removed = removed.concat(data.removed);
          hasMore = data.has_more;
          // Update cursor to the next cursor
          cursor = data.next_cursor;
        }
  
        const compareTxnsByDateAscending = (a, b) => (a.date > b.date) - (a.date < b.date);
        // Return the 8 most recent transactions
        const recently_added = [...added].sort(compareTxnsByDateAscending).slice(-8);
        response.json({latest_transactions: recently_added});
      })
      .catch(next);
  });
// basic route paths
// app.get('create-link-token', async (req, res) =>{
//     const {link_token: linkToken} = await plaidClient.createLinkToken({
//         user: {
//             client: "unique id"
//         }, 
//         client_name: 'Ann Taylor',
//         products: ['account'],
//         country_codes:['US'],
//         language: 'en'
//     });

//     res.json({linkToken});

// });

// app.post('/token-exchange', async (req, res) => {
//     const {publicToken } = req.body;
//     const {access_token: accessToken} = await plaidClient.exchangePublicToken(publicToken);

//     const authResponse = await plaidClient.getAuth(accessToken);
//     console.log('------------------------------');
//     console.log('Auth Response');
//     console.log(util.inspect(authResponse, false, null, true));

//     const balanceResponse = await plaidClient.getBalance(accessToken);
//     console.log('-------------');
//     console.log('Identity Response');
//     console.log(uitl.inspect(balanceResponse, false, null, true));

//     res.sendStatus(200);
// })
// read
app.get("/", (req, res) => {
    console.log("Getting");
    res.status(200).json({message: "get server test"});
});

// create
app.post("/", (req, res) => {
    console.log("Posting");
    res.status(200).json({message: "post server test"});
} );

// update 
app.put("/", (req, res) => {
    console.log("Putting");
    res.status(200).json({message: "put server test"});
});

app.patch("/", (req, res) => {
    console.log("Patching");
    res.status(200).json({message: "patch server test"});
});

// delete 
app.delete("/", (req, res) => {
    console.log("deleting ");
    res.status(200).json({message: "delete server test"});
});

//routers

// allows json to be used in routes 
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const incomeRouter = require('./routes/income');
app.use('/income', incomeRouter);

const accountRouter = require('./routes/account');
app.use('/account', accountRouter);

const costsRouter = require('./routes/costs');
app.use('/costs', costsRouter);

const userRouter = require('./routes/user');
app.use('/user', userRouter);

// listeners
app.listen(PORT1, () => {
    console.log(`Listening on Port: ${PORT1}`)
});