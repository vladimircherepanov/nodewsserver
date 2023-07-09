import { games } from "../data/games.js";


export const attackHandler = (data) => {
    const { gameId, indexPlayer, x, y } = data;
    const game = games.find(game => game.gameId === gameId);

    const shootCheck = (ships, x, y) => {
        const ship = ships.find(ship => ship.x === x && ship.y === y);

        if(ship) {
            ship.active = false;
            console.log(ships, "true");
            const shipId = ship.id;
            if(ships.filter(ship => ship.id ===  shipId && ship.active === true).length === 0) {
                console.log("killed");
                return "killed";
            } else {
                console.log("shot");
                return "shot";
            }
        } else {
            console.log("miss");
            return "miss";
        }
    };

    if(indexPlayer === 1) {
        const ships = game.gameUsers.find(user => user.index === 2).ships;
        return shootCheck(ships, x, y);
    } else {
        const ships = game.gameUsers.find(user => user.index === 1).ships;
        return shootCheck(ships, x, y);
    }
};