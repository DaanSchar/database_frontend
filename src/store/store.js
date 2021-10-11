import { combineReducers, createStore } from "redux";
import { menuReducer } from "./menuReducer";

const rootReducer = combineReducers({
    menu: menuReducer,
});

const store = createStore(rootReducer);
export default store
