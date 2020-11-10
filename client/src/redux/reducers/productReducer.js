import {
   PRODUCT_LIST_FAILED,
   PRODUCT_LIST_REQUEST,
   PRODUCT_LIST_SUCCESS,
   PRODUCT_DETAIL_FAILED,
   PRODUCT_DETAIL_SUCCESS,
   PRODUCT_DETAIL_REQUEST,
   REVIEW_ADD_REQUEST,
   REVIEW_ADD_SUCCESS,
   REVIEW_ADD_FAILED,
} from "../actions/types"

const productListState = {
   products: [],
   loading: false,
   error: null,
}
const productDetailState = {
   loading: false,
   product: {},
}

export const productListReducer = (state = productListState, action) => {
   const { type, payload } = action
   switch (type) {
      case PRODUCT_LIST_REQUEST:
         return {
            loading: true,
            products: [],
         }

      case PRODUCT_LIST_SUCCESS:
         return {
            ...state,
            products: payload,
            loading: false,
         }
      case PRODUCT_LIST_FAILED:
         return {
            products: {},
            loading: false,
            error: payload,
         }
      default:
         return state
   }
}

export const productDetailReducer = (state = productDetailState, action) => {
   const { type, payload } = action
   switch (type) {
      case PRODUCT_DETAIL_REQUEST:
         return {
            loading: true,
         }

      case PRODUCT_DETAIL_SUCCESS:
         return {
            ...state,
            product: payload,
            loading: false,
         }
      case PRODUCT_DETAIL_FAILED:
         return {
            loading: false,
            error: payload,
         }
      default:
         return state
   }
}

const reviewAddReducer = (state = {}, action) => {
   const { type, payload } = action
   switch (type) {
      case REVIEW_ADD_REQUEST:
         return {
            loading: true,
         }

      case REVIEW_ADD_SUCCESS:
         return {
            ...state,
            message: payload,
            loading: false,
         }
      case REVIEW_ADD_FAILED:
         return {
            loading: false,
            error: payload,
            message: "",
         }
      default:
         return state
   }
}
