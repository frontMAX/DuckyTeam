import express from "express";

import {
    getMedia,
    addMedia,
    deleteMedia,
    getAllMedia
} from "./media.controller"

export const mediaRouter = express
    .Router()
    .get('/media', getAllMedia)
    .get("/media/:id", getMedia)
    .post("/media", addMedia)
    .delete("/media/:id", deleteMedia)


