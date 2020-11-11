import React, { useEffect } from "react"
import Categories from "./Categories/Categories"

import { listProducts } from "redux/actions/productsAction"
import { useDispatch, useSelector } from "react-redux"

import { PageLayout } from "components/common"
import { Card, CardContainer, CardImg } from "components/UI"
import Spinner from "components/UI/Spinner/Spinner"
import Rosan from "assets/testimonial/rosan.png"
import Rodip from "assets/testimonial/rodip.png"
import Rating from "react-rating"
import Rabin from "assets/testimonial/rabin.png"
import "./Header.scss"

const Home = ({ match }) => {
   const dispatch = useDispatch()

   const searchedKeyword = match.params.keyword
   const productLists = useSelector((state) => state.productList)
   const { loading, error, products } = productLists
   useEffect(() => {
      dispatch(listProducts(searchedKeyword))
   }, [dispatch, searchedKeyword])

   return (
      <>
         <div
            className='carousel'
            style={{ maxWidth: "1200px", margin: "auto auto 40px auto" }}
         >
            <div className='board board-1'>
               <h1 className='heading__primary--main'>
                  We serve you best dairy in town.
               </h1>
               <h3 className='heading__secondary--sub u-margin-top-small'>
                  "Take a taste. Come join us. Life is so endlessly delicious.”
               </h3>
            </div>
         </div>
         <PageLayout>
            <Categories />
            <div
               style={{
                  marginTop: "40px",
               }}
            >
               <h1
                  className='heading_main'
                  style={{
                     marginBottom: "20px",
                  }}
               >
                  Top products
               </h1>
               <CardContainer>
                  {loading ? (
                     // <><>
                     <Spinner position='center' />
                  ) : error ? (
                     <h1>{error}</h1>
                  ) : (
                     products &&
                     products.map((product) => {
                        return (
                           <Card
                              key={product._id}
                              to={`product/${product._id}`}
                           >
                              <CardImg src='https://images.unsplash.com/photo-1604928905840-36362b12e922?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80' />
                              <div className='card__detail'>
                                 <div
                                    style={{
                                       fontWeight: "700",
                                    }}
                                 >
                                    {product.name}
                                 </div>
                                 <div>
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
                                 </div>
                                 <div
                                    className='card__description'
                                    style={{
                                       fontSize: "13px",
                                       opacity: "0.8",
                                       color: "black",
                                       textAlign: "justify",
                                    }}
                                 >
                                    {product.description.substring(0, 70)} ...
                                 </div>
                                 <div
                                    className='card__price'
                                    style={{
                                       fontSize: "13px",
                                       opacity: "0.8",
                                       fontWeight: "700",
                                       fontSize: "16px",
                                       color: "#007791",
                                    }}
                                 >
                                    Rs.{product.price}
                                 </div>
                              </div>
                              {/* <img
                                 src='https://images.unsplash.com/photo-1604928905840-36362b12e922?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80'
                                 alt=''
                              />
                           </CardImg> */}
                           </Card>
                        )
                     })
                  )}
               </CardContainer>
               <section class='section-testimonial'>
                  <div class='testimonials'>
                     <h1 class='heading__primary--sub'>
                        WHAT OUR CUSTOMERS SAY
                     </h1>
                     <div class='test-body'>
                        <div class='item'>
                           <img src={Rosan} />
                           <div class='name'>ROSAN DUMARU</div>
                           <small class='desig'>CRANE OWNER</small>

                           <p
                              class='u-margin-top-small'
                              style={{ textAlign: "center" }}
                           >
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Mollitia omnis earum quae cupiditate fuga
                              sequi.
                           </p>
                        </div>
                        <div class='item'>
                           <img src={Rabin} />
                           <div class='name'>RABIN PHAIJU</div>
                           <small class='desig'>STUDENT</small>

                           <p
                              class='u-margin-top-small'
                              style={{ textAlign: "center" }}
                           >
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit. Praesentium nisi ipsam laborum
                              laudantium sint mollitia.
                           </p>
                        </div>
                        <div class='item'>
                           <img src={Rodip} />
                           <div class='name'>RODIP DUWAL </div>
                           <small class='desig'>MECHANICS</small>

                           <p
                              class='u-margin-top-small'
                              style={{ textAlign: "center" }}
                           >
                              Lorem ipsum, dolor sit amet consectetur
                              adipisicing elit. Perferendis eos voluptates,
                              nulla dolor facilis saepe.
                           </p>
                        </div>
                     </div>
                  </div>
               </section>
            </div>
         </PageLayout>
      </>
   )
}

export default Home
