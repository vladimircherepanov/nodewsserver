import { rooms } from "../data/rooms.js";

export const createRoomId = (name) => {
    const roomId =  rooms.length + 1;
    rooms.push({ roomId: roomId, roomUsers: [{ name: name, index: 1 }] });
    return roomId;
}

