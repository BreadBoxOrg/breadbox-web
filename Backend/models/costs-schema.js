const mongoose = require('mongoose');

const costSchema = new mongoose.Schema({
    user_id: String,
    cost_name: String,
    cost_catagory: String,
    cost_amount: Number,
    recurring: Boolean,
    period: String,
    // if no date is given the current date will be set
    date: {type: Date, default: Date.now }
});

const costModel = mongoose.model('Costs', costSchema);

module.exports = costModel;