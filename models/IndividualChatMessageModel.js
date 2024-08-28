import mongoose from "mongoose";

const individualChatMessageSchema = new mongoose.Schema({
    individualChatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "IndividualChat",
        required: true,
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    textMessage: {
        type: String,
        trim: true,
    },
    images: [{
        type: String,
        trim: true,
    }],
}, { timestamps: true });

individualChatMessageSchema.index({ individualChatId: 1, senderId: 1 });

export const IndividualChatMessageModel = mongoose.model("IndividualChatMessage", individualChatMessageSchema);
