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
        // console.log(accounts);
        return accounts;
    } catch (err){
        console.error(err);
    }
}

// example use 
try {
    const promise = getPlaidTransactions();
    promise.then((data) => {
        // Assuming data is the JSON structure you've provided
        // console.log('-------------------------------------------------');
        // console.log("One Time Cost:", data.one_time_cost);
        // console.log("Recurring Cost:", data.recuring_cost); // Note: It should be 'recurring_cost' if that's the correct key
        // console.log('-------------------------------------------------');
    }).catch((err) => {
        // Handle any errors that occur during the fetch
        console.log("Error fetching data:", err);
    });
} catch (err) {
    console.log(err);
}


// try {
//     getPlaidAccounts();
// } catch (err) {
//     console.log(err);
// }

module.exports = {
    getPlaidTransactions,
    getPlaidAccounts,
}