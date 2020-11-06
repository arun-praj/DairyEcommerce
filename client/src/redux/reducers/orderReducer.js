import { ORDER_CREATE_FAILED, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from "../actions/types"

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
export { orderReducer }
