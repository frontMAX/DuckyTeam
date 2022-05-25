import express from "express";

import {
    getMedia,
    addMedia,
    deleteMedia,
} from "./media.controller"

export const mediaRouter = express
    .Router()
    .get("/media/:id", getMedia)
    .post("/media", addMedia)
    .delete("/media/:id", deleteMedia)


