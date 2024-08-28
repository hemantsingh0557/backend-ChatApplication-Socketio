import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    groupName: {
        type: String,
        required: true,
    },
    groupImage: {
        type: String,
    },
}, { timestamps: true });

export const GroupModel = mongoose.model("Group", groupSchema);
