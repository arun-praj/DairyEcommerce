import React, { useEffect } from "react"
import Categories from "./Categories/Categories"

import { listProducts } from "redux/actions/productsAction"
import { useDispatch, useSelector } from "react-redux"

import { PageLayout } from "components/common"
import { Card, CardContainer } from "components/UI"
import Spinner from "components/UI/Spinner/Spinner"
import Rosan from "assets/testimonial/rosan.png"
import Rodip from "assets/testimonial/rodip.png"
import Footer from "components/layout/Footer/FooterAccordion"

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
                  Recently added
               </h1>
               <CardContainer>
                  {loading ? (
                     // <><>
                     <Spinner position='center' />
                  ) : error ? (
                     <h1>{error}</h1>
                  ) : (
                     products &&
                     products.map((p) => {
                        return (
                           <Card key={p._id} to={`product/${p._id}`}>
                              {p.name}
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
               <Footer />
            </div>
         </PageLayout>
      </>
   )
}

export default Home
