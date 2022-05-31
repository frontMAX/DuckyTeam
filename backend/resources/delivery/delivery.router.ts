import express from "express";
//import { adminSecure } from "../middlewares";
import {
  deleteDelivery,
  getDeliveries,
  getDelivery,
  registerDelivery,
  updateDelivery,
} from "./delivery.controller";

export const deliveryRouter = express
  .Router()
  .get("/delivery", getDeliveries)
  .get("/delivery/:id", getDelivery)
  .post("/delivery", registerDelivery)
  .put("/delivery/:id", /* adminSecure, */ updateDelivery)
  .delete("/delivery/:id", /* adminSecure, */ deleteDelivery);
