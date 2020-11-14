import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { PageLayout } from "components/common/PageLayout"
import { useDispatch, useSelector } from "react-redux"
import { listProducts } from "redux/actions/productsAction"
import { Card, CardContainer, CardImg } from "components/UI"
import Rating from "react-rating"
import "./Category.scss"
import { useLocation } from "react-router-dom"

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
const useQuery = () => {
   return new URLSearchParams(useLocation().search)
}
const Category = () => {
   let query = useQuery()
   console.log(query.get("category"))
   // console.log(query)

   const dispatch = useDispatch()
   // console.log(typeof query)
   const [selectedCategory, setSelectedCategory] = useState(
      query.get("category") ? query.get("category") : " "
   )
   console.log(selectedCategory)
   const productLists = useSelector((state) => state.productList)
   const { loading, error, products } = productLists
   useEffect(() => {
      dispatch(listProducts("", selectedCategory))
   }, [selectedCategory, dispatch])

   const onCategoryChange = (e) => {
      setSelectedCategory(e.target.value)
   }
   return (
      <div>
         <CartHeader>
            <PageLayout style={{ height: "100%" }}>
               <div>Products</div>
            </PageLayout>
         </CartHeader>
         <PageLayout>
            <div className='product__container'>
               <div className='nav__left'>
                  <div
                     style={{ width: "100%", borderTop: "1px solid #dcdadb" }}
                  >
                     <h3
                        style={{
                           padding: "16px 0",
                        }}
                     >
                        Categories
                     </h3>
                     <div
                        className='category__item'
                        style={{
                           display: "flex",
                           alignItems: "center",
                        }}
                     >
                        <input
                           className='category__input'
                           type='radio'
                           checked
                           value=''
                           name='category'
                           id='all'
                           checked={selectedCategory === ""}
                           onChange={onCategoryChange}
                        />
                        <label htmlFor='all' className='category__label'>
                           All
                        </label>
                     </div>
                     <div className='category__item'>
                        <input
                           className='category__input'
                           type='radio'
                           value='curd'
                           name='category'
                           id='Curd'
                           checked={selectedCategory === "curd"}
                           onChange={onCategoryChange}
                        />
                        <label htmlFor='Curd' className='category__label'>
                           Curd
                        </label>
                     </div>
                     <div className='category__item'>
                        <input
                           className='category__input'
                           type='radio'
                           value='cake'
                           id='Cake'
                           name='category'
                           checked={selectedCategory === "cake"}
                           onChange={onCategoryChange}
                        />
                        <label htmlFor='Cake' className='category__label'>
                           Cake
                        </label>
                     </div>
                     <div className='category__item'>
                        <input
                           className='category__input'
                           type='radio'
                           value='cheese'
                           name='category'
                           id='Cheese'
                           checked={selectedCategory === "cheese"}
                           onChange={onCategoryChange}
                        />
                        <label htmlFor='Cheese' className='category__label'>
                           Cheese
                        </label>
                     </div>
                  </div>
               </div>
               <div className='nav__category select_container'>
                  <select
                     className='nav__category--select select_form'
                     onChange={onCategoryChange}
                  >
                     <option value='' selected={selectedCategory === ""}>
                        All
                     </option>
                     <option
                        value='curd'
                        selected={selectedCategory === "curd"}
                     >
                        Curd
                     </option>
                     <option
                        value='cake'
                        selected={selectedCategory === "cake"}
                     >
                        Cake
                     </option>
                     <option
                        value='cheese'
                        selected={selectedCategory === "cheese"}
                     >
                        Cheese
                     </option>
                  </select>
                  <label className='select_label'>Filter category</label>
               </div>
               <div className='main__content'>
                  {loading ? (
                     <div>Loading</div>
                  ) : error ? (
                     <div>{error}</div>
                  ) : (
                     <CardContainer>
                        {products.map((product) => (
                           <Card
                              key={product._id}
                              to={`product/${product._id}`}
                           >
                              <CardImg src={product.image} />
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
                                       // marginTop: "10px",
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
                        ))}
                     </CardContainer>
                  )}
               </div>
            </div>
         </PageLayout>
      </div>
   )
}

export default Category
