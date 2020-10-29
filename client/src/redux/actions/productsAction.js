import {
   PRODUCT_LIST_FAILED,
   PRODUCT_LIST_REQUEST,
   PRODUCT_LIST_SUCCESS,
   PRODUCT_DETAIL_FAILED,
   PRODUCT_DETAIL_SUCCESS,
   PRODUCT_DETAIL_REQUEST,
} from "./types"
import axios from "axios"

export const listProducts = (keyword = "") => async (dispatch) => {
   try {
      dispatch({
         type: PRODUCT_LIST_REQUEST,
      })

      const {
         data: { data },
      } = await axios.get(`/api/products?keyword=${keyword}`)
      dispatch({
         type: PRODUCT_LIST_SUCCESS,
         payload: data,
      })
   } catch (e) {
      dispatch({
         type: PRODUCT_LIST_FAILED,
         payload:
            e.message && e.response.data.message
               ? e.response.data.message
               : "Server didnt response",
      })
   }
}

export const listProductDetails = (productId) => async (dispatch) => {
   try {
      dispatch({
         type: PRODUCT_DETAIL_REQUEST,
      })
      const { data } = await axios.get(`/api/products/${productId}`)
      // console.log(data.data);
      dispatch({
         type: PRODUCT_DETAIL_SUCCESS,
         payload: data.data,
      })
   } catch (e) {
      console.log(e)
      dispatch({
         type: PRODUCT_DETAIL_FAILED,
         payload:
            e.message && e.response.data.message
               ? e.response.data.message
               : "Server didnt response",
      })
   }
}
