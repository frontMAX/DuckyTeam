import express from "express";
//import { adminSecure } from "../middlewares";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  loginUser,
  logout,
} from "./user.controller";

export const userRouter = express
  .Router()
  .get("/user", /* adminSecure, */ getUsers)
  .post("/user", addUser)
  .put("/user/:id", updateUser)
  .post("/user/login", loginUser)
  .delete("/user/:id", deleteUser)
  .delete("/user/logout", logout);
