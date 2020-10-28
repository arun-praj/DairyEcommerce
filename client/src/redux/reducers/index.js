import { combineReducers } from "redux"

import { productListReducer, productDetailReducer } from "./productReducer"
import { cartReducer } from "./cartReducer"
import { authReducer } from "./authReducer"
const rootReducer = combineReducers({
   productList: productListReducer,
   productDetails: productDetailReducer,
   cart: cartReducer,
   userDetail: authReducer,
})

export default rootReducer
