import { combineReducers } from "redux"

import {
   productListReducer,
   productDetailReducer,
   reviewAddReducer,
} from "./productReducer"
import { cartReducer } from "./cartReducer"
import { authReducer } from "./authReducer"
import {
   orderReducer,
   orderDetailReducer,
   myOrderDetailReducer,
   modifyOrderStatus,
} from "./orderReducer"
const rootReducer = combineReducers({
   productList: productListReducer,
   productDetails: productDetailReducer,
   cart: cartReducer,
   userDetail: authReducer,
   orders: orderReducer,
   orderDetails: orderDetailReducer,
   myOrder: myOrderDetailReducer,
   modifyOrderStatus,
   reviewAddStatus: reviewAddReducer,
})

export default rootReducer
