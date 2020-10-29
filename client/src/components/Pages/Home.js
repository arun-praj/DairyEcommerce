import React, { useEffect } from "react"
//reuxu
import { useDispatch, useSelector } from "react-redux"
import { listProducts } from "../../redux/actions/productsAction"

import { PageLayout } from "components/common"
import { Card, CardContainer } from "components/UI"
import Spinner from "components/UI/Spinner/Spinner"

const Home = ({ match }) => {
   const dispatch = useDispatch()
   const searchedKeyword = match.params.keyword
   const productLists = useSelector((state) => state.productList)
   const { loading, error, products } = productLists
   useEffect(() => {
      dispatch(listProducts(searchedKeyword))
   }, [dispatch, searchedKeyword])

   return (
      <PageLayout>
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
      </PageLayout>
   )
}

export default Home
