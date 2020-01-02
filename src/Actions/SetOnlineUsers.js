import { SET_ONLINE_USERS } from "../Types/Types";

export const setOnlineUsers = users => {
  return { type: SET_ONLINE_USERS, users: users };
};
