import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "redux/actions/types"

const cartState = {
   cart: [],
   loading: true,
   error: null,
}

export const cartReducer = (state = cartState, action) => {
   const { payload, type, qty } = action

   switch (type) {
      case CART_ADD_ITEM:
         const exist = state.cart.find((x) => x._id === payload._id)

         if (exist) {
            return {
               ...state,
               loading: false,
               cart: state.cart.map((x) => (x._id === exist._id ? payload : x)),
            }
         } else {
            return {
               ...state,
               cart: [...state.cart, payload],
               loading: false,
            }
         }

      case CART_REMOVE_ITEM:
         return {
            ...state,
            loading: false,
            cart: state.cart.filter((x) => x._id !== payload),
         }
      case "CART_RESET":
         localStorage.removeItem("cart")
         return {
            ...state,
            cart: [],
         }

      default:
         return state
   }
}
