import { ADD_MESSAGE, LOADING } from "../Types/Types";

export const setLoading = load => {
  return { type: LOADING, loading: load };
};
