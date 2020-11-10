import {
   ORDER_CREATE_FAILED,
   ORDER_DETAILS_FAILED,
   ORDER_DETAILS_REQUEST,
   ORDER_DETAILS_SUCCESS,
   ORDER_CREATE_REQUEST,
   ORDER_CREATE_SUCCESS,
   MY_ORDER_DETAILS_FAILED,
   MY_ORDER_DETAILS_REQUEST,
   MY_ORDER_DETAILS_SUCCESS,
   MODIFY_ORDER_FAILED,
   MODIFY_ORDER_REQUEST,
   MODIFY_ORDER_SUCCESS,
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
const myOrderDetailReducer = (state = {}, action) => {
   const { payload, type } = action
   switch (type) {
      case MY_ORDER_DETAILS_REQUEST:
         return {
            ...state,
            loading: true,
         }
      case MY_ORDER_DETAILS_SUCCESS:
         return {
            ...state,
            loading: false,
            order: payload,
         }
      case MY_ORDER_DETAILS_FAILED:
         return {
            ...state,
            loading: false,
            order: [],
            error: payload,
         }
      default:
         return {
            ...state,
         }
   }
}
const modifyOrderStatus = (state = {}, action) => {
   const { payload, type } = action
   switch (type) {
      case MODIFY_ORDER_REQUEST:
         return {
            ...state,
            loading: true,
         }
      case MODIFY_ORDER_SUCCESS:
         return {
            ...state,
            loading: false,
            success: true,
            modifiedOrder: payload,
            error: null,
         }
      case MODIFY_ORDER_FAILED:
         return {
            ...state,
            loading: false,
            success: false,
            error: payload,
         }
      default:
         return state
   }
}
export {
   orderReducer,
   orderDetailReducer,
   myOrderDetailReducer,
   modifyOrderStatus,
}
