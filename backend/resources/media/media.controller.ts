import { bucket } from "./media.model";
import { NextFunction, Request, Response } from "express";
import { Readable } from 'stream'

export const getAllMedia = async (req: Request, res: Response) => {
    res.status(200).json('')
}

export const addMedia = async (req: Request, res: Response) => {
    if (!req.file) {
        console.log('no file sent')
        return
    }
    const readableStream = Readable.from(req.file.buffer)
    const writeableStream = bucket.openUploadStream(req.file.originalname, { contentType: req.file.mimetype })

    readableStream.pipe(writeableStream)

    res.status(200).json('media added')
}

export const deleteMedia = (req: Request, res: Response) => {
    res.status(200).json('deleted media')
}


// import multer from "multer"

// import { connection } from "mongoose";


// connection.once('open', () => {
// GridFsStorage = Grid(connection.db, mongoose.mongo)

// })

// const mediaStorage = multer.diskStorage({
//     destination: function(req: Request, file, cb){
//         cb(null,'uploads')
//     },
//     filename: function(req,file,cb){
//         cb(null, file.fieldname + Date.now())
//     }
// })

// const uploadMedia = multer({storage: mediaStorage})

// const addMedia = async (
//     req: Request<{}, {}, Media>,
//     res: Response,
//     next: NextFunction
// ) => {
//     const media = fs.readFileSync(req.file.path)
//     let encode_media = media.toString('base64')

// }