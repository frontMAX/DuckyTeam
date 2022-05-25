import mongoose from "mongoose"
import {GridFSBucket} from "mongodb"


mongoose.connection.on("connected",() => {
    
    const bucket = new mongoose.mongo.GridFSBucket(
        mongoose.connection.db
        , {bucketName: "media"}

    )
})



export let bucket: GridFSBucket

// export interface Media {
//     name: string;  
//   }


// const mediaSchema = new mongoose.Schema({
//     name: String,
//     img:{
//     data: Buffer,
//     contentType: String
//     }
// })

// export const MediaModel = mongoose.model<Media>("media", mediaSchema);
