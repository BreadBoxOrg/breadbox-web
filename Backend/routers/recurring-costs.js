const express = require('express');
const router = express.Router();
require('dotenv').config();

router
    .route("/")
    .get((req, res) => {
        console.log("/get");
        res.status(200).json({message: "/get rc"});
    })
    .post((req, res) => {
        console.log("/post");
        res.status(200).json({message: "/post rc"});
    })
    .put((req, res) => {
        console.log("/put");
        res.status(200).json({message: "/put rc"});
    })
    .patch((req, res) => {
        console.log("/patch");
        res.status(200).json({message: "/patch rc"});
    })
    .delete((req, res) => {
        console.log("/delete");
        res.status(200).json({message: "/delete rc"});
    })

module.exports = router;