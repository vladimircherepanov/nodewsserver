import { createRoom } from "./createRoom.js";
import { greetings } from "../utils/greetings.js";
import { reg } from "./reg.js";
import { updateRoomState } from "./updateRoomState.js";
import { addUserToRoom } from "./addUserToRoom.js";
import { rooms } from "../data/rooms.js";
import {createGameId} from "../middlewares/createGameId.js";
import { addShipsToGame } from "./addShipsToGame.js";
import { games } from "../data/games.js";
import { attackHandler } from "./attackHandler.js"
import {finishGame} from "./finishGame.js";

const connectedClients = [];

export const websocketMain = (ws) => {
    ws.on('error', console.error);
    greetings(ws); // Welcome

    ws.on('message', (data) => {
        const type = JSON.parse(data).type;

        switch (type) {
            case "reg": {
                reg(ws, data); // Login handler
                const name = JSON.parse(JSON.parse(data).data).name;
                connectedClients.push({ ws: ws, username: name });
                //console.table(connectedClients);
                updateRoomState(ws);
            }
                break;
            case "create_room": {
                const name = connectedClients.find(user => user.ws === ws).username;
                //console.log("NAME NAME NAME", name);
                createRoom(name);
                connectedClients.forEach(client => {
                    updateRoomState(client.ws);
                });
            }
                break;

            case "update_winners":
            {
                console.log("update_winners");
            }
                break;

            case "add_user_to_room": {
                const indexRoom = JSON.parse(JSON.parse(data).data)['indexRoom'];
                const name = connectedClients.find(user => user.ws === ws).username;
                console.log("add_user_to_room", name);
                addUserToRoom(name, indexRoom);
                const room = rooms.find(room => room.roomId === indexRoom);
                const user1 = room.roomUsers[0].name;
                const user2 = room.roomUsers[1].name;
                const ws1 = connectedClients.find(user => user.username === user1).ws;
                const ws2 = connectedClients.find(user => user.username === user2).ws;
                const gameId = createGameId(user1, user2);

                ws1.send(
                    JSON.stringify({
                        type: "create_game",
                        data: JSON.stringify({
                            idGame: gameId,
                            idPlayer: 1
                        }),
                        id: 0
                    })
                );
                ws2.send(
                    JSON.stringify({
                        type: "create_game",
                        data: JSON.stringify({
                            idGame: gameId,
                            idPlayer: 2
                        }),
                        id: 0
                    })
                );
            }
                break;

            case "add_ships":
            {
                const name = connectedClients.find(user => user.ws === ws).username;
                const parsedData = JSON.parse(JSON.parse(data).data);
                //console.log("add_ships", "gameId:", parsedData.gameId, parsedData);
                const users = (addShipsToGame(parsedData));
                if(users) {
                    const ws1 = connectedClients.find(user => user.username === users.user1).ws;
                    const ws2 = connectedClients.find(user => user.username === users.user2).ws;

                    console.log(users.user1, users.user2);
                    const game = games.find(game => game.gameId === parsedData.gameId);
                    const ships1 = game.gameUsers.find(user => user.index === 1).ships;
                    const ships2 = game.gameUsers.find(user => user.index === 2).ships;

                    ws1.send(
                        JSON.stringify({
                            type: "start_game",
                            data: JSON.stringify({
                                ships: JSON.stringify(ships2),
                                currentPlayerIndex: 2,
                            }),
                            id: 0
                        })
                    );
                    ws2.send(
                        JSON.stringify({
                            type: "start_game",
                            data: JSON.stringify({
                                ships: JSON.stringify(ships1),
                                currentPlayerIndex: 1,
                            }),
                            id: 0
                        })
                    );
                    ws1.send(
                        JSON.stringify({
                            type: "turn",
                            data: JSON.stringify({
                                currentPlayer: 1,
                            }),
                            id: 0
                        })
                    );
                    ws2.send(
                        JSON.stringify({
                            type: "turn",
                            data: JSON.stringify({
                                currentPlayer: 1,
                            }),
                            id: 0
                        })
                    );

                };

            }
            break;
            case "attack": {
                const parsedData = JSON.parse(JSON.parse(data).data);
                const shootResult = attackHandler(parsedData);
                const game = games.find(game => game.gameId === parsedData.gameId);
                const user1 = game.gameUsers.find(user => user.index === 1).username;
                const user2 = game.gameUsers.find(user => user.index === 2).username;
                console.log(parsedData);
                const ws1 = connectedClients.find(user => user.username === user1).ws;
                const ws2 = connectedClients.find(user => user.username === user2).ws;
                const currentUser = () => { if(parsedData.indexPlayer === 1) {
                    return 2
                } else { return 1 }};
                console.log(currentUser(), parsedData.indexPlayer);


                if(shootResult === "miss") {
                    ws1.send(
                        JSON.stringify({
                            type: "attack",
                            data: JSON.stringify({
                                position: { x: parsedData.x, y: parsedData.y},
                                currentPlayer: parsedData.indexPlayer,
                                status: "missed"
                            }),
                            id: 0
                        })
                    );
                    ws2.send(
                        JSON.stringify({
                            type: "attack",
                            data: JSON.stringify({
                                position: { x: parsedData.x, y: parsedData.y},
                                currentPlayer: parsedData.indexPlayer,
                                status: "missed"
                            }),
                            id: 0
                        })
                    );
                    ws1.send(
                        JSON.stringify({
                            type: "turn",
                            data: JSON.stringify({
                                currentPlayer: currentUser(),
                            }),
                            id: 0
                        })
                    );
                    ws2.send(
                        JSON.stringify({
                            type: "turn",
                            data: JSON.stringify({
                                currentPlayer: currentUser(),
                            }),
                            id: 0
                        })
                    );
                } else { if (shootResult === "shot") {
                    ws1.send(
                        JSON.stringify({
                            type: "turn",
                            data: JSON.stringify({
                                currentPlayer: parsedData.indexPlayer,
                            }),
                            id: 0
                        })
                    );
                    ws2.send(
                        JSON.stringify({
                            type: "turn",
                            data: JSON.stringify({
                                currentPlayer: parsedData.indexPlayer,
                            }),
                            id: 0
                        })
                    );
                    ws1.send(
                        JSON.stringify({
                            type: "attack",
                            data: JSON.stringify({
                                position: { x: parsedData.x, y: parsedData.y },
                                currentPlayer: parsedData.indexPlayer,
                                status: "shot"
                            }),
                            id: 0
                        })
                    );
                    ws2.send(
                        JSON.stringify({
                            type: "attack",
                            data: JSON.stringify({
                                position: { x: parsedData.x, y: parsedData.y },
                                currentPlayer: parsedData.indexPlayer,
                                status: "shot"
                            }),
                            id: 0
                        })
                    );

                } else { if(shootResult === "killed"){
                    ws1.send(
                        JSON.stringify({
                            type: "turn",
                            data: JSON.stringify({
                                currentPlayer: parsedData.indexPlayer,
                            }),
                            id: 0
                        })
                    );
                    ws2.send(
                        JSON.stringify({
                            type: "turn",
                            data: JSON.stringify({
                                currentPlayer: parsedData.indexPlayer,
                            }),
                            id: 0
                        })
                    );
                    ws1.send(
                        JSON.stringify({
                            type: "attack",
                            data: JSON.stringify({
                                position: { x: parsedData.x, y: parsedData.y },
                                currentPlayer: parsedData.indexPlayer,
                                status: "killed"
                            }),
                            id: 0
                        })
                    );
                    ws2.send(
                        JSON.stringify({
                            type: "attack",
                            data: JSON.stringify({
                                position: { x: parsedData.x, y: parsedData.y },
                                currentPlayer: parsedData.indexPlayer,
                                status: "killed"
                            }),
                            id: 0
                        })
                    );
                    if(finishGame(parsedData)) {
                        ws1.send(
                            JSON.stringify({
                                type: "finish",
                                data: JSON.stringify({
                                    winPlayer: parsedData.indexPlayer,
                                }),
                                id: 0
                            })
                        );
                        ws2.send(
                            JSON.stringify({
                                type: "finish",
                                data: JSON.stringify({
                                    winPlayer: parsedData.indexPlayer,
                                }),
                                id: 0
                            })
                        );
                    }
                }}}
            }
            break;

            default: {
                console.log("wrong message type")
            }

        };
    });
    ws.close;
    console.log('WS connection closed');

}