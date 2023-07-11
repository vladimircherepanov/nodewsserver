export const attack = (ws1, ws2, parsedData, result) => {
    ws1.send(
        JSON.stringify({
            type: "attack",
            data: JSON.stringify({
                position: { x: parsedData.x, y: parsedData.y},
                currentPlayer: parsedData.indexPlayer,
                status: result
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
                status: result
            }),
            id: 0
        })
    );


}