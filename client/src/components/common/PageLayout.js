import React from "react"
import styled from "styled-components/macro"

const Content = styled.main`
   max-width: 1200px;
   margin: auto;

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
   width: 360px;
   margin: 80px auto;
   /* height: 100vh; */
`

export { PageLayout, FormContainer }
