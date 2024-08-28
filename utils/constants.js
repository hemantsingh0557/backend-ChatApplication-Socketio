
import path from "path";


export const UPLOAD_FILES_DESTINATION = path.join(process.cwd(), "filesFolder");


export const SALT_ROUNDS = 10 ;


export const ERROR_TYPES = {
    DATA_NOT_FOUND: "DATA_NOT_FOUND",
    BAD_REQUEST: "BAD_REQUEST",
    ALREADY_EXISTS: "ALREADY_EXISTS",
    FORBIDDEN: "FORBIDDEN",
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
    UNAUTHORIZED: "UNAUTHORIZED",
};


export const SOCKET_EVENTS = {
    CONNECTION: "connection",
    DISCONNECT: "disconnect",
    CHAT_MESSAGE: "chat message",
    WELCOME: "welcome",
    USER_TYPING: "user is typing",
    JOIN_ROOM: "join room",
    LEAVE_ROOM: "leave room",
    USER_LOGIN: "user login",
    USER_LOGOUT: "user logout",
    USER_STATUS_UPDATE: "user status update",

    // for group events
    JOIN_GROUP: "joinGroup",
    SEND_GROUP_MESSAGE: "sendGroupMessage",
    GROUP_MESSAGE_RECEIVED: "groupMessageReceived",
    NEW_GROUP_CREATED: "newGroupCreated",
};










