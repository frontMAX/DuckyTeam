import express, { Express } from "express";
import multer from "multer";

import {
    // getMedia,
    getAllMedia,
    addMedia,
    deleteMedia,
} from "./media.controller"

const upload = multer()

export const mediaRouter = express
    .Router()
    // .get("/media/:id", getMedia)
    .get("/media", getAllMedia)
    .post("/media", addMedia)
    .delete("/media/:id", deleteMedia)


