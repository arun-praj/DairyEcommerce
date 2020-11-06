import axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "./types"

export const addToCart = (productId, qty = 1) => async (dispatch, getState) => {
   const { data } = await axios.get(`/api/products/${productId}`)
   data.data.qty = qty
   dispatch({
      type: CART_ADD_ITEM,
      payload: data.data,
   })
   localStorage.setItem("cart", JSON.stringify(getState().cart.cart))
}

export const removeItemFromCart = (id) => async (dispatch, getState) => {
   dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
   })
   localStorage.setItem("cart", JSON.stringify(getState().cart.cart))
}
