import { NEW_MESSAGE } from "../Types/Types";

export const setInput = input => {
  return { type: NEW_MESSAGE, input: input };
};
