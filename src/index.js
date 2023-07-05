import { WebSocketServer} from "ws";
import dotenv from 'dotenv'
import { verifyLogin } from "./middlewares/verifiLogin.middleware.js"


dotenv.config();

const wss = new WebSocketServer({port: process.env.PORT});


wss.on('connection', (ws) => {

    ws.on('error', console.error);
        // Welcome
        console.log('WS connection established');
        // Display WebSocket parameters
        console.log('WebSocket URL:', ws.url);
        console.log('WebSocket readyState:', ws.readyState);
        console.log('WebSocket protocol version:', ws.protocol);
        console.log('WebSocket extensions:', ws.extensions);
        console.log('WebSocket remote IP address:', ws._socket.remoteAddress);
        console.log('WebSocket remote port:', ws._socket.remotePort);
    ws.on('message', (data) => {
        const type = JSON.parse(data).type;
        switch (type) {
            case "reg":
            {
                const id = JSON.parse(data).id;
                const { name, password } = JSON.parse(JSON.parse(data).data);
                if(verifyLogin(name, password)) {
                        ws.send(JSON.stringify({
                            type: "reg",
                                data:
                                    {
                                        name: name,
                                        index: 1,
                                        error: false,
                                        errorText: "",
                                    },
                            id: id,
                        }));
                    console.log("YES");
                } else {
                    ws.send(JSON.stringify({
                        type: "reg",
                            data:
                                {
                                    name: name,
                                    index: 1,
                                    error: true,
                                    errorText: "Wrong username password",
                                },
                            id: id,
                            }));
                }
                break;
            }
            default: {
                console.log("xxx")
            }
        };
    });
        ws.on('close', () => {
            console.log('WS connection closed');
    })
});