import {
   PRODUCT_LIST_FAILED,
   PRODUCT_LIST_REQUEST,
   PRODUCT_LIST_SUCCESS,
   PRODUCT_DETAIL_FAILED,
   PRODUCT_DETAIL_SUCCESS,
   PRODUCT_DETAIL_REQUEST,
} from "../actions/types";

const productListState = {
   products: [],
   loading: false,
   error: null,
};
const productDetailState = {
   loading: false,
   product: {},
};

export const productListReducer = (state = productListState, action) => {
   const { type, payload } = action;
   switch (type) {
      case PRODUCT_LIST_REQUEST:
         return {
            loading: true,
            products: [],
         };

      case PRODUCT_LIST_SUCCESS:
         return {
            ...state,
            products: payload,
            loading: false,
         };
      case PRODUCT_LIST_FAILED:
         return {
            products: {},
            loading: false,
            error: payload,
         };
      default:
         return state;
   }
};

export const productDetailReducer = (state = productDetailState, action) => {
   const { type, payload } = action;
   switch (type) {
      case PRODUCT_DETAIL_REQUEST:
         return {
            loading: true,
         };

      case PRODUCT_DETAIL_SUCCESS:
         return {
            ...state,
            product: payload,
            loading: false,
         };
      case PRODUCT_DETAIL_FAILED:
         return {
            loading: false,
            error: payload,
         };
      default:
         return state;
   }
};
