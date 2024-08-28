import jwt from "jsonwebtoken";
import config from "../config/index.js";
import { RESPONSE_MESSAGE } from "../utils/messages.js";

export const socketAuthService = (socket, next) => {
    const token = socket.handshake.auth.token; 
    if (!token) {
        return next(new Error(RESPONSE_MESSAGE.TOKEN_MISSING));
    }
    jwt.verify(token, config.jwt.secret, (err, decoded) => {
        if (err) {
            return next(new Error(RESPONSE_MESSAGE.TOKEN_INVALID));
        }
        socket.userId = decoded.userId; 
        next();
    });
};
