import express from "express";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
import { connect, Schema, model } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { userRouter } from "./resources/user/user.router";
import { deliveryRouter } from "./resources/delivery/delivery.router";
import { productRouter } from "./resources/product/product.router";
import { orderRouter } from "./resources/order/order.router";
import { request } from "http";
import { mediaRouter } from "./resources/media";

const port = 5001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cookieSession({
    name: "session",
    secret: "s3cretkey",
    maxAge: 1000 * 200,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  })
);

app.use(
  "/api",
  userRouter,
  productRouter,
  deliveryRouter,
  orderRouter,
  mediaRouter
);

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
