// require('dotenv').config({path: './env'});


import dotenv from 'dotenv'

// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import express from "express";
import connectDB from "./db/index.js";


dotenv.config({
    path: './env'
})





connectDB()



const app = express();








/* First Approach */



// ;(async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     app.on("error", (error) => {
//       console.log("Error", error);
//     });

//     app.listen(process.env.PORT, () => {
//       console.log(`App is listning on Port : ${process.env.PORT}`);
//     });
//   } catch (error) {
//     console.log("Database Connection Error", error);
//     throw error;
//   }
// })();
