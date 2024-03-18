class TransactionRecuringObject  {
    constructor(accountId, amount, first_date, last_date, frequency, catagory,
        merchantName, isActive, currency, description) {
        this.accountId = accountId;
        this.amount = amount;
        this.first_date = first_date;
        this.last_date = last_date;
        this.frequency = frequency;
        this.catagory = catagory;
        this.merchantName = merchantName;
        this.isActive = isActive;
        this.currency = currency;
        this.description = description;
    }
}

module.exports = TransactionRecuringObject;