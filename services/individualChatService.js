import mongoose from "mongoose";
import { IndividualChatModel } from "../models/individualChatModel.js";
import { IndividualChatMessageModel } from "../models/IndividualChatMessageModel.js";




export const individualChatService = {} ;

individualChatService.createOrUpdateChatAndSaveMessage = async(individualChatId, userId, friendId, textMessage, images) => {
    const individualChat = await IndividualChatModel.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(individualChatId) },
        { user1Id: userId, user2Id: friendId },
        { upsert: true, new: true } ,
    );
    const newMessage = new IndividualChatMessageModel({
        individualChatId: individualChat._id,
        senderId: userId,
        recipientId: friendId,
        textMessage: textMessage,
        images: images,
    });
    await newMessage.save();

    return newMessage;
} ;




individualChatService.checkIndividualChatInDb = async(userId, friendId) => {
    let individualChatDetails = await IndividualChatModel.findOne({
        $or: [
            { user1Id: userId, user2Id: friendId },
            { user1Id: friendId, user2Id: userId },
        ],
    });
    if(!individualChatDetails) {
        individualChatDetails = new IndividualChatModel({
            user1Id: userId,
            user2Id: friendId,
        });
        await individualChatDetails.save();
    }
    return individualChatDetails;
};



individualChatService.getIndividualChatFromDb = async(userId, individualChatId, limit, skip) => {
    const chat = await IndividualChatModel.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(individualChatId) } },
        {
            $lookup: {
                from: "IndividualChatMessage",
                localField: "_id",
                foreignField: "individualChatId",
                as: "messages",
            },
        },
        { $unwind: { path: "$messages", preserveNullAndEmptyArrays: true } },
        { $sort: { "messages.createdAt": -1 } },
        { $skip: skip },
        { $limit: limit },
    ]);
    return chat.length > 0 ? chat[0] : null;
};



individualChatService.deleteIndividualChatFromDb = async(userId, individualChatId) => {
    const deleteChatResult = await IndividualChatModel.deleteOne({ _id: individualChatId });
    if (deleteChatResult.deletedCount === 0) {
        return false; 
    }
    await IndividualChatMessageModel.deleteMany({ individualChatId });
    return true; 
};











