import { ADD_MESSAGE } from "../Types/Types";

export const addMessage = (msg, sender, dpURL) => {
  return { type: ADD_MESSAGE, sender, Message: msg, dpURL };
};
