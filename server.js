import express from "express";
import { createServer } from "http";
import { expressStartup } from "./startup/expressStartup.js";
import { dbConnection } from "./startup/dbConnection.js";  
import config from "./config/index.js";  
import { setupSocket } from "./socket/index.js";

const app = express();
const server = createServer(app);

const startServer = async() => {
    await dbConnection();
    await expressStartup(app);
    await setupSocket(server) ;
};

startServer().then(() => {
    server.listen(config.server.port, () => {
        console.log(`Server is running on http://localhost:${config.server.port}`);
    });
}).catch((error) => {
    console.error("Failed to start the server:", error);
});

  

