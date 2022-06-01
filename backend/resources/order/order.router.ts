import express, { Express } from "express";

import {
    getOrders,
    addOrder,
    updateOrder,
    deleteOrder,
    // getOrder
} from "./order.controller"

export const orderRouter = express
    .Router()
    // .get("/order/:id", getOrder)
    .get("/order", getOrders)
    .post("/order", addOrder)
    .put("/order/:id", updateOrder)
    .delete("/order/:id", deleteOrder)


