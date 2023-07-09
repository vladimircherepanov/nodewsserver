export const startGame = (ws1, ws2, ships1, ships2) => {
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
}