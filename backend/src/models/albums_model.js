import mongoose from "mongoose";

export const albumsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
        required: true
    }],
    imageURL: {
        type: String,
        required: true
    },
    releaseYear: {
        type: Number,
        required: true
    }
}, { timestamps: true });

export const Album = mongoose.model("Album", albumsSchema);