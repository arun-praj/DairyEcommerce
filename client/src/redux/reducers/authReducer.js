import {
   USER_LOGIN_FAILED,
   USER_LOGIN_REQUEST,
   USER_LOGIN_SUCCESS,
   USER_REGISTER_FAILED,
   USER_REGISTER_REQUEST,
   USER_REGISTER_SUCCESS,
   LOAD_USER_FROM_TOKEN_SUCCESS,
   LOAD_USER_FROM_TOKEN_FAILED,
   USER_UPDATE_REQUEST,
   USER_UPDATE_FAILED,
   USER_UPDATE_SUCCESS,
   USER_LOGOUT,
   DELETE_USER_FAILED,
   DELETE_USER_SUCCESS,
} from "../actions/types"

const authState = {
   userInfo: null,
   loading: true,
   error: null,
   isAuth: false,
}

const authReducer = (state = authState, action) => {
   const { payload, type } = action
   switch (type) {
      case USER_LOGIN_REQUEST:
      case USER_REGISTER_REQUEST:
      case USER_UPDATE_REQUEST:
         return {
            ...state,
            loading: true,
            isAuth: false,
         }
      case USER_LOGIN_SUCCESS:
      case USER_REGISTER_SUCCESS:
         localStorage.setItem("token", payload.token)
         return {
            ...state,
            loading: false,
            userInfo: payload.user,
            error: null,
            isAuth: true,
         }
      case LOAD_USER_FROM_TOKEN_SUCCESS:
         return {
            ...state,
            loading: false,
            userInfo: payload,
            error: null,
            isAuth: true,
         }
      case USER_LOGIN_FAILED:
      case USER_REGISTER_FAILED:
      case DELETE_USER_SUCCESS:
         localStorage.removeItem("token")
         return {
            ...state,
            loading: false,
            userInfo: null,
            error: payload,
            isAuth: false,
         }
      case LOAD_USER_FROM_TOKEN_FAILED:
         localStorage.removeItem("token")
         return {
            ...state,
            loading: false,
            userInfo: null,
            error: null,
            message: payload,
            isAuth: false,
         }
      case USER_UPDATE_SUCCESS:
         return {
            ...state,
            isAuth: true,
            loading: false,
            userInfo: payload.user,
         }
      case USER_UPDATE_FAILED:
      case DELETE_USER_FAILED:
         return {
            ...state,
            loading: false,
            error: payload,
         }
      case USER_LOGOUT:
         localStorage.removeItem("token")
         return {
            ...state,
            loading: false,
            userInfo: null,
            error: null,
            message: null,
            isAuth: false,
         }
      default:
         return state
   }
}

export { authReducer }
