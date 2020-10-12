import React, { useEffect, useState } from "react";
import axios from "axios";

import { PageLayout } from "components/common";
import { Card, CardContainer } from "components/UI";

const Home = () => {
   const [products, setProducts] = useState(false);

   useEffect(() => {
      const fetchProducts = async () => {
         const {
            data: { data },
         } = await axios.get("/api/products");
         setProducts(data);
      };
      fetchProducts();
   }, []);
   return (
      <PageLayout>
         <CardContainer>
            {products &&
               products.map((p) => {
                  return (
                     <Card key={p._id} to={`/${p._id}`}>
                        {p.name}
                     </Card>
                  );
               })}
         </CardContainer>
      </PageLayout>
   );
};

export default Home;
