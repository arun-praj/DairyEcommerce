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
} from "../actions/types"
import axios from "axios"
import { trackPromise } from "react-promise-tracker"

const login = ({ email, password }) => async (dispatch) => {
   dispatch({
      type: USER_LOGIN_REQUEST,
   })
   const config = {
      headers: {
         "Content-Type": "application/json",
      },
   }
   const body = JSON.stringify({ email, password })

   trackPromise(
      axios
         .post("/api/auth/login", body, config)
         .then((res) => {
            dispatch({
               type: USER_LOGIN_SUCCESS,
               payload: res.data.data,
            })
         })
         .catch((e) => {
            dispatch({
               type: USER_LOGIN_FAILED,
               payload:
                  e.message && e.response.data.message
                     ? e.response.data.message
                     : "Server didnt respond",
            })
         })
   )
}

const register = (formData, subscribe) => async (dispatch) => {
   dispatch({
      type: USER_REGISTER_REQUEST,
   })
   const config = {
      headers: {
         "Content-Type": "application/json",
      },
   }
   const firstName =
      formData.fullName.split(" ")[0].charAt(0).toUpperCase() +
      formData.fullName.split(" ")[0].slice(1)
   const lastName =
      formData.fullName.split(" ")[1].charAt(0).toUpperCase() +
      formData.fullName.split(" ")[1].slice(1)

   const body = JSON.stringify({
      email: formData.email,
      password: formData.password,
      firstName,
      contact: formData.contactNumber,
      lastName,
      subscribeToNews: subscribe,
   })

   trackPromise(
      axios
         .post("/api/auth/register", body, config)
         .then((res) => {
            dispatch({
               type: USER_REGISTER_SUCCESS,
               payload: res.data.data,
            })
         })
         .catch((e) => {
            dispatch({
               type: USER_REGISTER_FAILED,
               payload:
                  e.message && e.response.data.message
                     ? e.response.data.message
                     : "Server didnt respond",
            })
         })
   )
}

const updateUserProfile = (formData) => async (dispatch) => {
   dispatch({
      type: USER_UPDATE_REQUEST,
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
   const body = JSON.stringify(formData)

   // return
   trackPromise(
      axios
         .put("/api/auth/profile", body, config)
         .then((res) => {
            dispatch({
               type: USER_UPDATE_SUCCESS,
               payload: res.data.data,
            })
         })
         .catch((e) => {
            dispatch({
               type: USER_UPDATE_FAILED,
               payload:
                  e.message && e.response.data.message
                     ? e.response.data.message
                     : "Server didnt respond",
            })
         })
   )
}

const loadUser = () => async (dispatch) => {
   const token = localStorage.getItem("token")
   if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
   } else {
      delete axios.defaults.headers.common["Authorization"]
   }

   try {
      const res = await axios.get("/api/auth/me")
      console.log(res)
      dispatch({
         type: LOAD_USER_FROM_TOKEN_SUCCESS,
         payload: res.data.data,
      })
   } catch (e) {
      dispatch({
         type: LOAD_USER_FROM_TOKEN_FAILED,

         payload:
            e.message && e.response.data.message
               ? e.response.data.message
               : "Something went wrong",
      })
   }
}

const logout = () => async (dispatch) => {
   dispatch({ type: USER_LOGOUT })
}

export { login, loadUser, logout, register, updateUserProfile }
