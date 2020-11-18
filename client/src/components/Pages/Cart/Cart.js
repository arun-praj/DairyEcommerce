import React, { useEffect } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, removeItemFromCart } from "redux/actions/cartAction"
import { PageLayout } from "components/common/PageLayout"
import { useState } from "react"
import { Button } from "components/UI/Button"
import Rating from "react-rating"
// import Badge from "components/UI/Bagde/Badge"
import "./cart.scss"
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
   min-height: 42vh;
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
   const originalPrice = cart.reduce((acc, item) => {
      return acc + item.price * item.qty
   }, 0)
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
                     <div
                        style={{
                           marginBottom: "10px",
                        }}
                     >
                        {cart.length}{" "}
                        {cart.length > 1 ? " products" : "product"} in cart.
                     </div>
                     <div className=' container'>
                        <div className='container_left cart__list'>
                           {cart &&
                              cart.map((item) => {
                                 return (
                                    <div className='cart__item '>
                                       <div className='cart__item--left'>
                                          <img
                                             height='80'
                                             width='80'
                                             className='cart__img'
                                             src='https://2.bp.blogspot.com/-h1ap6h8Nuy4/T0baO9iUFBI/AAAAAAAAOKI/7uHsudINPdQ/s1600/2008+-+sept-nov+%28Nepal%29+050.jpg'
                                             alt=''
                                          />
                                          <div className='cart__item--details'>
                                             <span>{item.name}</span>
                                             <Rating
                                                start='0'
                                                stop='5'
                                                readonly
                                                initialRating='3'
                                                emptySymbol={
                                                   <p className='icon--star'>
                                                      ☆
                                                   </p>
                                                }
                                                fullSymbol={
                                                   <p className='icon--star'>
                                                      ★
                                                   </p>
                                                }
                                             />
                                             <div
                                                style={{
                                                   fontSize: "12px",
                                                   fontWeight: "300",
                                                   opacity: "0.75",
                                                }}
                                             >
                                                Stocks available:{" "}
                                                {item.countInStock}
                                             </div>
                                             <div
                                                style={{
                                                   marginTop: "8px",
                                                   color: "#007791",
                                                }}
                                             >
                                                Rs.{item.price}
                                                {/* <Badge>{item.category}</Badge> */}
                                             </div>
                                          </div>
                                       </div>
                                       <div className='cart__item--right'>
                                          <div className='qty_select_container'>
                                             <select
                                                value={item.qty}
                                                className='select_form qty_select_form'
                                                id='cart_Qty'
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
                                                   ...Array(
                                                      item.countInStock
                                                   ).keys(),
                                                ].map((x) => {
                                                   return (
                                                      <option key={x + 1}>
                                                         {x + 1}
                                                      </option>
                                                   )
                                                })}
                                             </select>
                                             {/* <label
                                                htmlFor='cart_Qty'
                                                className='select_label'
                                             >
                                                Select qty
                                             </label> */}
                                          </div>
                                          <div
                                             style={{
                                                fontSize: "12px",
                                                fontWeight: "300",
                                                color: "#007791",
                                                marginLeft: "16px",
                                             }}
                                             onClick={(e) =>
                                                cartRemoveHandler(e, item._id)
                                             }
                                          >
                                             remove
                                          </div>
                                       </div>
                                    </div>
                                 )
                              })}
                        </div>
                        <div className='container_right container_right--cart'>
                           <div>Total:</div>
                           <div
                              style={{
                                 fontSize: "36px",
                                 fontWeight: "700",
                              }}
                           >
                              Rs. {originalPrice}
                           </div>
                           <div
                              style={{
                                 marginTop: "10px",
                              }}
                           >
                              <Button type='primary' onClick={checkoutHandler}>
                                 Checkout
                              </Button>
                           </div>
                           <hr
                              style={{
                                 margin: "10px 0",
                                 borderTop: "1px solid #e8e9eb",
                              }}
                           />
                           <div>
                              <strong>COUPAN: TIHAR</strong> is applied
                           </div>
                        </div>
                     </div>
                     {/* <div>
                        {cart &&
                           cart.map((item) => {
                              return (
                                 <div>
                                    {item.name}
                                    <span> {item.price}</span>
                                    <span>
                                       <button
                                         
                                       >
                                          Remove
                                       </button>

                                    
                                    </span>
                                 </div>
                              )
                           })}
                     </div> */}
                  </div>
               )}
            </CartBody>
         </PageLayout>
      </>
   )
}

export default Cart
