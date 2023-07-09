import { WebSocketServer} from "ws";
import dotenv from 'dotenv';
import { websocketMain } from "./websockets/websocketMain.js";

dotenv.config();

const wss = new WebSocketServer({port: process.env.PORT});

wss.on('connection', (ws) => {
    websocketMain(ws);
});