import React from "react"
import { useDispatch, useSelector } from "react-redux"

import { Button } from "components/UI/Button"
import { ReactComponent as Logo } from "assets/checkoutSuccess.svg"
import Spinner from "components/UI/Spinner/Spinner"
import "./OrderSuccess.scss"
import { Link, Redirect } from "react-router-dom"
const Order = ({ history }) => {
   const { error: orderError, success, order, loading } = useSelector(
      (state) => {
         return state.orders
      }
   )

   return (
      <div className='checkout'>
         {loading ? (
            <Spinner />
         ) : order ? (
            orderError ? (
               <div className='checkout__heading'>
                  Order completed successfully
               </div>
            ) : (
               <>
                  <div className='checkout__heading'>
                     Order completed successfully
                  </div>
                  <div className=''>
                     <Logo className='checkout__logo' />
                  </div>
                  <div className='checkout__group'>
                     <div className='checkout__heading-sub'>
                        Thank you for shopping with us
                     </div>
                     <div
                        style={{
                           fontSize: "13px",
                           marginTop: "16px",
                        }}
                     >
                        <strong>Your order id: </strong>#{order._id}
                     </div>
                     <Link to='/profile?tab=orders'>
                        <Button type='primary'>My orders</Button>
                     </Link>
                  </div>
               </>
            )
         ) : (
            <Redirect to='/' />
         )}
      </div>
   )
}

export default Order
