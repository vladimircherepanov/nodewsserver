import { games } from "../data/games.js";

export const createGameId = (user1, user2) => {
    const gameId =  games.length + 1;
    games.push({ gameId: gameId, gameUsers: [
            { username: user1, index: 1, ships: [], shipsResponse: [] },
            { username: user2, index: 2, ships: [], shipsResponse: [] }
            ] });
    //console.log(games);
    return gameId;
}