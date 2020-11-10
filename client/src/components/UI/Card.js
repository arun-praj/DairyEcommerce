import styled from "styled-components"
import { Link } from "react-router-dom"
const CardContainer = styled.div`
   display: flex;
   /* flex-direction: column; */
   flex-wrap: wrap;
   gap: 10px;
   justify-content: space-around;
   color: ${(p) => p.theme.fontColorDark};
   /* margin-top: 10px; */
`

const Card = styled(Link)`
   border: ${(p) => p.theme.cardBorder};
   padding: 5px;
   max-width: 216px;
   height: 290px;
   flex: 0 1 calc(100% / 5 - 20px);
   color: ${(p) => p.theme.fontColorDark};

   @media screen and (max-width: 1200px) {
      flex: 0 1 calc(100% / 4 - 4em);
   }
   @media screen and (max-width: 1024px) {
      flex: 0 1 calc(100% / 3 - 4em);
   }
   @media screen and (max-width: 768px) {
      flex: 0 1 calc(100% / 2 - 4em);
   }
   @media screen and (max-width: 480px) {
      flex: 0 1 100%;
      width: 200px;
      /* height: 290px - 100px; */
      max-width: 400px;
      height: 150px;
      /* margin-top: 10px; */
      display: flex;
      align-items: center;
      border: none;
      border-top: ${(p) => p.theme.cardBorder};
      //   width: 100%;
   }
`
const CardImg = styled.img`
   max-width: 100%;
   object-fit: cover;
   height: auto;

   @media screen and (max-width: 480px) {
      max-width: 150px;
      margin-right: 10px;
   }
`

const CardDetail = styled.img`
   align-self: flex-start;
`

export { Card, CardContainer, CardImg, CardDetail }
