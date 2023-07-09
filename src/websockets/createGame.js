export const createGame = (ws1, ws2, gameId) => {
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
};