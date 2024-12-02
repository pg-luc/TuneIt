import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
    senderID: {
        type: String,
        required: true
    },
    recieverID: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const Message = mongoose.model("Message", messagesSchema);