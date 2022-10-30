import { legacy_createStore as createStore } from "redux";
import CountReducer from "./reducers/count.reducer";

const store=createStore(CountReducer);
export default store;
