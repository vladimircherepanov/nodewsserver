import { verifyLogin } from "../middlewares/verifiLogin.middleware.js";
import { updateCurrentUserName } from "../utils/updateCurrentUserName.js";

export const reg = (ws, data) => {
    const {name, password} = JSON.parse(JSON.parse(data).data);
    if (verifyLogin(name, password)) {
        updateCurrentUserName(name);
        ws.send(JSON.stringify({
            type: "reg",
            data: JSON.stringify({
                name: name,
                index: 1,
                error: false,
                errorText: "",
            }),
            id: 0
        }));
        console.log("YES");
    } else {
        ws.send(JSON.stringify({
            type: "reg",
            data: JSON.stringify(
                {
                    name: name,
                    index: 1,
                    error: true,
                    errorText: "Wrong username or password",
                }),
            id: 0,
        }));
    }
};