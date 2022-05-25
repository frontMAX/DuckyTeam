import { NextFunction, Request, Response } from "express";
import { Readable } from 'stream'
import mongoose from "mongoose";
import { GridFSFile } from "mongoose/node_modules/mongodb";
import multer from "multer";
import { request } from "http";
// import bucket from "./media.model";

export const getMedia = async (req: Request, res: Response) => {
    const bucket = new mongoose.mongo.GridFSBucket(
        mongoose.connection.db
        , { bucketName: "files" }

    )

    // @ts-ignore
    const _id = new mongoose.Types.ObjectId(req.params.id)
    const media = await bucket.find({ _id }).next()


    if (!media || media.contentType || typeof media.contentType === "undefined") {
        return res.status(404).json('does not exist')
    }


    res.setHeader('Content-Type', media.contentType)

    const readableStream = bucket.openDownloadStream(_id)
    readableStream.pipe(res)
    res.status(200).json('')
}
const storage = multer.memoryStorage()
const upload = multer({ storage: storage }).single('media')

export const addMedia = async (req: Request, res: Response, next: NextFunction) => {

    upload(req, res, function() {
        console.log(upload)

        console.log('starting adding...')
        const bucket = new mongoose.mongo.GridFSBucket(
            mongoose.connection.db
            , { bucketName: "files" }

        )

        console.log('starting adding...')
        // throw error
        if (!req.file) {
            console.log('no file sent')
            return
        }
        console.log('no error...')
        const { originalname, mimetype, buffer } = req.file
        const thumbnailName = 'thumb' + originalname

        const readableStream = Readable.from(buffer)
        const writeableStream = bucket.openUploadStream(originalname,
            {
                contentType: mimetype,
                metadata: { thumbnail: false }
            })
        bucket.openUploadStream(thumbnailName, {
            contentType: mimetype,
            metadata: { thumbnail: true }
        })

        const media: GridFSFile[] = [];

        const uploaded = (file: GridFSFile) => {
            media.push(file)

            res.status(201).json(media)
        }


        readableStream.pipe(writeableStream).on('finish', (media: GridFSFile) => {
            res.status(201).json(media)
        })

        res.status(200).json('media added')
    })
}

export const deleteMedia = async (req: Request, res: Response) => {
    const bucket = new mongoose.mongo.GridFSBucket(
        mongoose.connection.db
        , { bucketName: "files" }

    )


    // @ts-ignore
    const _id = new mongoose.Types.ObjectId(req.params.id)
    const media = await bucket.find({ _id }).next()

    if (!media || media.contentType) {
        return res.status(404).json('does not exist')
    }
    await bucket.delete(_id)

    res.status(204).json('deleted media')
}