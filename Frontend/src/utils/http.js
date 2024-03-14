async function getPlaidTransactions() {
    try {
        const response = await fetch(`http://localhost:3000/link/transactions`);
        const transactions = await response.json();
        console.log(transactions);
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
        console.log(accounts);
        return accounts;
    } catch (err){
        console.error(err);
    }
}

