import { PRODUCT_LIST_FAILED, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../actions/types";

const initialState = {
   products: [],
   loading: false,
   error: null,
};

export const productListReducer = (state = initialState, action) => {
   const { type, payload } = action;
   switch (type) {
      case PRODUCT_LIST_REQUEST:
         return {
            loading: true,
            products: [],
         };

      case PRODUCT_LIST_SUCCESS:
         console.log(payload);
         return {
            ...state,
            products: payload,
            loading: false,
         };
      case PRODUCT_LIST_FAILED:
         return {
            products: [],
            loading: false,
            error: payload,
         };
      default:
         return state;
   }
};
