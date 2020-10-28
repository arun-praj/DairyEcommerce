import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import rootReducer from "./reducers"
const middleware = [thunk]

const cartFromStorage = localStorage.getItem("cart")
   ? JSON.parse(localStorage.getItem("cart"))
   : []

const initialState = {
   cart: {
      cart: cartFromStorage,
   },
}

const store = createStore(
   rootReducer,
   initialState,
   composeWithDevTools(applyMiddleware(...middleware))
)

export default store
