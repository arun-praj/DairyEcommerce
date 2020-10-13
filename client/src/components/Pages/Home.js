import React, { useEffect } from "react";
//reuxu
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../redux/actions/productsAction";

import { PageLayout, Loader } from "components/common";
import { Card, CardContainer } from "components/UI";

const Home = () => {
   const dispatch = useDispatch();

   const productLists = useSelector((state) => state.productList);
   const { loading, error, products } = productLists;
   useEffect(() => {
      dispatch(listProducts());
   }, [dispatch]);

   return (
      <PageLayout>
         <h1>Is this the real life</h1>
         <h4>Is this just fantasy</h4>
         <CardContainer>
            {loading ? (
               <Loader />
            ) : error ? (
               <h1>{error}</h1>
            ) : (
               products &&
               products.map((p) => {
                  return (
                     <Card key={p._id} to={`/${p._id}`}>
                        {p.name}
                     </Card>
                  );
               })
            )}
         </CardContainer>
      </PageLayout>
   );
};

export default Home;
