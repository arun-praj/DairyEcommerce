import React from "react"
import styled from "styled-components/macro"

const Content = styled.main`
   max-width: 1200px;
   margin: auto;
   /* min-height: 42vh; */
   /* min-height: 500px; */
   font-size: 1.6rem;

   @media screen and (max-width: 1200px) {
      padding: 0 24px;
   }
`

const PageLayout = (props) => {
   return (
      <>
         <Content {...props}>{props.children}</Content>;
      </>
   )
}

const FormContainer = styled.div`
   max-width: 360px;
   min-width: 220px;
   min-height: 50vh;
   margin: 2% auto;
   /* height: 100vh; */
`

export { PageLayout, FormContainer }
