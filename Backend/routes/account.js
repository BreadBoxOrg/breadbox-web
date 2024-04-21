/*
  * File: 
    *account.js

  * Description: 
    *This file is responsible for handling the routes for the account page.
  * 
*/

const express = require('express');
const router = express.Router();
require('dotenv').config();

router
    .route("/")
    .get((req, res) => {
        console.log("/get");
        res.status(200).json({message: "/get"});
    })
    .post((req, res) => {
        console.log("/post");
        res.status(200).json({message: "/post"});

    })
    .put((req, res) => {
        console.log("/put");
        res.status(200).json({message: "/put"});
    })
    .patch((req, res) => {
        console.log("/patch");
        res.status(200).json({message: "/patch"});
    })
    .delete((req, res) => {
        console.log("/delete");
        res.status(200).json({message: "/delete"});
    })

module.exports = router;