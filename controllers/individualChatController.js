import { individualChatService } from "../services/individualChatService.js";
import { createErrorResponse, createSuccessResponse } from "../utils/commonFunctions/responseHelper.js";
import { ERROR_TYPES } from "../utils/constants.js";
import { RESPONSE_MESSAGE } from "../utils/messages.js";

export const individualChatController = {} ;

individualChatController.selectedFriend = async(payload) => {
    const { userId, friendId } = payload;
    const individualChatDetails = await individualChatService.checkIndividualChatInDb(userId, friendId);
    if (!individualChatDetails) {
        return createErrorResponse(RESPONSE_MESSAGE.CHAT_NOT_FOUND, ERROR_TYPES.INTERNAL_SERVER_ERROR);
    }
    const chats = await individualChatService.getIndividualChatFromDb(userId, individualChatDetails._id, 20, 0);
    if (!chats || chats.length === 0) {
        return createErrorResponse(RESPONSE_MESSAGE.CHAT_MESSAGE_NOT_FOUND, ERROR_TYPES.DATA_NOT_FOUND , { individualChatId:individualChatDetails._id });
    }
    return createSuccessResponse(RESPONSE_MESSAGE.CHAT_MESSAGE_FOUND, { individualChatId:individualChatDetails._id , chats });
} ;





individualChatController.getIndividualChat = async(payload) => {
    const { userId , individualChatId , limit, skip } = payload;
    const chats = await individualChatService.getIndividualChatFromDb(userId, individualChatId, limit, skip);
    if (!chats) {
        return createErrorResponse(RESPONSE_MESSAGE.CHAT_MESSAGE_NOT_FOUND, ERROR_TYPES.DATA_NOT_FOUND);
    }
    return createSuccessResponse(RESPONSE_MESSAGE.CHAT_FOUND, { chats });
};


individualChatController.deleteIndividualChat = async(payload) => {
    const { userId, individualChatId } = payload;
    const result = await individualChatService.deleteIndividualChatFromDb(userId, individualChatId);
    if (!result) {
        return createErrorResponse(RESPONSE_MESSAGE.CHAT_NOT_DELETED, ERROR_TYPES.INTERNAL_SERVER_ERROR);
    }
    return createSuccessResponse(RESPONSE_MESSAGE.CHAT_DELETED);
};







