import { groupService } from "../services/groupService.js";
import { individualChatService } from "../services/individualChatService.js";
import { scoketsEventsDataValidation } from "../services/scoketsEventsDataValidation.js";
import { socketAuthService } from "../services/socketAuthService.js";
import { userService } from "../services/userService.js";
import { SOCKET_EVENTS } from "../utils/constants.js";


export const setupSocket = (io) => {
    io.use(socketAuthService);
    io.on(SOCKET_EVENTS.CONNECTION, async(socket) => {
        console.log("A user connected:", socket.id);

        const userId = socket.userId;
        await userService.updateUserStatus(userId, { online: true, lastSeen: new Date() });

        // // individual chat related events
        socket.on(SOCKET_EVENTS.JOIN_ROOM, (roomId) => {
            scoketsEventsDataValidation.validateJoinRoom(roomId, () => {
                socket.join(roomId);
                console.log(`User ${socket.id} joined room ${roomId}`);
            });
        });    
        socket.on(SOCKET_EVENTS.SEND_MESSAGE, (data) => {
            scoketsEventsDataValidation.validateSendMessage(data, async() => {
                await individualChatService.createOrUpdateChatAndSaveMessage(
                    data.roomId,
                    data.message.senderId,
                    data.message.recipientId,
                    data.message.textMessage,
                    data.message.images ,
                );
                io.to(data.roomId).emit(SOCKET_EVENTS.CHAT_MESSAGE, data.message);
            });
        });



        // // group related events
        socket.on(SOCKET_EVENTS.JOIN_GROUP, (groupId) => {
            scoketsEventsDataValidation.validateJoinGroupRoom({ groupId: groupId }, () => {
                socket.join(groupId);
                console.log(`User ${socket.id} joined group ${groupId}`);
            });
        });
        socket.on(SOCKET_EVENTS.SEND_GROUP_MESSAGE, (data) => {
            scoketsEventsDataValidation.validateSendMessageInGroup(data, async() => {
                await groupService.saveGroupMessage(data.groupId, data.message);
                io.to(data.groupId).emit(SOCKET_EVENTS.GROUP_MESSAGE_RECEIVED, data.message);
            });
        });


        socket.on(SOCKET_EVENTS.DISCONNECT, async() => {
            console.log("User disconnected:", socket.id);

            await userService.updateUserStatus(userId, { online: false, lastSeen: new Date() });
        });
    });
};
