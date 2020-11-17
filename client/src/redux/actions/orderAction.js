import {
   ORDER_CREATE_FAILED,
   ORDER_CREATE_REQUEST,
   ORDER_CREATE_SUCCESS,
   ORDER_DETAILS_SUCCESS,
   ORDER_DETAILS_REQUEST,
   ORDER_DETAILS_FAILED,
   MY_ORDER_DETAILS_FAILED,
   MY_ORDER_DETAILS_REQUEST,
   MY_ORDER_DETAILS_SUCCESS,
   MODIFY_ORDER_REQUEST,
   MODIFY_ORDER_FAILED,
   MODIFY_ORDER_SUCCESS,
} from "../actions/types"
import axios from "axios"
import { trackPromise } from "react-promise-tracker"

export const modifyOrderStatus = (id, status) => async (dispatch) => {
   try {
      dispatch({
         type: MODIFY_ORDER_REQUEST,
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
         id,
         status,
      })
      const res = await axios.put("api/order", body, config)
      dispatch({
         type: MODIFY_ORDER_SUCCESS,
         payload: res.data.data,
      })
   } catch (e) {
      dispatch({
         type: MODIFY_ORDER_FAILED,
         payload:
            e.message && e.response.data.message
               ? e.response.data.message
               : "Server didnt response",
      })
   }
}
export const createOrder = (
   cart,
   region,
   city,
   area,
   paymentMethod,
   itemsPrice,
   deliveryDate
) => async (dispatch) => {
   try {
      dispatch({
         type: ORDER_CREATE_REQUEST,
      })
      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      }
      const body = JSON.stringify({
         orderItems: cart,
         shippingAddress: {
            region,
            city,
            area,
         },
         paymentMethod,
         itemsPrice,
         dateToDeliver: deliveryDate,
      })
      const token = localStorage.getItem("token")
      if (token) {
         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      } else {
         delete axios.defaults.headers.common["Authorization"]
      }
      trackPromise(
         axios
            .post("/api/order", body, config)
            .then((res) => {
               dispatch({
                  type: ORDER_CREATE_SUCCESS,
                  payload: res.data.data,
               })
            })
            .catch((e) => {
               dispatch({
                  type: ORDER_CREATE_FAILED,
                  payload:
                     e.message && e.response.data.message
                        ? e.response.data.message
                        : "Server didnt respond",
               })
            })
      )
   } catch (e) {
      dispatch({
         type: ORDER_CREATE_FAILED,
         payload:
            e.message && e.response.data.message
               ? e.response.data.message
               : "Server didnt response",
      })
   }
}

export const getOrderDetails = (sort) => async (dispatch) => {
   try {
      dispatch({
         type: ORDER_DETAILS_REQUEST,
      })
      const token = localStorage.getItem("token")
      if (token) {
         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      } else {
         delete axios.defaults.headers.common["Authorization"]
      }
      trackPromise(
         axios
            .get(`/api/order/delivery/${sort}`)
            .then((res) => {
               dispatch({
                  type: ORDER_DETAILS_SUCCESS,
                  payload: res.data.data,
               })
            })
            .catch((e) => {
               dispatch({
                  type: ORDER_DETAILS_FAILED,
                  payload:
                     e.message && e.response.data.message
                        ? e.response.data.message
                        : "Server didnt respond",
               })
            })
      )
   } catch (e) {
      dispatch({
         type: ORDER_DETAILS_FAILED,
         payload:
            e.message && e.response.data.message
               ? e.response.data.message
               : "Server didnt response",
      })
   }
}

export const getMyOrders = () => async (dispatch) => {
   try {
      dispatch({
         type: MY_ORDER_DETAILS_REQUEST,
      })
      const token = localStorage.getItem("token")
      if (token) {
         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      } else {
         delete axios.defaults.headers.common["Authorization"]
      }
      const res = await axios.get("/api/order/my/orders")
      console.log(res)
      dispatch({
         type: MY_ORDER_DETAILS_SUCCESS,
         payload: res.data.data,
      })
   } catch (e) {
      dispatch({
         type: MY_ORDER_DETAILS_FAILED,
         payload:
            e.message && e.response.data.message
               ? e.response.data.message
               : "Server didnt response",
      })
   }
}
