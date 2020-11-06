import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import ProfilePic from "components/UI/ProfilePic/ProfilePic"
import { Redirect } from "react-router-dom"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"

//redux
import { updateUserProfile } from "redux/actions/authAction"

import { PageHeader, PageLayout } from "components/common"
import { usePromiseTracker } from "react-promise-tracker"
import Spinner from "components/UI/Spinner/Spinner"
import { Button } from "components/UI/Button"
import "./react-tabs.scss"
import "./UserProfile.scss"
const UserProfile = () => {
   const dispatch = useDispatch()
   const { isAuth, userInfo, error, loading } = useSelector(
      (state) => state.userDetail
   )
   useEffect(() => {
      if (!isAuth) {
         return <Redirect to='/' />
      }
   }, [])
   return (
      <>
         {loading ? (
            <Spinner />
         ) : (
            <>
               <PageHeader>
                  <PageLayout style={{ height: "100%" }}>
                     <div
                        style={{
                           fontSize: "24px",
                        }}
                     >
                        User profile /&nbsp;
                        <span
                           style={{
                              color: "#8ed1dc",
                           }}
                        >
                           {userInfo.firstName} {userInfo.lastName}
                        </span>
                     </div>
                  </PageLayout>
               </PageHeader>

               <PageLayout>
                  <div className='grid'>
                     <div className='grid-right'>
                        <Tabs>
                           <TabList>
                              <Tab>Personal info</Tab>
                              <Tab>Address Book</Tab>
                              <Tab>Purchase history</Tab>
                              <Tab>User Settings</Tab>
                           </TabList>

                           <TabPanel>
                              <Form />
                           </TabPanel>
                           <TabPanel>{/* <h2>Any content 2</h2> */}</TabPanel>
                           <TabPanel>{/* <h2>Any content 2</h2> */}</TabPanel>
                           <TabPanel>
                              <Setting />
                           </TabPanel>
                        </Tabs>
                     </div>
                  </div>
               </PageLayout>
            </>
         )}
      </>
   )
}

const Form = () => {
   const { promiseInProgress } = usePromiseTracker()
   const dispatch = useDispatch()
   const { userInfo, error } = useSelector((state) => state.userDetail)
   const { email, contact, firstName, lastName } = userInfo

   const [formData, setFormData] = useState({
      firstName: firstName ? firstName : "",
      lastName: lastName ? lastName : "",
      email,
      contact: contact ? contact : "",
      password: "",
      passwordOld: "",
   })
   const handleFormChange = (e) => {
      // e.preventDefault()
      const { name, value } = e.target
      setFormData((prevState) => ({
         ...prevState,
         [name]: value,
      }))
   }
   const onSave = (e) => {
      e.preventDefault()
      dispatch(updateUserProfile(formData))
   }
   return (
      <div className='form'>
         <form action='' className='form__container'>
            <div className='form__box'>
               <div className='form__group'>
                  {error && (
                     <div
                        style={{
                           color: " #333333bb",
                           backgroundColor: "#f8d7da",
                           borderColor: "#f5c6cb",
                           padding: "12px 20px",
                           maxWidth: "525px",
                        }}
                     >
                        {error}
                     </div>
                  )}
               </div>
               <div className='form__group'>
                  <label htmlFor='name' className='form__group--label'>
                     First Name
                  </label>
                  <input
                     type='text'
                     id='firstname'
                     name='firstName'
                     value={formData.firstName}
                     className='form__group--input'
                     onChange={handleFormChange}
                  />
               </div>
               <div className='form__group'>
                  <label htmlFor='name' className='form__group--label'>
                     Last Name
                  </label>
                  <input
                     type='text'
                     id='lastname'
                     name='lastName'
                     value={formData.lastName}
                     onChange={handleFormChange}
                     className='form__group--input'
                  />
               </div>
            </div>
            <div className='form__box'>
               <div className='form__group'>
                  <label htmlFor='name' className='form__group--label'>
                     Email
                  </label>
                  <input
                     type='text'
                     id='email'
                     name='email'
                     value={formData.email}
                     className='form__group--input'
                     onChange={handleFormChange}
                     disabled
                  />
                  <span className='form__group--text'>
                     * You cannot change your email. If you wish to use another
                     email, signup with that email instead.
                  </span>
               </div>
            </div>
            <div className='form__box'>
               <div className='form__group'>
                  <label htmlFor='name' className='form__group--label'>
                     Contact Numbers
                  </label>
                  <input
                     type='text'
                     onChange={handleFormChange}
                     id='contact'
                     name='contact'
                     value={formData.contact}
                     className='form__group--input'
                  />
                  <span className='form__group--text'>
                     * Use comma to saperate multiple numbers. First number in
                     the list will be used as primary number.
                  </span>
               </div>
            </div>
            <div className='form__box'>
               <div className='form__group'>
                  <label htmlFor='name' className='form__group--label'>
                     New Password
                  </label>
                  <input
                     type='password'
                     id='newPassword'
                     onChange={handleFormChange}
                     name='password'
                     value={formData.password}
                     placeholder='Enter your new password'
                     className='form__group--input'
                  />
                  <span className='form__group--text'>
                     * Password must contain 1 uppercase, minimum 8 charater and
                     1 number.
                  </span>
               </div>
               <div className='form__group'>
                  <label htmlFor='name' className='form__group--label'>
                     Old Password
                  </label>
                  <input
                     type='password'
                     id='oldPassword'
                     name='passwordOld'
                     onChange={handleFormChange}
                     value={formData.passwordOld}
                     placeholder='Enter your old password'
                     className='form__group--input'
                  />
                  <span className='form__group--text'>
                     * Required if you wish to change your password.
                  </span>
               </div>
            </div>
            <div className='form__group form__box'>
               <Button type='primary' onClick={onSave}>
                  {promiseInProgress ? <Spinner /> : "Save Changes"}
               </Button>
            </div>
         </form>
      </div>
   )
}

const Setting = ({ props }) => {
   const { promiseInProgress } = usePromiseTracker()

   return (
      <>
         <div className='form__box'>
            <div
               className='heading--danger'
               style={{ borderBottom: "1px solid #dcdacb" }}
            >
               Unsubscribe
            </div>
            <span className='form__group--text'>
               You will not receive any mails if you unsubscribe.
            </span>
            <div>
               <button
                  className='button--danger button'
                  // onClick={() => props.deleteCustomer()}
               >
                  {promiseInProgress ? <Spinner /> : "Unsubscribe"}
               </button>
            </div>
         </div>
         <div className='form__box'>
            <div
               className='heading--danger'
               style={{ borderBottom: "1px solid #dcdacb" }}
            >
               Delete account
            </div>
            <span className='form__group--text'>
               Once you delete your account, there is no going back. Please be
               certain.
            </span>
            <div>
               <button
                  className='button--danger button'
                  // onClick={() => props.deleteCustomer()}
               >
                  {promiseInProgress ? <Spinner /> : "Delete your account"}
               </button>
            </div>
         </div>
      </>
   )
}

export default UserProfile
