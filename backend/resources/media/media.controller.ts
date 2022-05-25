import { bucket } from "./media.model";
import { NextFunction, Request, Response } from "express";
import { Readable } from 'stream'
import { Types } from "mongoose";
import { GridFSFile } from "mongoose/node_modules/mongodb";

export const getMedia = async (req: Request, res: Response) => {
    const _id = new Types.ObjectId(req.params.id)
    const media = await bucket.find({ _id }).next()
    if (!media || media.contentType) {
        return res.status(404).json('does not exist')
    }
    res.setHeader('Content-Type', media.contentType)

    const readableStream = bucket.openDownloadStream(_id)
    readableStream.pipe(res)
    res.status(200).json('')
}

export const addMedia = async (req: Request, res: Response, next: NextFunction) => {
    // throw error
    if (!req.file) {
        console.log('no file sent')
        return
    }
    const { originalname, mimetype, buffer } = req.file
    const thumbnailName = 'thumb' + originalname

    const readableStream = Readable.from(buffer)
    const writeableStream = bucket.openUploadStream(originalname,
        {
            contentType: mimetype,
            metadata: { thumbnail: false }
        })
        bucket.openUploadStream(thumbnailName,{
            contentType: mimetype,
            metadata:{thumbnail: true}
        })

        const media: GridFSFile[] = [];

        const uploaded = (file: GridFSFile) =>{
            media.push(file)

            res.status(201).json(media)
        }


    readableStream.pipe(writeableStream).on('finish', (media: GridFSFile) => {
        res.status(201).json(media)
    })

    res.status(200).json('media added')
}

export const deleteMedia = async (req: Request, res: Response) => {
    const _id = new Types.ObjectId(req.params.id)
    const media = await bucket.find({ _id }).next()

    if (!media || media.contentType) {
        return res.status(404).json('does not exist')
    }
    await bucket.delete(_id)

    res.status(204).json('deleted media')
}