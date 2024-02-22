// require('dotenv').config({path: './env'});

import dotenv from "dotenv";
dotenv.config({
  path: "./env",
});


// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import connectDB from "./db/index.js";
import { app } from "./app.js";



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
