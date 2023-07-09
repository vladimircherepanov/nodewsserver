import { rooms } from "../data/rooms.js";


export const updateRoomState = (ws) => {

    if (rooms.length > 0) {
        const lastRoom = rooms[rooms.length - 1];

        ws.send(JSON.stringify({
            type: "update_room",
            data: JSON.stringify([{
                roomId: lastRoom.roomId,
                roomUsers: lastRoom.roomUsers
            }]),
            id: 0
        }));
    }
};

