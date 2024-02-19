// instantiates express
const express = require('express');
const app = express();

// setup .env file
require('dotenv').config();

// for parsing json 
const bodyParser = require('body-parser');
PORT1 = 3000;

// basic route paths

// read
app.get("/", (req, res) => {
    console.log("Getting");
    res.status(200).json({message: "get server test"});
});

// write

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

const incomeRouter = require('./routers/income');
app.use('/income', incomeRouter);

const accountRouter = require('./routers/account');
app.use('/account', accountRouter);

const costsRouter = require('./routers/costs');
app.use('/costs', costsRouter);

const recurringCostsRouter = require('./routers/recurring-costs');
app.use('/recurring-costs', recurringCostsRouter);

const userRouter = require('./routers/user');
app.use('/user', userRouter);

// listeners
app.listen(PORT1);