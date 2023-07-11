import { WebSocketServer} from "ws";
import dotenv from 'dotenv';
import { index } from "./websockets/index.js";

dotenv.config();

const wss = new WebSocketServer({port: process.env.PORT});

wss.on('connection', (ws) => {
    index(ws);
});