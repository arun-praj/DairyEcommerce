import styled, { css } from "styled-components/macro";

const Button = styled.button`
   width: 100%;
   border-radius: 3px;
   border: ${(p) => p.theme.cardBorder};
   outline: none;
   border: none;

   ${(p) =>
      p.primary
         ? css`
              background-color: ${(p) => p.theme.btnPrimaryColor};
              color: white;
           `
         : css`
              background-color: #0f7c90;
              color: white;
           `}
   background: ${(p) => (p.disabled ? "grey" : "")};
   ${(p) =>
      p.large
         ? css`
              font-size: 2rem;
              padding: 10px 15px;
           `
         : css`
              font-size: 16px;
              padding: 12px 20px;
           `}
   &:hover {
      cursor: pointer;
      filter: brightness(0.9);
   }
   &:disabled {
      cursor: no-drop;
   }
`;

export { Button }; // named export
