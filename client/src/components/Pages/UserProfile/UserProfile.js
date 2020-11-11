import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import ProfilePic from "components/UI/ProfilePic/ProfilePic"
import { Redirect } from "react-router-dom"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"

//redux
import { updateUserProfile, deleteUser } from "redux/actions/authAction"
import { getMyOrders, modifyOrderStatus } from "redux/actions/orderAction"
import { PageHeader, PageLayout } from "components/common"
import { usePromiseTracker } from "react-promise-tracker"
import Spinner from "components/UI/Spinner/Spinner"
import { Button } from "components/UI/Button"
import Badge from "components/UI/Bagde/Badge"
import "./react-tabs.scss"
import "./UserProfile.scss"
const UserProfile = ({ history }) => {
   const dispatch = useDispatch()
   const { isAuth, userInfo, error, loading } = useSelector(
      (state) => state.userDetail
   )

   useEffect(() => {
      if (!isAuth) {
         return <Redirect to='/login' />
      }
   }, [])
   useEffect(() => {
      dispatch(getMyOrders())
   }, [dispatch])
   // enum: ["Processing", "Packed for delivery", "Cancelled", "Delivered"],

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
                              <Tab>My Orders</Tab>
                              <Tab>User Settings</Tab>
                           </TabList>

                           <TabPanel>
                              <Form />
                           </TabPanel>
                           <TabPanel>{/* <h2>Any content 2</h2> */}</TabPanel>
                           <TabPanel>
                              <OrderList />
                           </TabPanel>
                           <TabPanel>
                              <Setting history={history} />
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
const OrderList = () => {
   const dispatch = useDispatch()
   const { loading: orderLoading, order, error: orderError } = useSelector(
      (state) => state.myOrder
   )
   const {
      loading: cancelLoading,
      error: cancelError,
      modifiedOrder,
   } = useSelector((state) => state.modifyOrderStatus)
   const cancelHandler = (e, id, status) => {
      e.preventDefault()
      dispatch(modifyOrderStatus(id, status))
      // dispatcj(cancelOrder())
   }
   return (
      <>
         {orderLoading ? (
            <Spinner />
         ) : (
            <div
               style={{
                  width: "100%",
                  maxWidth: "756px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
               }}
            >
               {orderError ||
                  (cancelError && (
                     <div
                        style={{
                           color: " #333333bb",
                           backgroundColor: "#f8d7da",
                           borderColor: "#f5c6cb",
                           padding: "12px 20px",
                           maxWidth: "756px",
                           width: "100%",
                           textAlign: "center",
                        }}
                     >
                        {orderError || cancelError}
                     </div>
                  ))}
               {order &&
                  order.map((el) => {
                     let d = new Date(el.createdAt)

                     return (
                        <div
                           key={el._id}
                           style={{
                              // width: "756px",
                              // minWidth: "200px",
                              display: "flex",
                              flexDirection: "column",
                              // flex: "1 1 756px",
                              width: "100%",
                              // flex: "1 1 756px",
                              minHeight: "100px",
                              border: "1px solid #dcdadb",
                              borderRadius: "3px",
                              marginTop: "12px",
                           }}
                        >
                           <div
                              style={{
                                 // height: "50px",
                                 borderBottom: "1px solid #dadada",
                                 padding: "8px 12px",
                                 width: "100%",
                                 display: "flex",
                                 justifyContent: "space-between",
                                 alignItems: "center",
                                 // flexDirection: "column",
                              }}
                           >
                              <div className='order_info'>
                                 <div
                                    style={{
                                       marginRight: "16px",
                                    }}
                                 >
                                    <div style={{ fontSize: "14px" }}>
                                       <strong>Order:</strong>{" "}
                                       <span style={{ color: "#8ed1dc" }}>
                                          #{el._id}
                                       </span>
                                    </div>
                                    <div
                                       style={{
                                          fontSize: "12px",
                                          opacity: "0.7",
                                       }}
                                    >
                                       Placed on: {d.toUTCString()}
                                    </div>
                                 </div>
                                 <div
                                    style={{
                                       marginTop: "8px",
                                       fontSize: "12px",
                                       fontWeight: "700",
                                    }}
                                 >
                                    <Badge>
                                       {modifiedOrder
                                          ? modifiedOrder._id === el._id
                                             ? modifiedOrder.orderStatus
                                             : el.orderStatus
                                          : el.orderStatus}
                                    </Badge>
                                 </div>
                              </div>
                              {el.orderStatus == "Processing" && (
                                 <div
                                    className='cancel_btn'
                                    style={{
                                       color: "red",
                                       fontSize: "12px",
                                    }}
                                    onClick={(e) =>
                                       cancelHandler(e, el._id, "Cancelled")
                                    }
                                 >
                                    cancel
                                 </div>
                              )}
                           </div>
                           <div
                              style={{
                                 // padding: "8px 12px",
                                 margin: " 12px 12px ",
                              }}
                           >
                              {el.orderItems.map((e) => {
                                 return (
                                    <div
                                       key={e._id}
                                       style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                          marginTop: "8px",
                                       }}
                                    >
                                       <div
                                          style={{
                                             display: "flex",
                                             alignItems: "flex-start",
                                          }}
                                       >
                                          <img
                                             height='40'
                                             width='40'
                                             src='data:image/jpeg;base64,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'
                                             alt='dhau'
                                          />
                                          <span style={{ marginLeft: "18px" }}>
                                             {e.name}
                                          </span>
                                       </div>
                                       <div>
                                          <strong>Qty. </strong>
                                          {e.qty}
                                       </div>
                                       <div>200</div>
                                    </div>
                                 )
                              })}
                           </div>
                        </div>
                     )
                  })}
            </div>
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

const Setting = ({ history }) => {
   const dispatch = useDispatch()
   const { promiseInProgress } = usePromiseTracker()
   const { userInfo } = useSelector((state) => state.userDetail)
   const onDeleteHandler = () => {
      const comf = window.confirm(
         "Are you sure? You cant recover your account after you delete"
      )

      if (comf) {
         dispatch(deleteUser(userInfo._id))
         history.push("/")
      } else {
      }
   }
   return (
      <div
         style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            padding: "0px",
         }}
      >
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
                  onClick={onDeleteHandler}
               >
                  {promiseInProgress ? <Spinner /> : "Delete your account"}
               </button>
            </div>
         </div>
      </div>
   )
}

export default UserProfile
