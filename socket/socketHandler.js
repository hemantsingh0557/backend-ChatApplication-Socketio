import { groupService } from "../services/groupService.js";
import { individualChatService } from "../services/individualChatService.js";
import { scoketsEventsDataValidation } from "../services/scoketsEventsDataValidation.js";
import { socketAuthService } from "../services/socketAuthService.js";
import { userService } from "../services/userService.js";
import { SOCKET_EVENTS } from "../utils/constants.js";
import { RESPONSE_MESSAGE } from "../utils/messages.js";

export const setupSocket = (io) => {
    io.use(socketAuthService);

    io.on(SOCKET_EVENTS.CONNECTION, async(socket) => {
        console.log("A user connected:", socket.id);

        const userId = socket.userId;
        try 
        {
            await userService.updateUserStatus(userId, { online: true, lastSeen: new Date() });
            socket.broadcast.emit(SOCKET_EVENTS.USER_STATUS_CHANGED, {
                userId,
                online: true,
                lastSeen: new Date(),
                message: RESPONSE_MESSAGE.USER_ONLINE,
            });
        } 
        catch (error) {
            console.error(RESPONSE_MESSAGE.ERROR_UPDATING_STATUS, error);
        }

        // individual chat events
        socket.on(SOCKET_EVENTS.JOIN_ROOM, (roomId) => {
            try {
                scoketsEventsDataValidation.validateJoinRoom(roomId, () => {
                    socket.join(roomId);
                    console.log(`User ${socket.id} joined room ${roomId}`);
                });
            } 
            catch (error) {
                console.error(RESPONSE_MESSAGE.ERROR_JOINING_ROOM, error);
            }
        });
        socket.on(SOCKET_EVENTS.SEND_MESSAGE, async(data) => {
            try {
                scoketsEventsDataValidation.validateSendMessage(data, async() => {
                    await individualChatService.createOrUpdateChatAndSaveMessage(
                        data.roomId,
                        data.message.senderId,
                        data.message.recipientId,
                        data.message.textMessage,
                        data.message.images,
                    );
                    io.to(data.roomId).emit(SOCKET_EVENTS.CHAT_MESSAGE, data.message);
                });
            } 
            catch (error) {
                console.error(RESPONSE_MESSAGE.ERROR_SENDING_MESSAGE, error);
            }
        });


        //  group chat events
        socket.on(SOCKET_EVENTS.JOIN_GROUP, (groupId) => {
            try {
                scoketsEventsDataValidation.validateJoinGroupRoom({ groupId: groupId }, () => {
                    socket.join(groupId);
                    console.log(`User ${socket.id} joined group ${groupId}`);
                });
            } 
            catch (error) {
                console.error(RESPONSE_MESSAGE.ERROR_JOINING_GROUP, error);
            }
        });
        socket.on(SOCKET_EVENTS.SEND_GROUP_MESSAGE, async(data) => {
            try {
                scoketsEventsDataValidation.validateSendMessageInGroup(data, async() => {
                    await groupService.saveGroupMessage(data.groupId, data.message);
                    io.to(data.groupId).emit(SOCKET_EVENTS.GROUP_MESSAGE_RECEIVED, data.message);
                });
            } 
            catch (error) {
                console.error(RESPONSE_MESSAGE.ERROR_SENDING_GROUP_MESSAGE, error);
            }
        });


        socket.on(SOCKET_EVENTS.DISCONNECT, async() => {
            console.log("User disconnected:", socket.id);
            try {
                await userService.updateUserStatus(userId, { online: false, lastSeen: new Date() });
                socket.broadcast.emit(SOCKET_EVENTS.USER_STATUS_CHANGED, {
                    userId,
                    online: false,
                    lastSeen: new Date(),
                    message: RESPONSE_MESSAGE.USER_OFFLINE,
                });
            } 
            catch (error) {
                console.error(RESPONSE_MESSAGE.ERROR_UPDATING_STATUS_ON_DISCONNECT, error);
            }
        });
    });
};
