/**
 * Fetches transaction data from a backend service which communicates with the Plaid API. This function constructs
 * the request URL from an environment variable and sends a request to retrieve transaction data. If successful, it
 * parses and returns the JSON response containing transaction details. Errors during the fetch or processing are
 * caught and logged to the console.
 *
 * @returns {Promise<Object[]>} A promise that resolves to an array of transactions if successful, or undefined if an error occurs.
 */
async function getPlaidTransactions() {
    try {
        const backendURL = process.env.REACT_APP_BACKEND_URL;
        const response = await fetch(`${backendURL}/link/transactions`);
        const transactions = await response.json();
        // console.log(transactions);
        return transactions;
    }
    catch (err) {
        console.error(err);
    }
}

/**
 * Retrieves account data from a backend server that uses the Plaid API. The function constructs the request URL from an 
 * environment variable and performs an HTTP request to fetch account details. It returns the JSON-parsed data if successful. 
 * Any errors encountered during the process are logged to the console.
 *
 * @returns {Promise<Object[]>} A promise that resolves to an array of accounts if successful, or logs an error if something goes wrong.
 */
async function getPlaidAccounts() {
    try {
        const backendURL = process.env.REACT_APP_BACKEND_URL;
        const response = await fetch(`${backendURL}/link/accounts`);
        const accounts = await response.json();
        //console.log(accounts);
        return accounts;
    } catch (err){
        console.error(err);
    }
}

/**
 * Retrieves recurring income data from a backend server integrated with the Plaid API. This function constructs
 * the request URL using an environment variable and sends a GET request to fetch data about recurring income streams.
 * It processes and returns the JSON-parsed response if successful. If an error occurs during the request or data
 * processing, it is logged to the console.
 *
 * @returns {Promise<Object>} A promise that resolves to an object containing recurring income data if successful, 
 * or logs an error if an exception occurs.
 */
async function getPlaidRecurringIncome() {
    try { 
        const backendURL = process.env.REACT_APP_BACKEND_URL;
        const response = await fetch(`${backendURL}/link/recurringIncome`, {
            method: 'GET',
        });
        const income = await response.json();
        return income;
    } catch (err) {
        console.error(err);
    }
} 

/**
 * Retrieves the total monthly income for a specified date from a backend server using the Plaid API. This function
 * constructs a POST request, including the date in the body, to fetch detailed income data for the given month. It
 * parses and returns the JSON-parsed response if successful. Errors are caught and logged to the console with details.
 *
 * @param {String} date - The date string in the format "YYYY-MM" specifying the month for which to retrieve income data.
 * @returns {Promise<Object>} A promise that resolves to an object containing the total monthly income data if successful, 
 * or logs an error to the console if an error occurs.
 */
async function getPlaidMonthlyIncome(date) {
    try { 
        const backendURL = process.env.REACT_APP_BACKEND_URL;
        const response = await fetch(`${backendURL}/link/totalMonthlyIncome`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date: date}) // Send the date to the server
        });
        const income = await response.json();
        return income;
    } catch (err) {
        console.error('Error:', err);
    }
}

/**
 * Fetches a list of all available transaction categories from a backend server interfacing with the Plaid API. 
 * This function sends a GET request to the server to retrieve categories, which are important for organizing 
 * and analyzing transaction data. The response is parsed into JSON format and returned. If an error occurs during
 * the fetch or processing stages, it is caught and logged to the console.
 *
 * @returns {Promise<Object>} A promise that resolves to an object containing the list of categories if successful, 
 * or logs an error to the console if an exception occurs.
 */
async function getPlaidCategories() {
    try {
        const backendURL = process.env.REACT_APP_BACKEND_URL;
        const response = await fetch(`${backendURL}/link/categories`);
        const categories = await response.json();
        
        return categories;
    } catch (err){
        console.error(err);
    }
}

module.exports = {
    getPlaidTransactions,
    getPlaidAccounts,
    getPlaidMonthlyIncome,
    getPlaidRecurringIncome,
    getPlaidCategories
};