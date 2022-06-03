import express from "express";
//import { adminSecure } from "../middlewares";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  loginUser,
  logout,
  getUser,
  getCurrentUser,
} from "./user.controller";

export const userRouter = express
  .Router()
  .get("/user", /* adminSecure, */ getUsers)
  .get("/user/auth", getCurrentUser)
  .get("/user/:id", getUser)
  .post("/user", addUser)
  .put("/user/:id", updateUser)
  .post("/user/login", loginUser)
  .delete("/user/logout", logout)
  .delete("/user/:id", deleteUser);
