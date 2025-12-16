import { createStore } from "redux";
import myReducer from "./reducer";
import { loadState } from "../LocalStorage";

const persistedState = loadState();

export const store = createStore(
  myReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
