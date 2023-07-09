import { games } from "../data/games.js";

export const addShipsToGame = (parsedData) => {
    const { gameId, indexPlayer, ships } = parsedData;
    const game = games.find(game => game.gameId === gameId);
    const user = game.gameUsers.find(user => user.index === indexPlayer);
    let shipId = 0;
    ships.forEach(ship => {
        let x = ship.position.x;
        let y = ship.position.y;
        shipId++;
        if(ship.direction === true) {
            for(let i = 0; i < ship.length; i++ ) {
                let y1 = y + i;
                user.ships.push({ id: shipId, x: x, y: y1, active: true });
            }
        } else {
            for(let i = 0; i < ship.length; i++ ) {
                let x1 = x + i;
                user.ships.push({ id: shipId, x: x1, y: y, active: true });
            }
        }
    });
    if((game.gameUsers.find(user => user.index === 1).ships.length + game.gameUsers.find(user => user.index === 2).ships.length) === 40) {
        //console.log("startGame!!!!");
        return {user1: game.gameUsers.find(user => user.index === 1).username, user2: game.gameUsers.find(user => user.index === 2).username }
    };
}