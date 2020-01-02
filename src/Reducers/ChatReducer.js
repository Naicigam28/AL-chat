import {
  ADD_MESSAGE,
  NEW_MESSAGE,
  CLEAR,
  SET_ONLINE_USERS,
  LOADING
} from "../Types/Types";

let counter = 0;
const init = {
  messages: [{ sender: "System", Message: "Welcome", id: counter }],
  input: "",
  users: [],
  loading: false
};
export const display = (state = init, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        messages: [
          ...state.messages,
          {
            sender: action.sender,
            Message: action.Message,
            dpURL: action.dpURL,
            id: ++counter
          }
        ],
        input: state.input,
        users: state.users,
        loading: false
      };
    case NEW_MESSAGE:
      return {
        messages: state.messages,
        input: action.input,
        id: counter,
        users: state.users,
        loading: false
      };

    case CLEAR:
      counter = 0;
      return {
        messages: [],
        input: state.input,
        id: 0,
        users: state.users,
        loading: false
      };
    case SET_ONLINE_USERS:
      return {
        messages: state.messages,
        input: state.input,
        users: action.users,
        loading: false
      };
    case LOADING:
      return {
        messages: state.messages,
        input: state.input,
        users: state.users,
        loading: action.loading
      };

    default:
      return state;
  }
};
