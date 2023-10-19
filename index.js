const mongoose = require("mongoose")
const express = require("express")
const app = express()

const dotenv = require("dotenv")
//const connectDB = require('./config/db');

//connectDB();
//const app = express();
dotenv.config()
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true }).then( ()=>{
    console.log("connection successful to MONGODB")

})//.catch(()=>{
    //console.log("Connection unsuccessful")
//})