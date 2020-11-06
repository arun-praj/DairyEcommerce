import React, { useEffect } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, removeItemFromCart } from "redux/actions/cartAction"
import { PageLayout } from "components/common/PageLayout"
import { useState } from "react"
import { Button } from "components/UI/Button"

const CartHeader = styled.div`
   height: 80px;
   width: 100vw;
   background: #505763;

   div {
      height: 100%;
      color: #fff;
      font-size: 30px;
      font-weight: 500;
      display: flex;
      align-items: center;
   }
`

const CartBody = styled.main`
   padding: 40px 0;
`

const Cart = ({ match, history, location }) => {
   // const [] = useState(1)

   const [qty, setQty] = useState(1)
   const dispatch = useDispatch()
   const { isAuth } = useSelector((state) => state.userDetail)

   const { cart } = useSelector((state) => state.cart)

   // const productId = match.params.id
   // const qty = location.search ? location.search.split("=") : 1

   // useEffect(() => {
   //    if (productId) {
   //       dispatch(addToCart(productId, qty))
   //    }
   // }, [dispatch, productId, qty])

   const cartRemoveHandler = (e, id) => {
      e.preventDefault()
      dispatch(removeItemFromCart(id))
   }
   const checkoutHandler = (e) => {
      e.preventDefault()

      history.push("/login?redirect=shipping")
   }
   return (
      <>
         <CartHeader>
            <PageLayout style={{ height: "100%" }}>
               <div>Shopping Cart</div>
            </PageLayout>
         </CartHeader>
         <PageLayout>
            <CartBody>
               {cart.length < 1 ? (
                  <div>Your cart is empty</div>
               ) : (
                  <div>
                     <div>
                        {cart &&
                           cart.map((item) => {
                              return (
                                 <div>
                                    {item.name}
                                    <span> {item.price}</span>
                                    <span>
                                       <button
                                          onClick={(e) =>
                                             cartRemoveHandler(e, item._id)
                                          }
                                       >
                                          Remove
                                       </button>

                                       <select
                                          value={item.qty}
                                          onChange={(e) =>
                                             dispatch(
                                                addToCart(
                                                   item._id,
                                                   Number(e.target.value)
                                                )
                                             )
                                          }
                                       >
                                          {[
                                             ...Array(item.countInStock).keys(),
                                          ].map((x) => {
                                             return (
                                                <option key={x + 1}>
                                                   {x + 1}
                                                </option>
                                             )
                                          })}
                                       </select>
                                    </span>
                                 </div>
                              )
                           })}
                     </div>
                     <div>
                        <Button onClick={checkoutHandler}>Checkout</Button>
                     </div>
                  </div>
               )}
            </CartBody>
         </PageLayout>
      </>
   )
}

export default Cart
