import React from "react";
import styled from "styled-components/macro";

const Content = styled.main`
   max-width: 1200px;
   margin: auto;
   min-height: 500px;
   font-size: 1.6rem;
`;

const PageLayout = (props) => {
   return (
      <>
         <Content>{props.children}</Content>;
      </>
   );
};

const FormContainer = styled.div`
   width: 360px;
   margin: 120px auto;
   /* height: 100vh; */
`;

export { PageLayout, FormContainer };
