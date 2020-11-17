import axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "./types"

export const addToCart = (
   productId,
   qty = 1,
   decorated = false,
   designSelected = "none",
   designPrice = 0,
   nameInDecoration = ""
) => async (dispatch, getState) => {
   const { data } = await axios.get(`/api/products/${productId}`)
   data.data.qty = qty
   data.data.decorated = decorated
   data.data.designPrice = designPrice
   data.data.designSelected = designSelected
   data.data.nameInDecoration = nameInDecoration

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
