import { combineReducers } from "redux"

import { productListReducer, productDetailReducer } from "./productReducer"
import { cartReducer } from "./cartReducer"
import { authReducer } from "./authReducer"
import { orderReducer } from "./orderReducer"
const rootReducer = combineReducers({
   productList: productListReducer,
   productDetails: productDetailReducer,
   cart: cartReducer,
   userDetail: authReducer,
   orders: orderReducer,
})

export default rootReducer
