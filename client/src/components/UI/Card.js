import styled from "styled-components";
import { Link } from "react-router-dom";
const CardContainer = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: space-around;
`;

const Card = styled(Link)`
   border: ${(p) => p.theme.cardBorder};
   padding: 5px;
   max-width: 216px;
   height: 290px;
   flex: 0 1 calc(100% / 5 - 20px);

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
      height: 290px - 50px;
      max-width: 400px;
      height: 186px;
      border: none;
      border-top: ${(p) => p.theme.cardBorder};
      //   width: 100%;
   }
`;

export { Card, CardContainer };
