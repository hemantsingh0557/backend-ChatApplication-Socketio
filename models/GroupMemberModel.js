import mongoose from "mongoose";

const groupMembersSchema = new mongoose.Schema({
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
    },
    groupMemberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });

export const GroupMembersModel = mongoose.model("GroupMember", groupMembersSchema);
