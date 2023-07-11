import { addUserToRoom } from "../middlewares/addUserToRoom.js";
import { addShipsToGame } from "../middlewares/addShipsToGame.js";
import { attackHandler } from "../middlewares/attackHandler.js";
import { createGameId } from "../middlewares/createGameId.js";
import { createRoomId } from "../middlewares/createRoomId.js";
import { greetings } from "./greetings.js";
import { reg } from "./reg.js";
import { startGame } from "./startGame.js";
import { updateRoomState } from "./updateRoomState.js";
import { attack } from "./attack.js";
import { createGame } from "./createGame.js";
import { finishGame } from "./finishGame.js";
import { turn } from "./turn.js";
import { rooms } from "../data/rooms.js";
import { games } from "../data/games.js";


const connectedClients = [];

export const index = (ws) => {
    ws.on('error', console.error);
    greetings(ws); // Welcome

    ws.on('message', (data) => {
        const type = JSON.parse(data).type;

        switch (type) {
            case "reg": {
                reg(ws, data); // Login handler
                const name = JSON.parse(JSON.parse(data).data).name;
                connectedClients.push({ ws: ws, username: name });
                updateRoomState(ws);
            }
                break;
            case "create_room": {
                const name = connectedClients.find(user => user.ws === ws).username;
                createRoomId(name);
                connectedClients.forEach(client => {
                    updateRoomState(client.ws);
                });
            }
                break;

            case "add_user_to_room": {
                const indexRoom = JSON.parse(JSON.parse(data).data)['indexRoom'];
                const name = connectedClients.find(user => user.ws === ws).username;
                console.log("add_user_to_room", name);
                addUserToRoom(name, indexRoom);
                const room = rooms.find(room => room.roomId === indexRoom);
                const [user1, user2] = room.roomUsers.map((user) => user.name);
                const ws1 = connectedClients.find(user => user.username === user1).ws;
                const ws2 = connectedClients.find(user => user.username === user2).ws;
                createGame(ws1, ws2, createGameId(user1, user2));
            }
                break;

            case "add_ships":
            {
                const parsedData = JSON.parse(JSON.parse(data).data);
                const users = (addShipsToGame(parsedData));
                if(users) {
                    const ws1 = connectedClients.find(user => user.username === users.user1).ws;
                    const ws2 = connectedClients.find(user => user.username === users.user2).ws;
                    const game = games.find(game => game.gameId === parsedData.gameId);
                    const ships1 = game.gameUsers.find(user => user.index === 1).ships;
                    const ships2 = game.gameUsers.find(user => user.index === 2).ships;
                    startGame(ws1, ws2, ships1, ships2);
                    turn(ws1, ws2, 1) // Set first user for start
                }

            }
            break;
            case "attack": {
                const parsedData = JSON.parse(JSON.parse(data).data);
                const shootResult = attackHandler(parsedData);
                const game = games.find(game => game.gameId === parsedData.gameId);
                const user1 = game.gameUsers.find(user => user.index === 1).username;
                const user2 = game.gameUsers.find(user => user.index === 2).username;
                const ws1 = connectedClients.find(user => user.username === user1).ws;
                const ws2 = connectedClients.find(user => user.username === user2).ws;
                const currentUser = () => { if(parsedData.indexPlayer === 1) { return 2 } else { return 1 }};

                switch (shootResult) {
                    case "miss": {
                        attack(ws1, ws2, parsedData, "missed");
                        turn(ws1, ws2, currentUser());
                    }
                        break;

                    case "shot": {
                        attack(ws1, ws2, parsedData, "shot");
                        turn(ws1, ws2, parsedData.indexPlayer);
                    }
                    break;

                    case "killed": {
                        turn(ws1, ws2, parsedData.indexPlayer);
                        attack(ws1, ws2, parsedData, "killed");
                        if(finishGame(parsedData)) {
                            finishGame(ws1, ws2, parsedData.indexPlayer);
                        }
                    }
                        break;

                }
            }
            break;

            default: {
                console.log("wrong message type")
            }

        }
    });
    ws.close;
    console.log('WS connection closed');

}