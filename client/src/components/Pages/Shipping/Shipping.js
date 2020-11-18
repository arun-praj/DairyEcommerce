import React, { useEffect, useState } from "react"

import { PageHeader } from "components/common/PageHeader"
import { PageLayout } from "components/common"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Button } from "components/UI/Button"

import { address } from "data/address"
import { createOrder } from "redux/actions/orderAction"
import { usePromiseTracker } from "react-promise-tracker"
// import DayPicker from "react-day-picker"
import DayPickerInput from "react-day-picker/DayPickerInput"
// import Esewa from "./Esewa"
import "react-day-picker/lib/style.css"
import dayPickerStyles from "./Daypicker.module.scss"
import "./Shipping.scss"
// import DatePicker from "react-datepicker"
// import "react-datepicker/dist/react-datepicker.css"
import Spinner from "components/UI/Spinner/Spinner"

const Shipping = ({ history }) => {
   const dispatch = useDispatch()
   const { promiseInProgress } = usePromiseTracker()
   const [deliveryDate, setDeliveryDate] = useState(new Date())
   const [region, setRegion] = useState("Bagmati")
   const [city, setCity] = useState("bhaktapur")
   const [area, setArea] = useState("")
   const [listOfArea, setListOfArea] = useState("")
   const [error, setError] = useState("")
   const [paymentRadio, setPaymentRadio] = useState("")
   const [deliveryCost, setDeliveryCost] = useState(0)
   const { cart } = useSelector((state) => state.cart)
   const { isAuth, loading } = useSelector((state) => state.userDetail)
   const { error: orderError } = useSelector((state) => {
      return state.orders
   })

   const addDecimal = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
   }

   useEffect(() => {
      const a = address
         .find((add) => {
            return add.region === region
         })
         .cities.find((ct) => {
            return ct.name === city
         })
      if (a) {
         setListOfArea(a.areas)
         const foundArea = a.areas.find((loc) => {
            return loc.area === area
         })
         if (foundArea) {
            setDeliveryCost(foundArea.deliveryPrice)
         }
      }
   }, [city, area])
   useEffect(() => {
      if (!isAuth && !loading) {
         history.push("/cart")
      }
   }, [])

   const originalPrice = cart.reduce((acc, item) => {
      return acc + item.price * item.qty
   }, 0)
   const couponPrice = originalPrice > 1999 ? 100 : 0

   const deliveryPrice = originalPrice > 1999 ? 0 : deliveryCost

   const onSubmit = () => {
      if (deliveryDate)
         if (area.length < 1 || city.length < 1 || region.length < 1) {
            setError("Please fill out Address form")
         } else {
            setError("")

            dispatch(
               createOrder(
                  cart,
                  region,
                  city,
                  area,
                  paymentRadio,
                  originalPrice,
                  deliveryDate
               )
            )
            dispatch({
               type: "CART_RESET",
            })

            history.push(`order/complete`)
         }
   }
   return (
      <div>
         <PageHeader>
            <PageLayout style={{ height: "100%" }}>
               <div>Checkout</div>
            </PageLayout>
         </PageHeader>
         <PageLayout>
            <div
               style={{
                  margin: "16px 0",

                  backgroundColor: error ? "#f8d7da" : "white",
                  borderColor: "#f5c6cb",
                  padding: "12px 20px",

                  color: error ? "#333333bb" : "white",
               }}
            >
               {error}
            </div>
            <div className='container'>
               <div className='container_left'>
                  <h4
                     style={{
                        fontSize: "24px",
                        fontWeight: "500",
                        padding: "0 0 8px",
                     }}
                  >
                     Billing Address
                  </h4>
                  <div className='form_container'>
                     <div className='select_container'>
                        <select
                           name=''
                           id='region'
                           className='select_form'
                           onChange={(e) => {
                              setRegion(e.target.value)
                           }}
                        >
                           <option value='' selected disabled>
                              Regions
                           </option>
                           {address.map((add) => {
                              return (
                                 <option value={add.region}>
                                    {add.region}
                                 </option>
                              )
                           })}
                        </select>
                        <label htmlFor='region' className='select_label'>
                           Region
                        </label>
                     </div>

                     <div className='select_container'>
                        <select
                           name=''
                           id='city'
                           className='select_form'
                           onChange={(e) => {
                              setCity(e.target.value)
                           }}
                        >
                           <option value='' disabled selected>
                              City
                           </option>
                           {region &&
                              city &&
                              address
                                 .find((add) => {
                                    return add.region === region
                                 })
                                 .cities.map((city) => {
                                    return (
                                       <option
                                          key={city.name}
                                          value={city.name}
                                       >
                                          {city.name}
                                       </option>
                                    )
                                 })}
                        </select>
                        <label htmlFor='city' className='select_label'>
                           City
                        </label>
                     </div>
                     <div className='select_container'>
                        <select
                           name=''
                           id='area'
                           className='select_form '
                           onChange={(e) => {
                              setArea(e.target.value)
                           }}
                        >
                           <option value='' disabled selected>
                              Area
                           </option>
                           {listOfArea &&
                              listOfArea.map((a) => {
                                 return (
                                    <option key={a.area} value={a.area}>
                                       {a.area}
                                    </option>
                                 )
                              })}
                        </select>
                        <label htmlFor='area' className='select_label'>
                           Area
                        </label>
                     </div>
                  </div>
                  <div
                     className='container_payment'
                     style={{ marginBottom: "32px" }}
                  >
                     <h4
                        style={{
                           fontSize: "24px",
                           fontWeight: "500",
                           padding: "0 0 8px",
                           marginTop: "16px",
                        }}
                     >
                        Pick a date
                     </h4>
                     <DayPickerInput
                        // inputProps={{ width: "300px" }}
                        classNames={dayPickerStyles}
                        onDayChange={(day) => setDeliveryDate(day)}
                     />

                     {/* <DatePicker
                        style={{ padding: "20px" }}
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                     /> */}
                  </div>

                  {/* FXAvtrCZpaDWnJcficC */}
                  <div className='container_payment'>
                     <h4
                        style={{
                           fontSize: "24px",
                           fontWeight: "500",
                           padding: "0 0 8px",
                           marginTop: "16px",
                           width: "200px",
                        }}
                     >
                        Payment Methods
                     </h4>
                     <li
                        style={{
                           width: "200px",
                           display: "flex",
                           alignItems: "center",
                           padding: "0",
                           margin: "8px 0 16px 0",
                        }}
                     >
                        <input
                           id='r1'
                           type='radio'
                           name='radio'
                           value='Cash on delivery'
                           className='radio'
                           selected
                           style={{
                              margin: 0,
                              padding: 0,
                              width: "25px",
                           }}
                        />
                        <label
                           htmlFor='r1'
                           className='radio_label'
                           onClick={() => setPaymentRadio("Cash on delivery")}
                        >
                           Cash on delivery
                        </label>
                     </li>
                     <li
                        style={{
                           width: "200px",
                           display: "flex",
                           alignItems: "center",
                           padding: "0",
                           margin: "0",
                           // opacity: "0.7",
                        }}
                     >
                        <input
                           id='r2'
                           type='radio'
                           name='radio'
                           className='radio'
                           value='esewa'
                           // disabled
                           style={{
                              margin: 0,
                              padding: 0,
                              width: "25px",
                           }}
                           onClick={() => setPaymentRadio("esewa")}
                        />
                        <label htmlFor='r2' className='radio_label'>
                           Esewa
                        </label>
                     </li>
                  </div>
                  <div>
                     {paymentRadio === "esewa" ? (
                        <div
                           style={{
                              border: "1px solid #dedfe0",
                              borderRadius: "4px",
                              marginBottom: "15px",
                              borderColor: "#dedfe0",
                              background: "#f8f8f9",
                              padding: "20px",
                              fontSize: "15px",
                              marginTop: "16px",
                           }}
                        >
                           In order to complete transaction we will transfer you
                           over esewa servers.
                        </div>
                     ) : null}
                  </div>
                  <div className='container_order-detail'>
                     <h4
                        style={{
                           fontSize: "24px",
                           fontWeight: "500",
                           padding: "0 0 8px",
                           margin: "32px 0 16px 0",
                        }}
                     >
                        Order Details
                     </h4>
                     <div>
                        {cart.map((item) => {
                           return (
                              <div
                                 key={item._id}
                                 style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    marginBottom: "16px",
                                 }}
                              >
                                 <div
                                    style={{
                                       display: "flex",
                                       alignItems: "flex-start",
                                    }}
                                 >
                                    <img
                                       height='32px'
                                       width='32px'
                                       src='data:image/jpeg;base64,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'
                                       alt=' '
                                    />
                                    <span
                                       style={{
                                          marginLeft: "10px",
                                          fontSize: "12px",
                                          fontWeight: "700",
                                       }}
                                    >
                                       {item.name}
                                    </span>
                                 </div>
                                 <div
                                    style={{
                                       fontSize: "13px",
                                    }}
                                 >
                                    Rs, {addDecimal(item.price)} * {item.qty} ={" "}
                                    <span
                                       style={{
                                          fontWeight: "700",
                                       }}
                                    >
                                       Rs, {addDecimal(item.price * item.qty)}
                                    </span>
                                 </div>
                              </div>
                           )
                        })}
                     </div>
                  </div>
                  {/* <button onClick={onSubmit}>Click me</button> */}
               </div>

               <div className='container_right'>
                  <h4
                     style={{
                        fontSize: "24px",
                        fontWeight: "700",
                        padding: "0 0 16px",
                     }}
                  >
                     Summary
                  </h4>
                  <div>
                     <div
                        style={{
                           paddingBottom: "10px",
                           borderBottom: "1px solid #dcdadb",
                        }}
                     >
                        <div
                           style={{
                              display: "flex",
                              justifyContent: "space-between",
                              paddingBottom: "4px",
                           }}
                        >
                           <div>Original price:</div>
                           <div>Rs, {addDecimal(originalPrice)}</div>
                        </div>
                        <div
                           style={{
                              display: "flex",
                              justifyContent: "space-between",
                              paddingBottom: "4px",
                           }}
                        >
                           <div>Coupon discounts:</div>
                           <div>- Rs, {addDecimal(couponPrice)}</div>
                        </div>
                        <div
                           style={{
                              display: "flex",
                              justifyContent: "space-between",
                           }}
                        >
                           <div>Delivery cost:</div>
                           <div>+ Rs, {addDecimal(deliveryPrice)}</div>
                        </div>
                     </div>
                     <div
                        style={{
                           display: "flex",
                           justifyContent: "space-between",
                           paddingTop: "10px",
                           fontWeight: "700",
                        }}
                     >
                        <div>Total:</div>
                        <div
                           style={{
                              fontSize: "18px",
                           }}
                        >
                           Rs.
                           {addDecimal(
                              originalPrice -
                                 couponPrice +
                                 Number(deliveryPrice)
                           )}
                        </div>
                     </div>
                     <div
                        style={{
                           padding: "10px 0 24px",
                        }}
                     >
                        <div
                           style={{
                              fontSize: "12px",
                              marginBottom: "10px",
                           }}
                        >
                           By complete your purchase you agree to these&nbsp;
                           <Link
                              to='/terms'
                              style={{
                                 color: "#007791",
                                 fontWeight: "500",
                              }}
                           >
                              Terms and conditions
                           </Link>
                        </div>
                        {orderError && (
                           <div
                              style={{
                                 margin: "16px 0",

                                 backgroundColor: "#f8d7da",
                                 borderColor: "#f5c6cb",
                                 padding: "12px 20px",

                                 color: "#333333bb",
                              }}
                           >
                              {orderError}
                           </div>
                        )}
                        {paymentRadio === "esewa" ? (
                           <form
                              action='https://uat.esewa.com.np/epay/main'
                              method='POST'
                           >
                              <input value='100' name='tAmt' type='hidden' />
                              <input value='90' name='amt' type='hidden' />
                              <input value='5' name='txAmt' type='hidden' />
                              <input value='2' name='psc' type='hidden' />
                              <input value='3' name='pdc' type='hidden' />
                              <input
                                 value='epay_payment'
                                 name='scd'
                                 type='hidden'
                              />
                              <input
                                 value='ee2c3ca1-696b-4cc5-a6be-2c40d929d453'
                                 name='pid'
                                 type='hidden'
                              />
                              <input
                                 value='https://dairyecommerce.herokuapp.com/shipping'
                                 type='hidden'
                                 name='su'
                              />
                              <input
                                 value='https://dairyecommerce.herokuapp.com/shipping'
                                 type='hidden'
                                 name='fu'
                              />
                              <Button
                                 value='Submit'
                                 type='submit'
                                 style={{
                                    background: "transparent",
                                    color: "rgb(15, 124, 144)",
                                    marginTop: " 10px",
                                    border: "1px solid rgb(15, 124, 144)",
                                 }}
                              >
                                 Complete with esewa
                              </Button>
                           </form>
                        ) : (
                           <Button type='primary' onClick={onSubmit}>
                              {promiseInProgress ? (
                                 <Spinner />
                              ) : (
                                 "Complete payment"
                              )}
                           </Button>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </PageLayout>
      </div>
   )
}

export default Shipping
