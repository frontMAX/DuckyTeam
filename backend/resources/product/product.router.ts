import express from "express";

import {
  getProducts,
  getProduct,
  registerProduct,
  updateProduct,
  deleteProduct,
} from "./product.controller";

export const productRouter = express
  .Router()
  .get("/product",  getProducts)
  .get("/product/:id",  getProduct)
  .post("/product/:id",/* adminSecure, */ registerProduct)
  .put("/product/:id",/* adminSecure, */ updateProduct)
  .delete("/product/:id",/* adminSecure, */ deleteProduct);
