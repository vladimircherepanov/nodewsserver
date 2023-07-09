import { createRoomId } from "../middlewares/createRoomId.js";

export const createRoom = (currentUserName) => {
    //console.log("create room", currentUserName);
    createRoomId(currentUserName);

};