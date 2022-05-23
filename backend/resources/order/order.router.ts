import express, { Express } from "express";

import {
    getOrders,
    addOrder,
    updateOrder,
    deleteOrder
} from "./order.controller"

export const orderRouter = express
    .Router()
    .get("/order", getOrders)
    .post("/order", addOrder)
    .put("/order", updateOrder)
    .delete("/order", deleteOrder)


