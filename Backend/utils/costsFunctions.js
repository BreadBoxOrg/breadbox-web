const mongoose = require('mongoose');
require('dotenv').config();
costModel = require('../models/costs-schema');
const uri = process.env.MONGODB_URL;
// client config options 
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };


async function addCost(newCost) {
    try {
        // connect
        await mongoose.connect(uri, clientOptions);
        
        // add document and retrieve promise
        const result = await costModel.insertMany(newCost);

        // disconnect
        await mongoose.connection.close();
    } catch (error) {
        console.dir('Error: ', error);
    }
}

module.exports = addCost;

