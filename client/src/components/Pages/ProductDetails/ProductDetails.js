import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { createDispatchHook, useDispatch, useSelector } from "react-redux"
import { addToCart } from "../../../redux/actions/cartAction"
import { addReview } from "../../../redux/actions/productsAction"

import { listProductDetails } from "../../../redux/actions/productsAction"

// import { PageLayout } from "components/common/PageLayout"
import { Button } from "components/UI"
import Spinner from "components/UI/Spinner/Spinner"
import Rating from "react-rating"
import ProfilePic from "components/UI/ProfilePic/ProfilePic"
import Badge from "components/UI/Bagde/Badge"
import "./BootcampDetail.scss"

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
   const [rating, setRating] = useState(5)
   const productDetails = useSelector((state) => state.productDetails)
   const { isAuth } = useSelector((state) => state.userDetail)
   const cart = useSelector((state) => state.cart.cart)
   const {
      loading: reviewLoading,
      error: reviewError,
      message: reviewMessage,
   } = useSelector((state) => state.reviewAddStatus)
   const { loading, error, product } = productDetails
   // const { reviews } = product

   const addReviewHandler = (e) => {
      e.preventDefault()
      dispatch(addReview(match.params.id, rating, review))
      dispatch(listProductDetails(match.params.id))
   }
   useEffect(() => {
      dispatch(listProductDetails(match.params.id))
   }, [dispatch, match])

   const addToCartHandler = () => {
      dispatch(addToCart(match.params.id))
      // history.push(`/cart/${match.params.id}`)
   }
   const decorateProductHandler = (id) => {
      history.push(`decorate/${match.params.id}`)
   }

   // if (product) {
   //    console.log(product)
   // }
   return (
      <>
         {loading ? (
            <Spinner />
         ) : (
            <div>
               <section className='bootCamp__detail'>
                  <div className='bootCamp__detail__bar'>
                     <div className=' col-1'>
                        <div className='bootCamp__detail--name'>
                           {product.name}
                           <div className='bootCamp__detail--rating'>
                              <span className='bootCamp__detail--rating--text'>
                                 <Rating
                                    readonly
                                    initialRating={product.rating / 2}
                                    fractions='1'
                                    // placeholderSymbol="✭"
                                    emptySymbol={
                                       <p className='bootCamp__detail--rating--star'>
                                          ☆
                                       </p>
                                    }
                                    fullSymbol={
                                       <p className='bootCamp__detail--rating--star'>
                                          ★
                                       </p>
                                    }
                                 />
                              </span>
                           </div>

                           {/* <span className='bootCamp__detail--badge'>
                                 <Badge type={category} />
                              </span> */}
                        </div>
                        <div className='bootCamp__detail--description'>
                           {product.description}
                        </div>

                        <div className='bootCamp__detail--createdAt'>
                           <div>
                              <svg
                                 width='17'
                                 height='17'
                                 stroke-width='125'
                                 className='bootCamp__detail--icon'
                              >
                                 <use xlinkHref='/icons/tabler-sprite.svg#tabler-forklift' />
                              </svg>
                              <span>
                                 Availabe in stock : {product.countInStock}
                              </span>
                           </div>
                        </div>
                        <div>
                           <div className='sidebar__container'>
                              <div className='btn__container'>
                                 <div
                                    style={{
                                       // color: "#3C3B37",
                                       fontSize: "27px",
                                       fontWeight: "700",
                                       letterSpacing: "0.1px",
                                       textAlign: "left",
                                       padding: "12px 0",
                                    }}
                                 >
                                    Rs.{product.price}
                                 </div>
                                 {cart.filter((item) => {
                                    return item._id === product._id
                                 }).length === 0 ? (
                                    <Button
                                       type='secondary'
                                       onClick={addToCartHandler}
                                       disabled={
                                          product.countInStock <= 5
                                             ? true
                                             : false
                                       }
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
                           </div>
                           {product.decorable && (
                              <div
                              // style={{
                              //    position: "relative",
                              // }}
                              >
                                 <Link
                                    type='primary'
                                    to={`decorate/${match.params.id}`}
                                 >
                                    <Button
                                       type='primary'
                                       style={{
                                          background: "transparent",
                                          color: "#0f7c90",
                                          marginTop: "10px",
                                          border: "1px solid #0f7c90 ",
                                       }}
                                       // onClick={decorateProductHandler}
                                    >
                                       <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          class='icon icon-tabler icon-tabler-wand'
                                          width='24'
                                          height='24'
                                          viewBox='0 0 24 24'
                                          stroke-width='1.5'
                                          stroke='#0f7c90'
                                          fill='none'
                                          stroke-linecap='round'
                                          stroke-linejoin='round'
                                       >
                                          <path
                                             stroke='none'
                                             d='M0 0h24v24H0z'
                                             fill='none'
                                          />
                                          <polyline points='6 21 21 6 18 3 3 18 6 21' />
                                          <line x1='15' y1='6' x2='18' y2='9' />
                                          <path d='M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2' />
                                          <path d='M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2' />
                                       </svg>
                                       &nbsp; &nbsp; Decorate &nbsp; &nbsp;
                                       <Badge style={{ width: "50px" }}>
                                          Free
                                       </Badge>
                                    </Button>
                                    <div></div>
                                 </Link>
                              </div>
                           )}

                           {/* <svg stroke-width="125" className="bootCamp__detail--icon">
                                    <use xlinkHref="/icons/tabler-sprite.svg#tabler-clock" />
                                 </svg> */}
                           {/* <span>{stock} stocks availble</span> */}
                        </div>
                        {/* <div className="bootCamp__detail--createdAt">{moment(createdAt, "YYYYMMDD")}</div> */}
                     </div>

                     <div className='col-2'>
                        <div>
                           <img
                              src='https://myrepublica.nagariknetwork.com/uploads/media/2019/February/feature_jd.jpg'
                              alt='Product image'
                              className='bootCamp__detail--img'
                           />
                        </div>
                     </div>
                  </div>
               </section>
               {reviewLoading ? (
                  <Spinner />
               ) : (
                  <section className='review__container'>
                     <div className='review__wrapper'>
                        {isAuth && (
                           <>
                              <div
                                 style={{
                                    padding: "16px 0",
                                    fontSize: "24px",
                                    fontWeight: "700",
                                 }}
                              >
                                 Write your reviews
                              </div>
                              {reviewError && (
                                 <div
                                    style={{
                                       color: " #333333bb",
                                       fontSize: "16px",
                                       backgroundColor: "#f8d7da",
                                       borderColor: "#f5c6cb",
                                       padding: "12px 20px",
                                       marginBottom: "16px",
                                    }}
                                 >
                                    {reviewError}
                                 </div>
                              )}
                              {reviewMessage && (
                                 <div
                                    style={{
                                       color: " #333333bb",
                                       fontSize: "16px",
                                       backgroundColor: "lightgreen",
                                       borderColor: "#f5c6cb",
                                       padding: "12px 20px",
                                       marginBottom: "16px",
                                    }}
                                 >
                                    {reviewMessage}
                                 </div>
                              )}

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
                                    <option value='5'>Excellent</option>
                                    <option value='4'>Good</option>
                                    <option value='3'>Fair</option>
                                    <option value='2'>Poor</option>
                                    <option value='1'>Bad</option>
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
                                 <button
                                    style={{
                                       // width: "100%",
                                       display: "block",
                                       backgroundColor: "#fff",
                                       padding: "12px 20px",
                                       borderRadius: "3px",
                                       color: "#009688",
                                       border: " 1px solid #009688",
                                       fontSize: "16px",
                                       fontWeight: "700",
                                       marginTop: "10px",
                                    }}
                                    className='sendReview__btn'
                                    onClick={addReviewHandler}
                                 >
                                    Send review
                                 </button>
                              </div>
                           </>
                        )}
                     </div>
                     <div>
                        <div
                           className='review__wrapper'
                           style={{
                              padding: "16px 0",
                              fontSize: "24px",
                              fontWeight: "700",
                           }}
                        >
                           Reviews
                        </div>

                        {!loading &&
                        product.reviews &&
                        product.reviews.length > 0
                           ? product.reviews.map((review) => {
                                let d = new Date(review.createdAt)
                                return (
                                   <div className='review__box review__wrapper'>
                                      <ProfilePic
                                         firstName={review.firstName}
                                         lastName={review.lastName}
                                      />
                                      <div
                                         style={{
                                            marginLeft: "16px",
                                         }}
                                      >
                                         <div
                                            style={{
                                               fontSize: "16px",
                                               fontWeight: "700",
                                            }}
                                         >
                                            {review.firstName} {review.lastName}
                                         </div>
                                         <div>
                                            <Rating
                                               readonly
                                               initialRating={
                                                  product.rating / 2
                                               }
                                               fractions='1'
                                               // placeholderSymbol="✭"
                                               emptySymbol={
                                                  <p className='bootCamp__detail--rating--star'>
                                                     ☆
                                                  </p>
                                               }
                                               fullSymbol={
                                                  <p className='bootCamp__detail--rating--star'>
                                                     ★
                                                  </p>
                                               }
                                            />
                                            <span
                                               style={{
                                                  fontSize: "12px",
                                                  opacity: "0.5",
                                                  marginLeft: "16px",
                                               }}
                                            >
                                               Reviewed on: {d.toUTCString()}
                                            </span>
                                         </div>

                                         <div
                                            style={{
                                               fontSize: "14px",
                                               opacity: "0.9",
                                            }}
                                         >
                                            {review.comment}
                                         </div>
                                      </div>
                                   </div>
                                )
                             })
                           : "No any reviews"}
                     </div>
                  </section>
               )}
            </div>
         )}
      </>
   )
}

export default ProductDetails
