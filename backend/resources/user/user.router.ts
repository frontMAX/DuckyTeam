import express from "express";
//import { adminSecure } from "../middlewares";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  loginUser,
  testlogin,
  logOut,
} from "./user.controller";

export const userRouter = express
  .Router()
  .get("/user", /* adminSecure, */ getUsers)
  .post("/user", addUser)
  .put("/user/:id", updateUser)
  .post("/user/login", loginUser, testlogin)
  .delete("/user/:id", deleteUser)
  .delete("/user/logout", logOut);
