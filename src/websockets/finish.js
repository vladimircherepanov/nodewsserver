export const finish = (ws1, ws2, userId) => {
    ws1.send(
        JSON.stringify({
            type: "finish",
            data: JSON.stringify({
                winPlayer: userId,
            }),
            id: 0
        })
    );
    ws2.send(
        JSON.stringify({
            type: "finish",
            data: JSON.stringify({
                winPlayer: userId,
            }),
            id: 0
        })
    );
};