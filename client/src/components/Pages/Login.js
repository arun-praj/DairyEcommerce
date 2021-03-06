import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Link, Redirect } from "react-router-dom"
import { login } from "../../redux//actions/authAction"
import { Button } from "components/UI"
import { PageLayout, Input, FormContainer } from "components/common"
import { usePromiseTracker } from "react-promise-tracker"
import Spinner from "components/UI/Spinner/Spinner"
const Login = ({ location, history }) => {
   const dispatch = useDispatch()
   const { promiseInProgress } = usePromiseTracker()
   const [formData, setFormData] = useState({
      email: "",
      password: "",
   })
   const { error, isAuth } = useSelector((state) => state.userDetail)
   const redirect = location.search ? location.search.split("=")[1] : "/"

   useEffect(() => {
      if (isAuth) {
         history.push(redirect)
         // return <Redirect to='/' />
      }
   }, [isAuth, history])

   const formDataHandler = (e) => {
      e.persist()
      setFormData((prevState) => {
         return {
            ...prevState,
            [e.target.name]: e.target.value,
         }
      })
   }
   const submitHandler = (e) => {
      e.preventDefault()
      dispatch(login(formData))
   }

   return (
      <PageLayout>
         {isAuth && <Redirect to='/' />}
         <FormContainer>
            {error ? (
               <div
                  style={{
                     color: " #333333bb",

                     backgroundColor: "#f8d7da",
                     borderColor: "#f5c6cb",
                     padding: "12px 20px",
                  }}
               >
                  {error}
               </div>
            ) : (
               <div
                  style={{
                     color: " #ffffff",
                     backgroundColor: "#ffffff",
                     borderColor: "#ffffff",
                     padding: "12px 20px",
                  }}
               >
                  sadfas
               </div>
            )}

            <h4 style={{ margin: "15px 0", fontSize: "17px", fontWeight: "600" }}>Log in to your account.</h4>

            <Input
               type='email'
               placeholder='Email'
               name='email'
               value={formData.email}
               icon={
                  <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-at' width='24' height='24' viewBox='0 0 24 24' stroke-width='1.5' stroke='#3b3b3b85' fill='none' stroke-linecap='round' stroke-linejoin='round'>
                     <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                     <circle cx='12' cy='12' r='4' />
                     <path d='M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28' />
                  </svg>
               }
               onChange={formDataHandler}
            />
            <Input
               type='password'
               name='password'
               placeholder='Password'
               value={formData.password}
               icon={
                  <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-lock' width='24' height='24' viewBox='0 0 24 24' strokeWidth='1.5' stroke='#3b3b3b85' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                     <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                     <rect x='5' y='11' width='14' height='10' rx='2' />
                     <circle cx='12' cy='16' r='1' />
                     <path d='M8 11v-4a4 4 0 0 1 8 0v4' />
                  </svg>
               }
               onChange={formDataHandler}
            />
            <Button
               type='primary'
               disabled={promiseInProgress ? true : false}
               onClick={submitHandler}
               style={{
                  marginTop: "25px",
               }}
            >
               {promiseInProgress ? <Spinner /> : "LOG IN"}
            </Button>
            <div>
               Dont have an account ?<Link to='register'>Sign up</Link>
            </div>
         </FormContainer>
      </PageLayout>
   )
}

export default Login
