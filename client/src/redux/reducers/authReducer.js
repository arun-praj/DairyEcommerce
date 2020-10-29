import {
   USER_LOGIN_FAILED,
   USER_LOGIN_REQUEST,
   USER_LOGIN_SUCCESS,
   LOAD_USER_FROM_TOKEN_SUCCESS,
   LOAD_USER_FROM_TOKEN_FAILED,
   USER_LOGOUT,
} from "../actions/types"

const authState = {
   userInfo: null,
   loading: true,
   error: null,
}

const authReducer = (state = authState, action) => {
   const { payload, type } = action
   switch (type) {
      case USER_LOGIN_REQUEST:
         return {
            ...state,
            loading: true,
         }
      case USER_LOGIN_SUCCESS:
         localStorage.setItem("token", payload.token)
         return {
            ...state,
            loading: false,
            userInfo: payload.user,
            error: null,
         }
      case LOAD_USER_FROM_TOKEN_SUCCESS:
         return {
            ...state,
            loading: false,
            userInfo: payload,
            error: null,
         }
      case USER_LOGIN_FAILED:
         localStorage.removeItem("token")
         return {
            ...state,
            loading: false,
            userInfo: null,
            error: payload,
         }
      case LOAD_USER_FROM_TOKEN_FAILED:
         localStorage.removeItem("token")
         return {
            ...state,
            loading: false,
            userInfo: null,
            error: null,
            message: payload,
         }
      case USER_LOGOUT:
         localStorage.removeItem("token")
         return {
            ...state,
            loading: false,
            userInfo: null,
            error: null,
            message: null,
         }
      default:
         return state
   }
}
export { authReducer }
