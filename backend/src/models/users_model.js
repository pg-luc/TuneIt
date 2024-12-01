import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },

    imageURL: {
        type: String,
        required: true
    },

    clerkID: {
        type: String,
        required: true
    }
}); 