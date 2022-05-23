import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import { connect, Schema, model } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { userRouter } from "./resources/user/user.router";
import { deliveryRouter } from "./resources/delivery/delivery.router";
const port = 5001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({ credentials: true, origin: ["http://localhost:5001"] }));

app.use("/api", userRouter, deliveryRouter);

mongoose.connect(
  "mongodb+srv://frontMAX:bomberbomber@cluster0.ycxia.mongodb.net/duckybase",
  (err) => {
    if (err) {
      console.log("could not connect");
      console.error(err);
    } else {
      console.log("database connected!");
      app.listen(port, () => console.log(`server running on port ${port}`));
    }
  }
);

//connectDB()

// app.listen(port, () => {
//   console.log(`server running on port ${port}`);
// });
