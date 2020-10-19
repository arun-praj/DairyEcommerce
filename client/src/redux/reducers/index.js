import { combineReducers } from "redux";

import { productListReducer, productDetailReducer } from "./productReducer";

const rootReducer = combineReducers({
   productList: productListReducer,
   productDetails: productDetailReducer,
});

export default rootReducer;
