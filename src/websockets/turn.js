export const turn = (ws1, ws2, userId) => {
    ws1.send(
        JSON.stringify({
            type: "turn",
            data: JSON.stringify({
                currentPlayer: userId,
            }),
            id: 0
        })
    );
    ws2.send(
        JSON.stringify({
            type: "turn",
            data: JSON.stringify({
                currentPlayer: userId,
            }),
            id: 0
        })
    );
}