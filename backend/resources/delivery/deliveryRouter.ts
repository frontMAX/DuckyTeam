import express from "express";
import { adminSecure } from "../middlewares";

import {
  deleteDelivery,
  getDeliveries,
  getDelivery,
  registerDelivery,
  updateDelivery,
} from "./deliveryController";

export const userRouter = express
  .Router()
  .get("/delivery", adminSecure, getDeliveries, getDelivery)
  .post("/delivery", registerDelivery)
  .put("/delivery/:id", updateDelivery)
  .delete("/delivery/:id", deleteDelivery);
