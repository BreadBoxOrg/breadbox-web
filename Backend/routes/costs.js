const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const costModel = require('../models/costs-schema');
const addCost = require('../utils/costsFunctions');
require('dotenv').config();

// db connection for mongodb without mongoose


const uri = process.env.MONGO_URL;
// client config options 
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

router
    .route("/")
    .get( async (req, res) => {
        try{
            // connect
            await mongoose.connect(uri, clientOptions);

            console.log("/get");
            const id = req.body.user_id;
            const result = await costModel.find({"user_id": id});

            // disconnect
            await mongoose.connection.close();
            
            res.status(200).json(result);
        } catch(error) {
            console.log("Error: " + error);
            res.status(500).json({message: "failed find data"});
        }

    })
    .post(async (req, res) => {
        // post a cost to databse 
        console.log(req.body);
        try {
            await addCost(req.body);
            res.status(200).json({message: "/post"});
        } catch {
            res.status(500).json({message: "Failed to post"});
        }
        console.log("/post");
        
    })
    .put((req, res) => {
        
        console.log("/put");
        res.status(200).json({message: "/put"});
    })
    .patch((req, res) => {
        console.log("/patch");
        res.status(200).json({message: "/patch"});
    })
    
router
    .route("/:id")
    .delete(async (req, res) => {
    try {

        // connect
        await mongoose.connect(uri, clientOptions);

        console.log("/delete");

        // delete cost document
        const id = req.params._id;
        console.log(id);
        const result = costModel.deleteOne({_id:id});
        
        // Check if a document was deleted
        if (result.deletedCount > 0) {
            res.status(200).json({ message: "Document deleted successfully" });
        } else {
            res.status(404).json({ message: "Document not found" });
        }

        // close connection 
        await mongoose.connection.close();
    }catch(error) {
        console.log("Failed to delete resource");
        res.status(500).json({message: "Failed to delete document"});
    }
});

module.exports = router;