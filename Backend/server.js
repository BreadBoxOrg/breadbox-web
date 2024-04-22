/*
  * File: 
    *server.js

  * Description: 
    * This file is the main server file for the backend. It contains all the server configurations and endpoints.
    * It contains the connection to the mongoDB database.
    * It also contains the routes for the different API endpoints.
  * 
*/

'use strict';

// instantiates express
require('dotenv').config();
const mongoose = require("mongoose");
const express = require('express');
const AppError = require('./middleware/appError')
const globalErrorhandler = require('./middleware/errorHandler');

const {createToken, exchangeToken, getTransactions, getBalance, getAccounts} = require('./api/plaid/link-controller')

// connect to mongo
const uri = process.env.MONGO_URL; 
console.log(uri);
mongoose.connect(uri).then(con => {
    console.log(con.connections);
    console.log('DB connection successful!')
});

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


const PORT1 = process.env.BACKEND_PORT;

// SERVER configs
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());
app.use(cors());

// SERVER ENDPOINTS
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
// CORS middleware function
const corsMiddleware = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
};

app.use(corsMiddleware); // Apply the middleware to all routes


//routers

// allows json to be used in routes 
app.use(express.urlencoded({extended: true}));
app.use(express.json());

/*****************************************************************
* SERVER ROUTES
*******************************************************************/
const incomeRouter = require('./routes/income');
app.use('/income', incomeRouter);

const cryptoRouter = require('./routes/crypto');
app.use('/crypto', cryptoRouter);

const accountRouter = require('./routes/account');
app.use('/account', accountRouter);

const costsRouter = require('./routes/costs');
app.use('/costs', costsRouter);

const userRouter = require('./routes/user');
app.use('/user', userRouter);

const linkRouter = require('./routes/link-routes');
app.use('/link', linkRouter);

const chatRouter = require('./routes/chat-routes');
app.use('/chat', chatRouter);

app.all('*', (req, res, next)=> { 
  next(new AppError(`Can't find ${req.originalUrl}`, 404)); //throw error if using a non-existant route.
});

app.use(globalErrorhandler);

// SERVER listening Port
app.listen(PORT1, () => {
    console.log(`Listening on Port: ${PORT1}`)
});