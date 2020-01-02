import { createStore } from "redux";
import { display } from "./Reducers/ChatReducer";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(display, composeWithDevTools());
