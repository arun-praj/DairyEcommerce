import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { usePromiseTracker } from "react-promise-tracker"
import { Link, Redirect } from "react-router-dom"
import PasswordStrengthBar from "react-password-strength-bar"

import { register } from "redux/actions/authAction"
import Spinner from "components/UI/Spinner/Spinner"
import { PageLayout, Input, FormContainer } from "components/common"
import { Button } from "components/UI"

const Signup = () => {
   const dispatch = useDispatch()
   const { promiseInProgress } = usePromiseTracker()
   const [subscribe, handleSubscribe] = useState(false)
   const { error, isAuth } = useSelector((state) => state.userDetail)
   const [formData, setFormData] = useState({
      email: "",
      password: "",
      contactNumber: "",
      fullName: "",
   })
   // useEffect(() => {
   //    const timer = setTimeout(() => {
   //       error = null
   //    }, 5000)
   //    return () => clearTimeout(timer)
   // }, [error])

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

      dispatch(register(formData, subscribe))
   }

   return (
      <div>
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

               <h4
                  style={{
                     margin: "15px 0",
                     fontSize: "17px",
                     fontWeight: "600",
                     padding: "0 0 10px 0",
                     borderBottom: " 1px solid #e8e9eb",
                  }}
               >
                  Sign up and start buying.
               </h4>
               <Input
                  type='fullName'
                  placeholder='Full Name'
                  name='fullName'
                  value={formData.fullName}
                  icon={
                     <svg className='sideDrawer__list--icon'>
                        <use xlinkHref='/icons/tabler-sprite.svg#tabler-user' />
                     </svg>
                  }
                  onChange={formDataHandler}
               />
               <Input
                  type='contactNumber'
                  placeholder='Contact no'
                  name='contactNumber'
                  value={formData.contactNumber}
                  icon={
                     <svg className='sideDrawer__list--icon'>
                        <use xlinkHref='/icons/tabler-sprite.svg#tabler-phone-plus' />
                     </svg>
                  }
                  onChange={formDataHandler}
               />
               <Input
                  type='email'
                  placeholder='Email'
                  name='email'
                  value={formData.email}
                  icon={
                     <svg className='sideDrawer__list--icon'>
                        <use xlinkHref='/icons/tabler-sprite.svg#tabler-mail' />
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
                     <svg className='sideDrawer__list--icon'>
                        <use xlinkHref='/icons/tabler-sprite.svg#tabler-lock' />
                     </svg>
                  }
                  onChange={formDataHandler}
               />
               <PasswordStrengthBar password={formData.password} />
               <div>
                  <div
                     style={{
                        padding: "14px 0 0 0 ",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "14px",
                     }}
                  >
                     <input
                        type='checkbox'
                        value={subscribe}
                        id='squaredCheckbox'
                        name='subscribe'
                        style={{
                           padding: "0",
                           margin: "0",
                           width: "20px",
                        }}
                        onChange={() => handleSubscribe(!subscribe)}
                     />
                     <label
                        for='squaredCheckbox'
                        style={{
                           fontSize: "14px",
                        }}
                     >
                        Yes! I want to receive email with exclusive deals and
                        offers.
                     </label>
                  </div>
               </div>
               <Button
                  type='primary'
                  disabled={promiseInProgress ? true : false}
                  onClick={submitHandler}
                  style={{
                     marginTop: "25px",
                  }}
               >
                  {promiseInProgress ? <Spinner /> : "Sign up"}
               </Button>
               <div
                  style={{
                     fontSize: "12px",
                     textAlign: "center",
                     padding: "15px",
                  }}
               >
                  By signing up you agree to out{" "}
                  <Link
                     to='/terms'
                     style={{
                        color: "#007791",
                     }}
                  >
                     Terms and conditions
                  </Link>
                  .
               </div>
               <div
                  style={{
                     fontSize: "14px",
                     textAlign: "center",
                     padding: "15px 0",
                     borderTop: "1px solid #e8e9eb",
                  }}
               >
                  Already have an account?
                  <Link
                     style={{
                        color: "#007791",
                        fontWeight: 700,
                     }}
                     to='login'
                  >
                     &nbsp; Log in
                  </Link>
               </div>
            </FormContainer>
         </PageLayout>
      </div>
   )
}

export default Signup
