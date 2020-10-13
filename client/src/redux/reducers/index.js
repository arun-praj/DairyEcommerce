import { combineReducers } from "redux";

import { productListReducer } from "./productReducer";

const rootReducer = combineReducers({
   productList: productListReducer,
});

export default rootReducer;
