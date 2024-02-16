// require('dotenv').config({path: './env'});

import dotenv from "dotenv";

// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import express from "express";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("Server is running");
    });
    app.on("error", (err) => {
      console.log("err", err);
    });
  })
  .catch((error) => {
    console.log("MOngodb Connection Failed!!", error);
  });

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
