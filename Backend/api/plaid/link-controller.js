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
let User = require('../../models/user-schema');
const { access } = require('fs');

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || 'sandbox';
const PLAID_COUNTRY_CODES = process.env.PLAID_COUNTRY_CODES;
const PLAID_PRODUCTS = (process.env.PLAID_PRODUCTS || Products.Transactions).split(',');


const PLAID_REDIRECT_URI = process.env.PLAID_REDIRECT_URI || '';

// creates environment configurations for plaid
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

// builds client connection with Plaid API
const client = new PlaidApi(configuration);

// express route configuretions
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());
app.use(cors());

/**
 * Gets token information from plaid API
 * @param {String} Enpoint - targets plaid endpoint
 * @param {Callback} - takes callback for request
 * @returns {Object} returns a response object   
 */
app.post('/api/info', function (request, response, next) {
  response.json({
    item_id: ITEM_ID,
    access_token: ACCESS_TOKEN,
    products: PLAID_PRODUCTS,
  });
});


/**
 * Gets token information from the Plaid API. This function initiates the process to create a link token that can be
 * used to link user accounts via Plaid Link. Configures the token creation request with specific user details,
 * client configuration, and required Plaid products. Handles responses asynchronously and sends back the token
 * information or error via HTTP response.
 *
 * @param {Object} req - The HTTP request object, typically containing the user's session and other contextual information.
 * @param {Object} res - The HTTP response object used for sending back the resulting data or errors.
 * @param {Function} next - The next middleware function in the stack, used for error handling.
 * @returns {Promise} A promise that resolves to sending an HTTP response with the created token or an error.
 */
const createToken = async (req, res, next) => {
  Promise.resolve()
    .then(async function () {
      const { languageCode, updateMode } = req.body;
      const configs = {
        user: {
        // This should correspond to a unique id for the current user.
          client_user_id: 'user-id',
        },
        client_name: 'Plaid Quickstart',
        products: ["transactions"],
        country_codes: ["US"],
        language: languageCode || 'en',
        "client_id": PLAID_CLIENT_ID,
        "secret": PLAID_SECRET,
      };
      // update 6/6/2024 -- added conditional to handle when the token needs to be updated to refresh stale data (since that was the error that was causing the data to not populate widgets)
      if (updateMode) {
        const user = await User.findOne({ id: 1 });
        if (user) {
          configs.access_token = user.token;
        }
      }
      if (PLAID_REDIRECT_URI !== '') {
        configs.redirect_uri = PLAID_REDIRECT_URI;
      }
      try {

        const createTokenResponse = await client.linkTokenCreate(configs);
        res.status(200).json(createTokenResponse.data);

      } catch (error) {

        console.log("CREATE_TOKEN_DEBUG:", error);
        return next(new AppError('Could not generate token response'));

      }
    })
    .catch(next);
}

let ACCESS_TOKEN;

  /**
 * Exchanges a public token for an access token using the Plaid API. This function is crucial for securely upgrading
 * the short-lived public token received from the client into a long-term access token that can be persistently stored.
 * The access token allows server-side interaction with the user's financial data through Plaid.
 *
 * The function saves the new access token to a database, associating it with a specific user. This implementation needs
 * to be adjusted to dynamically associate the returned access token with the correct user session rather than
 * hardcoding the user ID.
 *
 * @param {Object} req - The HTTP request object, containing the public_token within the body.
 * @param {Object} res - The HTTP response object used for sending responses back to the client.
 * @param {Function} next - The next middleware function in the stack for error handling.
 * @returns {Promise} A promise that resolves by sending an HTTP response indicating successful token exchange or
 * an error if the exchange fails.
 */
const exchangeToken = async (req, res, next) => {

  const publicToken = req.body.public_token;
  try {
    const tokenResponse = await client.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = tokenResponse.data.access_token;

      // save token to database user
      // update 6/7/2024 -- using findOneAndUpdate to update the user's token if it exists or create a new entry if it doesn't.
    let user = await User.findOneAndUpdate(
      { id: 1 },
      { token: accessToken },
      { upsert: true, new: true }
    );


    ACCESS_TOKEN = accessToken;
    res.status(200).json({ public_token_exchange: 'complete' });
  } catch (error) {
    console.log("Error:", error);
    return next(new AppError('Could not generate exchange token'));
     // handle error
  }
}

/**
 * Retrieves and synchronizes transactions via the Plaid API, 
 * providing a comprehensive view of both one-time and recurring transactions 
 * associated with a user's financial accounts. The function iterates through all pages of transaction 
 * updates from Plaid, handling new, modified, and removed transactions. It fetches an access token 
 * from the database, which is necessary to authenticate the Plaid API requests. The function captures
 * and logs transaction details, sorting and returning the most recent transactions. If recurring 
 * transactions are available, it also processes and lists them. Errors are caught and handled 
 * appropriately, ensuring the stability of the transaction synchronization process.
 *
 * @param {Object} req - The HTTP request object containing necessary data, typically including user context.
 * @param {Object} res - The HTTP response object used to send back data or errors to the client.
 * @param {Function} next - Middleware function to handle errors or move to the next middleware.
 * @returns {Promise} - Async function that handles the operation and returns a JSON response with transaction details.
 */
const plaidGetTransactions = async (req, res, next) => {
  Promise.resolve()
    .then(async function () {

      // Set cursor to empty to receive all historical updates
      let cursor = null;
      let added = [];
      let modified = [];
      let removed = [];
      let hasMore = true;
      let user = await User.findOne({id: 1});
      let accessToken = user.token;

      // Iterate through each page of new transaction updates for item
      while (hasMore) {
        const req = {
          access_token: accessToken,
          cursor: cursor,
        };
        try {

          const res = await client.transactionsSync(req);
          const data = res.data;

          added = added.concat(data.added);
          modified = modified.concat(data.modified);
          removed = removed.concat(data.removed);
          hasMore = data.has_more;
          cursor = data.next_cursor;

        } catch (error) {

          console.log("Error:", error);
          return next(new AppError('Could sync transactions'));

       }
      }

      const compareTxnsByDateAscending = (a, b) => (a.date > b.date) - (a.date < b.date);
      const recently_added = [...added].sort(compareTxnsByDateAscending);

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
        access_token: accessToken,
       };

      let transactionRecuringList = [];
      try {

        const response = await client.transactionsRecurringGet(req);
        let inflowStreams = response.data.inflow_streams;
        let outflowStreams = response.data.outflow_streams;

        console.log(outflowStreams);


        outflowStreams.forEach(outflowTransactions => {
          let name = outflowTransactions.merchant_name;

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
        return res.status(500).json(err);

      }

      res.status(200).json({
        one_time_cost: transactionList,
        recuring_cost: transactionRecuringList
      });

    })
    .catch(next);
}

/**
 * Retrieves a comprehensive list of recurring income transactions for a user from the Plaid API. The function fetches
 * the user's access token from the database, sends a request to Plaid to get recurring transactions, and filters 
 * for income streams. Each income stream transaction is processed to ensure it includes a descriptive name, either from
 * the merchant or categorized under a personal finance category. The result is formatted into a custom transaction
 * structure and returned as a JSON response. If no name is available under the merchant name or personal finance category,
 * it falls back to the general category data provided by Plaid.
 *
 * @param {Object} req - The HTTP request object containing necessary user and API information.
 * @param {Object} res - The HTTP response object used for sending back the processed income transactions data or errors.
 * @param {Function} next - Middleware function to pass control to the next middleware or to handle errors.
 * @returns {void} - Does not return a value but responds with a JSON object containing income transactions or an error message.
 */
const plaidGetIncomeStream = async (req, res, next) => {

  let inFlowTransactionList = [];
  let user = await User.findOne({id: 1});
  let accessToken = user.token;

  try {
    req = { 
      access_token: accessToken, 
    };

    const response = await client.transactionsRecurringGet(req);
    let inflowStreams = response.data.inflow_streams;

    inflowStreams.forEach(inFlowTransaction => {
      let name = inFlowTransaction.merchant_name;
      if (name === "") {
        name = inFlowTransaction.personal_finance_category.primary;
      }
      if (name === "") {
        name = inFlowTransaction.category[0];
      }
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

/**
 * Retrieves and returns account balance information from Plaid for a user. This function looks up the user's access 
 * token from the database, then sends a request to Plaid to get the balance details of all linked accounts. The 
 * response, containing the balance data, is returned as a JSON object to the client. Errors during the request 
 * process are handled and passed along to the next middleware function.
 *
 * @param {Object} req - The HTTP request object, not directly utilized in the function.
 * @param {Object} res - The HTTP response object used to return the balance data.
 * @param {Function} next - Middleware function for error handling, used to forward any errors encountered during execution.
 * @returns {void} - Sends a JSON response to the client with the balance data or an error message, does not return any value.
 */
const plaidGetBalance = async (req, res, next ) => {
  Promise.resolve()
    .then(async function () {
      let user = await User.findOne({id: 1});
      let accessToken = user.token;
      const balanceResponse = await client.accountsBalanceGet({
        access_token: accessToken,
      });
      res.status(200).json(balanceResponse.data);
    })
    .catch(next);
}

/**
 * Retrieves and calculates the total income for a specified month and year by aggregating both recurring and one-time
 * transaction amounts. The function fetches income-related transactions from Plaid using an access token stored with a user's
 * profile. It filters transactions to include only those within the specified month and year, sums their amounts, and returns
 * the total. The function is robust in handling errors during API calls or data processing, ensuring reliable operation.
 *
 * @param {String} date - The date string in the format "YYYY-MM" specifying the month and year for which income is calculated.
 * @returns {Object} - Returns an object containing the total income for the specified month and the year, structured as:
 *                     { totalIncomeForMonth: Number, year: Number }
 * @throws {Error} - Propagates any errors encountered during execution to the caller.
 */ 
const getIncomeForMonth = async (date) => {
  try {

    let user = await User.findOne({id: 1});
    const accessToken = user.token;
    let monthTotal = 0;
    const searchYear = parseInt(date.substring(0, 4), 10);
    const searchMonth = parseInt(date.substring(5, 7), 10);

     // Define the function to compare transactions by date
    const compareTxnsByDateAscending = (a, b) => (new Date(a.date) - new Date(b.date));

    try {

      const response = await client.transactionsRecurringGet({ access_token: accessToken });
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
      const filteredTransactions = (await client.transactionsSync({ access_token: accessToken })).data.added
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

/**
 * Calculates and responds with the total monthly income for each month of a specified year using Plaid's data. This function
 * aggregates income across all months of a given year, pulling data through repeated calls to another function that fetches
 * monthly income. It handles the asynchronous collection of income data, computes the total for the entire year, and structures
 * the output into a monthly breakdown along with a yearly total. The function ensures that all operations are performed robustly,
 * handling any potential errors gracefully and providing a structured JSON response with detailed income information.
 *
 * @param {Object} req - The HTTP request object, expected to contain a body with a 'date' field specifying the year (format "YYYY-MM").
 * @param {Object} res - The HTTP response object used to send a JSON response containing detailed monthly and yearly income data.
 * @param {Function} next - Middleware function for error handling, used to pass errors to the next middleware in the chain.
 * @returns {void} - Sends a JSON response to the client with structured income data or an error message, does not return any value.
 */
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

/**
 * Fetches and returns account balance information for a user from the Plaid API. This function retrieves an access token
 * from the database for a specified user and uses it to request detailed account balances. The results are then sent back to 
 * the client as JSON. The function is set up to handle potential errors gracefully, forwarding them to the next middleware.
 *
 * @param {Object} req - The HTTP request object, often containing user-related data.
 * @param {Object} res - The HTTP response object used to send back the fetched data.
 * @param {Function} next - Middleware function for error handling.
 */
const plaidGetAccounts = (req, res, next ) => {
  Promise.resolve()
    .then(async function () {

      // (TODO: REPLACE)  
      //update 6/6/2024 -- switched to accountsResponse and client.accountsGet()
      let user = await User.findOne({id: 1});
      let accessToken = user.token;
      const accountsResponse = await client.accountsGet({
        access_token: accessToken,
      });
      // console.log('Accounts fetched:', accountsResponse.data.accounts);  // DEBUG
      res.json(accountsResponse.data);
    })
    .catch(next);
}

/**
 * Retrieves and returns the list of all transaction categories from the Plaid API. This function sends a request to Plaid
 * to fetch categories, which are used to classify transactions. The response, containing the category data, is returned
 * directly to the client as JSON. The function handles errors by forwarding them to the next middleware function.
 *
 * @param {Object} req - The HTTP request object, used to initiate the API call.
 * @param {Object} res - The HTTP response object used to send the categories data back to the client.
 * @param {Function} next - Middleware function for error handling, used to handle exceptions and pass control if necessary.
 */
const plaidGetCategories = (req, res, next) => {
  Promise.resolve()
    .then(async function () {
      const categoriesResponse = await client.categoriesGet({});
        // console.log(categoriesResponse);
      res.json(categoriesResponse.data);
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
  plaidGetTotalMonthlyIncome,
  plaidGetCategories
}
