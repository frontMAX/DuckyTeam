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
  .get("/",  getProducts)
  .get("/:id",  getProduct)
  .post("/:id",/* adminSecure, */ registerProduct)
  .put("/:id",/* adminSecure, */ updateProduct)
  .delete("/:id",/* adminSecure, */ deleteProduct);
