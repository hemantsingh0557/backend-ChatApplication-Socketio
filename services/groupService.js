import mongoose from "mongoose";
import { GroupModel } from "../models/groupModel.js";
import { GroupChatMessageModel } from "../models/GroupChatMessageModel.js";
import { GroupMembersModel } from "../models/GroupMemberModel.js";




export const groupService = {} ;

groupService.createGroupInDb = async(userId, groupName, groupImage, groupMembersIds) => {
    const newGroup = new GroupModel({
        groupAdmin: userId, 
        groupName,
        groupImage,
    });
    const savedGroup = await newGroup.save();
    const groupMembers = [
        { groupId: savedGroup._id, groupMemberId: userId }, 
        ...groupMembersIds.map( (memberId) => ({ groupId: savedGroup._id, groupMemberId: memberId })),
    ];
    await GroupMembersModel.insertMany(groupMembers);
    return savedGroup;
};


groupService.getGroupChatFromDb = async(userId, groupChatId, limit, skip) => {
    const groupChats = await GroupModel.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(groupChatId) } },
        {
            $lookup: {
                from: "GroupChatMessages",
                localField: "_id",
                foreignField: "groupId",
                as: "messages",
            },
        },
        { $unwind: { path: "$messages", preserveNullAndEmptyArrays: true } },
        { $sort: { "messages.createdAt": -1 } },
        { $skip: skip },
        { $limit: limit },
    ]);
    if (!groupChats.length) {
        return null;
    }
    return groupChats[0];
};


groupService.deleteGroupFromDb = async(userId, groupId) => {
    const deleteGroupResult = await GroupModel.deleteOne({ _id: groupId });
    if (deleteGroupResult.deletedCount === 0) {
        return false; // No group found or not deleted
    }
    await GroupMembersModel.deleteMany({ groupId });
    await GroupChatMessageModel.deleteMany({ groupId });
    return true; // Group deleted successfully
};

groupService.getGroupMembersFromDb = async(groupId) => {
    const groupMembers = await GroupMembersModel.find({ groupId });
    return groupMembers;
};


groupService.saveGroupMessage = async(groupId, message) => {
    const newMessage = new GroupChatMessageModel({
        groupId,
        senderId: message.senderId,
        textMessage: message.textMessage,
        images: message.images,
        taggedGroupMemberId: message.taggedGroupMemberId,
        parentMessageId: message.parentMessageId,
    });
    const savedMessage = await newMessage.save();
    return savedMessage;
};



