let currentUser = "";
export const updateCurrentUserName = (name) => {
    currentUser = name;
};

export const getCurrentUserName = () => {
    return currentUser;
}