async function getPlaidTransactions() {
    try {
        const response = await fetch(`http://localhost:3000/link/transactions`);
        const transactions = await response.json();
        // console.log(transactions);
        return transactions;
    }
    catch (err) {
        console.error(err);
    }
}

async function getPlaidAccounts() {
    try {
        const response = await fetch(`http://localhost:3000/link/accounts`);
        const accounts = await response.json();
        //console.log(accounts);
        return accounts;
    } catch (err){
        console.error(err);
    }
}

async function getPlaidRecurringIncome() {
    try { 
        const response = await fetch(`http://localhost:3000/link/recurringIncome`, {
            method: 'GET',
        });
        const income = await response.json();
        return income;
    } catch (err) {
        console.error(err);
    }
}

async function getPlaidMonthlyIncome(date) {
    try { 
        const response = await fetch(`http://localhost:3000/link/totalMonthlyIncome`, {
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

async function getPlaidCategories() {
    try {
        const response = await fetch(`http://localhost:3000/link/categories`);
        const categories = await response.json();
        //console.log(categories);
        return categories;
    } catch (err){
        console.error(err);
    }
}



// test Drivers 
// try {
//     const test1 = getPlaidMonthlyIncome("2021-01-23");
//     test1.then((data) => {
    
//         // Assuming data is the JSON structure you've provided
//         console.log('-------------------------------------------------');
//         console.log("Incoming", data);
//         console.log('-------------------------------------------------');
//     }).catch((err) => {
//         // Handle any errors that occur during the fetch
//         console.log("Error fetching data:", err);
//     });
// } catch (err) {
//     console.log(err);
// }

// try {
//     const test2 = getPlaidRecurringIncome();
//     test2.then((data) => {
    
//         // Assuming data is the JSON structure you've provided
//         console.log('-------------------------------------------------');
//         console.log("Incoming", data);
//         console.log('-------------------------------------------------');
//     }).catch((err) => {
//         // Handle any errors that occur during the fetch
//         console.log("Error fetching data:", err);
//     });
// } catch (err) {
//     console.log(err);
// }

// try {
//     const test3 = getPlaidAccounts();
//     test3.then((data) => {
    
//         // Assuming data is the JSON structure you've provided
//         console.log('-------------------------------------------------');
//         console.log("Incoming", data);
//         console.log('-------------------------------------------------');
//     }).catch((err) => {
//         // Handle any errors that occur during the fetch
//         console.log("Error fetching data:", err);
//     });
// } catch (err) {
//     console.log(err);
// }

// try {
//     const test4 = getPlaidTransactions();
//     test4.then((data) => {
    
//         // Assuming data is the JSON structure you've provided
//         console.log('-------------------------------------------------');
//         console.log("Incoming", data);
//         console.log('-------------------------------------------------');
//     }).catch((err) => {
//         // Handle any errors that occur during the fetch
//         console.log("Error fetching data:", err);
//     });
// } catch (err) {
//     console.log(err);
// }

module.exports = {
    getPlaidTransactions,
    getPlaidAccounts,
    getPlaidMonthlyIncome,
    getPlaidRecurringIncome
};