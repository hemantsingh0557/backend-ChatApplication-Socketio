import { SOCKET_EVENTS } from "../utils/constants.js";


export const setupSocket = (io) => {
    io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
        console.log("A user connected:", socket.id);
        
        socket.on(SOCKET_EVENTS.JOIN_ROOM, (room) => {
            socket.join(room);
            console.log(`User ${socket.id} joined room ${room}`);
        });
        
        socket.on(SOCKET_EVENTS.CHAT_MESSAGE, ({ room, message }) => {
            io.to(room).emit(SOCKET_EVENTS.CHAT_MESSAGE, { id: socket.id, message });
            console.log(`Message from ${socket.id} to room ${room}: ${message}`);
        });
        
        socket.on(SOCKET_EVENTS.USER_LOGIN, async(userData) => {
            try {
                console.log(`User ${userData.username} logged in`);
                io.emit(SOCKET_EVENTS.USER_STATUS_UPDATE, { userId: socket.id, status: "online" });
            } catch (error) {
                console.error("Error during login:", error);
            }
        });
        
        socket.on(SOCKET_EVENTS.USER_LOGOUT, async() => {
            try {
                console.log(`User ${socket.id} logged out`);
                io.emit(SOCKET_EVENTS.USER_STATUS_UPDATE, { userId: socket.id, status: "offline" });
            } catch (error) {
                console.error("Error during logout:", error);
            }
        });
        


        socket.on(SOCKET_EVENTS.DISCONNECT, () => {
            console.log("User disconnected:", socket.id);
        });
    });
};
