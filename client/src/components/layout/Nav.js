import React from "react";
import styled from "styled-components/macro";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";

const Navigation = styled.nav`
   border-bottom: 1px solid #dcdadb;
   width: 100%;
`;

const NavWrapper = styled.nav`
   height: 60px;
   font-size: 17px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   max-width: 1200px;
   margin: auto;
   @media (max-width: 1200px) {
      padding: 0 24px;
   }
`;

const Menu = styled.menu`
   display: flex;
   /* margin: auto 0px auto auto; */
   @media (max-width: 768px) {
      display: none;
   }
`;

const HamburgerMenu = styled.menu`
   display: none;
   /* margin: auto 0px auto auto; */
   @media (max-width: 768px) {
      display: flex;
   }
`;

const Link = ({ children, ...props }) => {
   return <ReactRouterLink {...props}>{children}</ReactRouterLink>;
};

const StyledLink = styled(Link)`
   padding: 10px 5px;
   text-decoration: none;
   font-weight: ${(p) => (p.isActive ? "700" : "400")};
`;

const Nav = ({ clickHandler }) => {
   const { pathname } = useLocation();
   return (
      <Navigation>
         <NavWrapper>
            <HamburgerMenu
               onClick={(e) => {
                  e.preventDefault();
                  clickHandler();
               }}>
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='icon icon-tabler icon-tabler-menu-2'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  stroke-width='1.5'
                  stroke='#000000'
                  fill='none'
                  stroke-linecap='round'
                  stroke-linejoin='round'>
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <line x1='4' y1='6' x2='20' y2='6' />
                  <line x1='4' y1='12' x2='20' y2='12' />
                  <line x1='4' y1='18' x2='20' y2='18' />
               </svg>
            </HamburgerMenu>
            <div>
               <StyledLink to='/' isActive={pathname === "/"}>
                  LOGO
               </StyledLink>
            </div>

            <Menu>
               <StyledLink to='/cart' isActive={pathname === "/cart"}>
                  Cart
               </StyledLink>
               <StyledLink to='/login' isActive={pathname === "/login"}>
                  Login
               </StyledLink>
            </Menu>
         </NavWrapper>
      </Navigation>
   );
};

export default Nav;
