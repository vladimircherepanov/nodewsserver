import { users } from "../data/users.js";

const createUser = (name, password) => {
    users.push({ name, password });
    console.log("User created", users);
};

export const verifyLogin = (name, password) => {
    const foundUser = users.find(user => user.name === name);

    if (foundUser) {
        if (password === foundUser.password) {
            console.log("Login OK");
            return true;
        } else {
            console.log("Wrong password for user", name);
            return false;
        }
    } else {
        createUser(name, password);
        return true;
    }
};
