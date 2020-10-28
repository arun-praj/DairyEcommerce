import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../../redux/actions/cartAction"
import { listProductDetails } from "../../redux/actions/productsAction"

import { PageLayout } from "components/common/PageLayout"
import { Button } from "components/UI"
import { Spinner } from "components/common/Loader"

const StyledLink = styled.span`
   color: ${(p) => p.theme.linkColorLight};
   font-size: 12px;
   /* padding: 4px 0; */
   font-weight: 700;
   margin: 0 5px;
`

const ProductDetails = ({ match, history }) => {
   const dispatch = useDispatch()
   const productDetails = useSelector((state) => state.productDetails)
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
            <div
               style={{
                  minHeight: "150px",
                  maxWidth: "100vw",
                  // padding: "0 24px",

                  backgroundColor: " rgb(31, 36, 45)",
                  background: "linear-gradient(#29303b, #29303b, #29303b)",
               }}
            >
               <PageLayout style={{ maxWidth: "1000px" }}>
                  {loading ? (
                     <Spinner />
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
                                 marginBottom: "8px",
                                 textTransform: "uppercase",
                                 letterSpacing: "2px",
                              }}
                           >
                              {product.name}
                           </h4>
                           <p
                              style={{
                                 color: "#d1d3dc",
                                 fontSize: "14px",
                                 marginBottom: "8px",
                              }}
                           >
                              {product.description}
                           </p>
                           <h4
                              style={{
                                 fontSize: "22px",
                                 fontWeight: "300",
                              }}
                           >
                              {product.price}.00
                           </h4>
                           <div
                              style={{
                                 padding: "16px 0",
                              }}
                           >
                              <Button onClick={addToCartHandler}>
                                 Add to Cart
                              </Button>
                           </div>
                           <div style={{ fontSize: "14px", color: "#E91E63" }}>
                              {product.countInStock <= 10 ? (
                                 <p>* Limited Stocks available</p>
                              ) : null}
                           </div>
                        </div>
                     </div>
                  )}
               </PageLayout>
            </div>
         )}
      </>
   )
}

export default ProductDetails
