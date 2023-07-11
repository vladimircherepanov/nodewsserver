import { rooms } from "../data/rooms.js";

export const addUserToRoom = (name, indexRoom ) => {
    //console.log(indexRoom, "room:", rooms.find(room => room.roomId === indexRoom), name);

    const newRoomUser = {
        name: name,
        index: 2
    };

    const existingStructure = rooms.find(room => room.roomId === indexRoom);
    if (existingStructure) {
        const roomUsers = existingStructure.roomUsers;
        roomUsers.push(newRoomUser);
        //console.table(rooms);
    }
};
