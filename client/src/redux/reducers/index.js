import { combineReducers } from "redux"

import { productListReducer, productDetailReducer } from "./productReducer"
import { cartReducer } from "./cartReducer"
import { authReducer } from "./authReducer"
import { orderReducer, orderDetailReducer } from "./orderReducer"
const rootReducer = combineReducers({
   productList: productListReducer,
   productDetails: productDetailReducer,
   cart: cartReducer,
   userDetail: authReducer,
   orders: orderReducer,
   orderDetails: orderDetailReducer,
})

export default rootReducer
