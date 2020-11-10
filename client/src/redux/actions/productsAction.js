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
} from "./types"
import axios from "axios"

export const addReview = (id, rating, comment) => async (dispatch) => {
   try {
      dispatch({
         type: REVIEW_ADD_REQUEST,
      })
      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      }

      const token = localStorage.getItem("token")
      if (token) {
         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      } else {
         delete axios.defaults.headers.common["Authorization"]
      }
      const body = JSON.stringify({
         rating,
         comment,
      })

      const res = await axios.post(`/api/products/${id}/reviews`, body, config)
      dispatch({
         type: REVIEW_ADD_SUCCESS,
         payload: res.data.message,
      })
   } catch (e) {
      dispatch({
         type: REVIEW_ADD_FAILED,
         payload:
            e.message && e.response.data.message
               ? e.response.data.message
               : "Could not add your review",
      })
   }
}

export const listProducts = (keyword = "", category = "") => async (
   dispatch
) => {
   try {
      dispatch({
         type: PRODUCT_LIST_REQUEST,
      })

      const {
         data: { data },
      } = await axios.get(
         `/api/products?keyword=${keyword}&category=${category}`
      )
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
         payload: "Error",
         // payload:
         //    e.message && e.response.data.message
         //       ? e.response.data.message
         //       : "Server didnt response",
      })
   }
}
