import { NextFunction, Request, Response } from "express";
import { Readable } from 'stream'
import mongoose, { Types } from "mongoose";
import { GridFSFile } from "mongoose/node_modules/mongodb";
import multer from "multer";

const storage = multer.memoryStorage()
const upload = multer({ storage: storage }).single('file')

/**@desc get all media in database */
export const getAllMedia = async (req: Request, res: Response) => {
    const bucket = new mongoose.mongo.GridFSBucket(
        mongoose.connection.db
        , { bucketName: "files" }

    )

    const medias = await bucket.find().toArray();
    if (!medias || medias.length === 0) {
        return res.status(200).json({
            success: false,
            message: 'No files found',
        });
    }

    res.status(200).json({
        success: true,
        medias,
    });

}

/**@desc get media by id */
export const getMedia = async (req: Request, res: Response) => {
    const bucket = new mongoose.mongo.GridFSBucket(
        mongoose.connection.db
        , { bucketName: "files" }
    )

    // @ts-ignore
    const _id = new mongoose.Types.ObjectId(req.params.id);

    const file = await bucket.find({ _id }).next();

    if (!file || !file.contentType) {
        return res.status(404).json('media file with this id does not exist');
    }

    res.setHeader('Content-Type', file.contentType);

    const readableStream = bucket.openDownloadStream(_id);
    readableStream.pipe(res);
};


/**@desc add new media to database */
export const addMedia = async (req: Request, res: Response, next: NextFunction) => {

    upload(req, res, function () {
        const bucket = new mongoose.mongo.GridFSBucket(
            mongoose.connection.db
            , { bucketName: "files" }
        )

        if (!req.file) {
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
    })
}

/**@desc delete media by id */
export const deleteMedia = async (req: Request, res: Response) => {
    const bucket = new mongoose.mongo.GridFSBucket(
        mongoose.connection.db
        , { bucketName: "files" }
    )

    // @ts-ignore
    const _id = new mongoose.Types.ObjectId(req.params.id);

    const file = await bucket.find({ _id }).next();

    if (!file || !file.contentType) {
        return res.status(404).json('cant delete file, does not exist');
    }

    await bucket.delete(_id)

    res.status(204).json('deleted media')
}