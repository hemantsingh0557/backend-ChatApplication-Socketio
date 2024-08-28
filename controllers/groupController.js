import { groupService } from "../services/groupService.js";
import { createErrorResponse, createSuccessResponse } from "../utils/commonFunctions/responseHelper.js";
import { ERROR_TYPES } from "../utils/constants.js";
import { RESPONSE_MESSAGE } from "../utils/messages.js";

export const groupController = {} ;


groupController.createGroup = async(payload) => {
    const { userId, groupName, groupImage, groupMembersIds } = payload;
    const newGroupDetails = await groupService.createGroupInDb(userId, groupName, groupImage, groupMembersIds);
    if (!newGroupDetails) {
        return createErrorResponse(RESPONSE_MESSAGE.GROUP_NOT_CREATED, ERROR_TYPES.INTERNAL_SERVER_ERROR);
    }
    return createSuccessResponse(RESPONSE_MESSAGE.GROUP_CREATED, { newGroupDetails });
};




groupController.getGruopChat = async(payload) => {
    const { userId , groupChatId , limit, skip } = payload;
    const chats = await groupService.getGroupChatFromDb(userId, groupChatId, limit, skip);
    if (!chats) {
        return createErrorResponse(RESPONSE_MESSAGE.GROUP_NOT_FOUND, ERROR_TYPES.INTERNAL_SERVER_ERROR);
    }
    if (chats.length === 0 ) {
        return createErrorResponse(RESPONSE_MESSAGE.CHAT_MESSAGE_NOT_FOUND, ERROR_TYPES.DATA_NOT_FOUND);
    }
    return createSuccessResponse(RESPONSE_MESSAGE.GROUP_FOUND, { chats });
};


groupController.deleteGroup = async(payload) => {
    const { userId, groupId } = payload;
    const result = await groupService.deleteGroupFromDb(userId, groupId);
    if (!result) {
        return createErrorResponse(RESPONSE_MESSAGE.GROUP_NOT_DELETED, ERROR_TYPES.INTERNAL_SERVER_ERROR);
    }
    return createSuccessResponse(RESPONSE_MESSAGE.GROUP_DELETED);
};




groupController.getGroupMembers = async(payload) => {
    const { userId, groupId } = payload;
    const groupMembers = await groupService.getGroupMembersFromDb(userId, groupId);
    if (!groupMembers) {
        return createErrorResponse(RESPONSE_MESSAGE.GROUP_NOT_DELETED, ERROR_TYPES.INTERNAL_SERVER_ERROR);
    }
    if (groupMembers.length === 0 ) {
        return createErrorResponse(RESPONSE_MESSAGE.GROUP_MEMBERS_NOT_FOUND, ERROR_TYPES.DATA_NOT_FOUND);
    }
    return createSuccessResponse(RESPONSE_MESSAGE.GROUP_MEMBERS_FETCHED , { groupMembers } );
};





