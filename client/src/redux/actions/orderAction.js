import { ORDER_CREATE_FAILED, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from "../actions/types"
import axios from "axios"
import { trackPromise } from "react-promise-tracker"

export const createOrder = (cart, region, city, area, paymentMethod, itemsPrice) => async (dispatch) => {
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
      })
      const token = localStorage.getItem("token")
      if (token) {
         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      } else {
         delete axios.defaults.headers.common["Authorization"]
      }
      //   dispatch({
      //      type: ORDER_CREATE_FAILED,
      //      payload: "Fucko off",
      //      //  payload: res.data.data,
      //   })
      //   return
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
                  payload: e.message && e.response.data.message ? e.response.data.message : "Server didnt respond",
               })
            })
      )
   } catch (e) {
      dispatch({
         type: ORDER_CREATE_FAILED,
         payload: e.message && e.response.data.message ? e.response.data.message : "Server didnt response",
      })
   }
}
