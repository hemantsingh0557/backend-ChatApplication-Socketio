import mongoose from "mongoose";

const groupChatMessagesSchema = new mongoose.Schema({
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    textMessage: {
        type: String,
        required: true,
    },
    images: [{
        type: String,
    }],
    taggedGroupMemberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    parentMessageId: { // Added field for threaded messages
        type: mongoose.Schema.Types.ObjectId,
        ref: "GroupChatMessages",
        default: null,
    },
}, { timestamps: true });

export const GroupChatMessageModel = mongoose.model("GroupChatMessages", groupChatMessagesSchema);

