
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
    
    JOIN_ROOM: "joinRoom",
    SEND_MESSAGE: "send Message",
    CHAT_MESSAGE: "chat Message",
    
    JOIN_GROUP: "join Group",
    SEND_GROUP_MESSAGE: "send Group Message",
    GROUP_MESSAGE_RECEIVED: "group Message Received",
    
    USER_STATUS_CHANGED: "user Status Changed",
};





export const allowedFileExtensions = [".jpg", ".jpeg", ".gif", ".png", ".pdf"] ; 
export const FILE_ERROR_MESSAGE = "Invalid file type. Only JPG, JPEG, GIF, PNG, and PDF files are allowed." ;



