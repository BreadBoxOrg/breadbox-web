// transactions object class
class TransactionObject  {
    constructor(accountId, accountOwner, amount, date, catagory,
        merchantName, paymentChannel, paymentMeta, currency) {
        this.accountId = accountId;
        this.accountOwner = accountOwner;
        this.amount = amount;
        this.date = date;
        this.catagory = catagory;
        this.merchantName = merchantName;
        this.paymentChannel = paymentChannel;
        this.paymentMeta = paymentMeta;
        this.currency = currency;
    }
}

module.exports = TransactionObject;