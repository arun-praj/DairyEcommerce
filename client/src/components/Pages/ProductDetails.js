import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../../redux/actions/cartAction"
import { listProductDetails } from "../../redux/actions/productsAction"

import { PageLayout } from "components/common/PageLayout"
import { Button } from "components/UI"
import Spinner from "components/UI/Spinner/Spinner"

const StyledLink = styled.span`
   color: ${(p) => p.theme.linkColorLight};
   font-size: 14px;
   /* padding: 4px 0; */
   font-weight: 700;
   margin: 0 5px;
`

const ProductDetails = ({ match, history }) => {
   const dispatch = useDispatch()
   const [review, setReview] = useState("")
   const [rating, setRating] = useState(1)
   const productDetails = useSelector((state) => state.productDetails)
   const cart = useSelector((state) => state.cart.cart)
   const { loading, error, product } = productDetails

   useEffect(() => {
      dispatch(listProductDetails(match.params.id))
   }, [dispatch, match])

   const addToCartHandler = () => {
      dispatch(addToCart(match.params.id))
      // history.push(`/cart/${match.params.id}`)
   }

   return (
      <>
         {error ? (
            <h1>{error}</h1>
         ) : (
            <>
               <div
                  style={{
                     minHeight: "150px",

                     backgroundColor: " rgb(31, 36, 45)",
                     background: "linear-gradient(#29303b, #29303b, #29303b)",
                  }}
               >
                  <PageLayout style={{ maxWidth: "1000px" }}>
                     {loading ? (
                        <Spinner position='center' />
                     ) : (
                        <div>
                           <div
                              style={{
                                 padding: " 16px 0px",
                                 overflow: "hidden",
                                 display: "flex",
                                 alignItems: "center",
                              }}
                           >
                              <Link to='/'>
                                 <StyledLink>Home</StyledLink>
                              </Link>
                              <svg
                                 xmlns='http://www.w3.org/2000/svg'
                                 className='icon icon-tabler icon-tabler-chevron-right'
                                 width='12'
                                 height='12'
                                 viewBox='0 0 24 24'
                                 stroke-width='2.5'
                                 stroke='#ffffff'
                                 fill='none'
                                 stroke-linecap='round'
                                 stroke-linejoin='round'
                              >
                                 <path
                                    stroke='none'
                                    d='M0 0h24v24H0z'
                                    fill='none'
                                 />
                                 <polyline points='9 6 15 12 9 18' />
                              </svg>
                              <Link to='/category'>
                                 <StyledLink>Category</StyledLink>
                              </Link>
                              <svg
                                 xmlns='http://www.w3.org/2000/svg'
                                 className='icon icon-tabler icon-tabler-chevron-right'
                                 width='12'
                                 height='12'
                                 viewBox='0 0 24 24'
                                 stroke-width='2.5'
                                 stroke='#ffffff'
                                 fill='none'
                                 stroke-linecap='round'
                                 stroke-linejoin='round'
                              >
                                 <path
                                    stroke='none'
                                    d='M0 0h24v24H0z'
                                    fill='none'
                                 />
                                 <polyline points='9 6 15 12 9 18' />
                              </svg>
                              <Link to={`/product/${product._id}`}>
                                 <StyledLink>{product.name}</StyledLink>
                              </Link>
                           </div>
                           <div>
                              <img
                                 style={{
                                    width: "100px",
                                    minWidth: "100%",
                                    objectFit: "cover",
                                    border: "1px solid #ffffff",
                                    borderRadius: "4px",
                                 }}
                                 src='https://myrepublica.nagariknetwork.com/uploads/media/2019/February/feature_jd.jpg'
                                 alt='Product'
                              />
                           </div>

                           <div
                              style={{
                                 color: "white",
                                 padding: "16px 0",
                              }}
                           >
                              <h4
                                 style={{
                                    marginBottom: "10.5px",
                                    fontWeight: 700,
                                    // textTransform: "uppercase",
                                    // letterSpacing: "2px",
                                 }}
                              >
                                 {product.name}
                              </h4>
                              <p
                                 style={{
                                    color: "#d1d3dc",
                                    fontSize: "14px",
                                    marginBottom: "8px",
                                    textAlign: "justify",
                                 }}
                              >
                                 {product.description}
                              </p>
                              {/* <h4
                              style={{
                                 fontSize: "24px",
                                 fontWeight: "100",
                              }}
                           >
                              Rs.{product.price}.00
                           </h4> */}
                              <div
                                 style={{
                                    padding: "16px 0",
                                 }}
                              >
                                 {cart.filter((item) => {
                                    return item._id === product._id
                                 }).length === 0 ? (
                                    <Button
                                       type='secondary'
                                       onClick={addToCartHandler}
                                    >
                                       Add to Cart
                                    </Button>
                                 ) : (
                                    <Link type='secondary' to='/cart'>
                                       <Button
                                          type='secondary'
                                          onClick={addToCartHandler}
                                       >
                                          Go to Cart
                                       </Button>
                                    </Link>
                                 )}
                              </div>
                              <div
                                 style={{ fontSize: "14px", color: "#E91E63" }}
                              >
                                 {product.countInStock <= 10 ? (
                                    <p>* Limited Stocks available</p>
                                 ) : null}
                              </div>
                           </div>
                        </div>
                     )}
                  </PageLayout>
               </div>
               <div>
                  <PageLayout>
                     <div
                        style={{
                           padding: "16px 0",
                           fontSize: "24px",
                           fontWeight: "700",
                        }}
                     >
                        Reviews
                     </div>
                     <div style={{ position: "relative" }}>
                        <select
                           type='number'
                           value={rating}
                           id='review'
                           className='productdetail__select'
                           style={{
                              paddingTop: "25px",
                           }}
                           onChange={(e) => {
                              setRating(e.target.value)
                           }}
                           placeholder='Enter your review'
                        >
                           <option value='1'>Excellent</option>
                           <option value='2'>Good</option>
                           <option value='3'>Fair</option>
                           <option value='4'>Poor</option>
                           <option value='5'>Bad</option>
                        </select>
                        <label
                           style={{
                              position: "absolute",
                              top: "10px",
                              left: "13px",
                              fontSize: "12px",
                              opacity: "0.7",
                           }}
                           htmlFor='review'
                        >
                           Rating
                        </label>
                     </div>
                     <div style={{ position: "relative" }}>
                        <input
                           type='text'
                           value={review}
                           id='review'
                           style={{
                              paddingTop: "25px",
                           }}
                           onChange={(e) => {
                              setReview(e.target.value)
                           }}
                           placeholder='Enter your review'
                        />
                        <label
                           style={{
                              position: "absolute",
                              top: "10px",
                              left: "13px",
                              fontSize: "12px",
                              opacity: "0.7",
                           }}
                           htmlFor='review'
                        >
                           Comment
                        </label>
                     </div>
                  </PageLayout>
               </div>
            </>
         )}
      </>
   )
}

export default ProductDetails
