import { games } from "../data/games.js";


export const finishGame = (data) => {
    const { gameId, indexPlayer} = data;
    const game = games.find(game => game.gameId === gameId);

    const shootCheck = (ships) => {
            if(ships.filter(ship => ship.active === true).length === 0) {
                console.log("FINISHHHHHH BLYA");
                return true;
            } else {
                console.log("HERR WAM");
                return false;
            }
        };

    if(indexPlayer === 1) {
        const ships = game.gameUsers.find(user => user.index === 2).ships;
        return shootCheck(ships);
    } else {
        const ships = game.gameUsers.find(user => user.index === 1).ships;
        return shootCheck(ships);
    }
};