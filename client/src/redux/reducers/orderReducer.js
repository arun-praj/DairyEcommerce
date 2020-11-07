import {
   ORDER_CREATE_FAILED,
   ORDER_DETAILS_FAILED,
   ORDER_DETAILS_REQUEST,
   ORDER_DETAILS_SUCCESS,
   ORDER_CREATE_REQUEST,
   ORDER_CREATE_SUCCESS,
} from "../actions/types"

const orderReducer = (state = {}, action) => {
   const { payload, type } = action
   switch (type) {
      case ORDER_CREATE_REQUEST:
         return {
            ...state,
            loading: true,
         }
      case ORDER_CREATE_SUCCESS:
         return {
            ...state,
            loading: false,
            success: true,
            order: payload,
         }
      case ORDER_CREATE_FAILED:
         return {
            ...state,
            loading: false,
            success: false,
            error: payload,
         }
      default:
         return {
            ...state,
         }
   }
}
const initialOrderDetailState = {
   orderItems: [],
   shippingAddress: {},
}
const orderDetailReducer = (state = initialOrderDetailState, action) => {
   const { payload, type } = action
   switch (type) {
      case ORDER_DETAILS_REQUEST:
         return {
            ...state,
            loading: true,
         }
      case ORDER_DETAILS_SUCCESS:
         return {
            ...state,
            loading: false,
            shippingAddress: payload.shippingAddress,
            orderItems: payload.orderItems,
         }
      case ORDER_DETAILS_FAILED:
         return {
            ...state,
            loading: false,
            shippingAddress: {},
            orderItems: [],
            error: payload,
         }
      default:
         return {
            ...state,
         }
   }
}
export { orderReducer, orderDetailReducer }
