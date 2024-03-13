'use strict';

// instantiates express
require('dotenv').config();
const express = require('express');
const AppError = require('./middleware/appError')
const globalErrorhandler = require('./middleware/errorHandler');
const {createToken, exchangeToken, getTransactions, getBalance, getAccounts} = require('./api/plaid/link-controller')


const app = express();
// const { Configuration, PlaidApi, Products, PlaidEnvironments} = require('plaid');
// const util = require('util');
const bodyParser = require('body-parser');
// const moment = require('moment');
const cors = require('cors');


const PORT1 = 3000;

app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());
app.use(cors());

// read
app.get("/", (req, res) => {
    console.log("Getting");
    res.status(200).json({message: "get server test"});
});

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

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

//routers

// allows json to be used in routes 
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const incomeRouter = require('./routes/income');
app.use('/income', incomeRouter);

const accountRouter = require('./routes/account');
app.use('/account', accountRouter);

const costsRouter = require('./routes/costs');
app.use('/costs', costsRouter);

const userRouter = require('./routes/user');
app.use('/user', userRouter);

const linkRouter = require('./routes/link-routes');
app.use('/link', linkRouter);

app.all('*', (req, res, next)=> { 
  next(new AppError(`Can't find ${req.originalUrl}`, 404)); //throw error if using a non-existant route.
});

app.use(globalErrorhandler);

// listeners
app.listen(PORT1, () => {
    console.log(`Listening on Port: ${PORT1}`)
});