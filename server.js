import express from "express";
import { createServer } from "http";
import { expressStartup } from "./startup/expressStartup.js";
import { dbConnection } from "./startup/dbConnection.js";
import config from "./config/index.js";
import { setupSocket } from "./socket/index.js";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

const startServer = async() => {
    await dbConnection();
    await expressStartup(app);
    setupSocket(io);
    
    server.listen(config.server.port, () => {
        console.log(`Server is running on http://localhost:${config.server.port}`);
    });
};

startServer().catch((error) => {
    console.error("Failed to start the server:", error);
});
