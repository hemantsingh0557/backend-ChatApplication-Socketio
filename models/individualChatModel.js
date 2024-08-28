import mongoose from "mongoose";

const individualChatSchema = new mongoose.Schema({
    user1Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    user2Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    chatStartDate: {
        type: Date,
        default: Date.now, 
    },
}, { timestamps: true });



individualChatSchema.index({ user1Id: 1, user2Id: 1 });

export const IndividualChatModel = mongoose.model("IndividualChat", individualChatSchema);
