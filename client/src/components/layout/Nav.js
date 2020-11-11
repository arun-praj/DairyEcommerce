import React, { useState } from "react"
import styled from "styled-components/macro"
import { Link as ReactRouterLink, Route, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "redux/actions/authAction"

import { Button } from "components/UI/Button"
import { DropLink, Dropdown, Dropgroup } from "components/UI/Dropdown/Dropdown"
import ProfilePic from "components/UI/ProfilePic/ProfilePic"
import Searchbox from "components/layout/Searchbox"
import Logo from "assets/logo.svg"

const Navigation = styled.nav`
   border-bottom: 1px solid #dcdadb;
   width: 100%;
`

const NavWrapper = styled.nav`
   height: 65px;
   font-size: 17px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   max-width: 1200px;
   margin: auto;
   @media (max-width: 1200px) {
      padding: 0 24px;
   }
`

const Menu = styled.menu`
   display: flex;
   gap: 5px;
   align-items: center;
   /* margin: auto 0px auto auto; */
   @media (max-width: 768px) {
      display: none;
   }
`

const HamburgerMenu = styled.menu`
   display: none;
   /* margin: auto 0px auto auto; */
   @media (max-width: 768px) {
      display: flex;
   }
   &:hover {
      cursor: pointer;
   }
`

const NavButton = styled.button``

const Link = ({ children, ...props }) => {
   return <ReactRouterLink {...props}>{children}</ReactRouterLink>
}
const LinkedButton = styled(Link)`
   border-radius: 3px;
   width: 100%;
   display: block;
   padding: 10px 15px;
   margin: 0px 2px;
   border: 1px solid transparent;
   text-decoration: none;
   font-size: 14px;
   color: ${(p) => p.theme.fontColorDark};
   text-align: center;
   display: flex;
   align-items: center;
   &:hover {
      background: rgba(20, 23, 28, 0.05);
      border: 1px solid rgba(20, 23, 28, 0.11);
      border-radius: 3px;
   }
   background-color: ${(p) => (p.type === "primary" ? "#d44949" : "white")};
`
const StyledLink = styled(Link)`
   padding: 10px 5px;
   text-decoration: none;

   font-weight: ${(p) => (p.isActive ? "700" : "400")};
`

const DividerLine = styled.div`
   height: 44px;
   border-right: 1px solid #dedfe0;
   margin: 0 8px;
`
const Nav = ({ clickHandler, history }) => {
   const dispatch = useDispatch()
   const { userInfo, loading } = useSelector((state) => state.userDetail)
   const { pathname } = useLocation()
   const { showSearchBar } = useState(false)
   const logoutHandler = () => {
      dispatch(logout())
   }
   return (
      <Navigation>
         <NavWrapper>
            <HamburgerMenu
               onClick={(e) => {
                  e.preventDefault()
                  clickHandler()
               }}
            >
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
                  stroke-linejoin='round'
               >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <line x1='4' y1='6' x2='20' y2='6' />
                  <line x1='4' y1='12' x2='20' y2='12' />
                  <line x1='4' y1='18' x2='20' y2='18' />
               </svg>
            </HamburgerMenu>

            <StyledLink to='/' isActive={pathname === "/"}>
               <img src={Logo} alt='logo' height='30px' />
            </StyledLink>

            <Route render={({ history }) => <Searchbox history={history} />} />

            <Menu>
               <LinkedButton to='/'>Home</LinkedButton>
               <LinkedButton to='/categories'>Products</LinkedButton>
               <DividerLine />

               <StyledLink
                  to='/cart'
                  style={{
                     padding: " 15px 16px 10px 6px",
                  }}
                  isActive={pathname === "/cart"}
               >
                  {/* <Shop /> */}
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     className='icon icon-tabler icon-tabler-shopping-cart'
                     width='24'
                     height='24'
                     viewBox='0 0 24 24'
                     strokeWidth='1.5'
                     stroke='#2c3e50'
                     fill='none'
                     stroke-linecap='round'
                     stroke-linejoin='round'
                  >
                     <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                     <circle cx='9' cy='19' r='2' />
                     <circle cx='17' cy='19' r='2' />
                     <path d='M3 3h2l2 12a3 3 0 0 0 3 2h7a3 3 0 0 0 3 -2l1 -7h-15.2' />
                  </svg>
               </StyledLink>

               {loading ? (
                  <h1>Loading</h1>
               ) : userInfo ? (
                  <Dropdown
                     to='/profile'
                     button={
                        <>
                           <ProfilePic
                              firstName={userInfo.firstName}
                              lastName={userInfo.lastName}
                           />
                           {/* <span>{userInfo.firstName}</span> */}
                        </>
                     }
                  >
                     <Dropgroup>
                        <Link className='dropdown__link' to='/profile'>
                           <div style={{ display: "flex" }}>
                              <div
                                 style={{
                                    marginRight: "14px",
                                 }}
                              >
                                 <ProfilePic
                                    firstName={userInfo.firstName}
                                    lastName={userInfo.lastName}
                                 />
                              </div>
                              <div
                                 style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                 }}
                              >
                                 <span
                                    style={{
                                       fontSize: "16px",
                                       fontWeight: "700",
                                    }}
                                 >
                                    {`${userInfo.firstName} ${userInfo.lastName}`}
                                 </span>
                                 <span
                                    style={{
                                       fontSize: "12px",
                                       fontWeight: "500",
                                       color: "#73726c",
                                    }}
                                 >
                                    {userInfo.email}
                                 </span>
                              </div>
                           </div>
                        </Link>
                     </Dropgroup>
                     <Dropgroup>
                        <DropLink value='My profile' to='/profile' />
                        <DropLink
                           value='Purchase History'
                           to='/purchase-history'
                        />
                     </Dropgroup>
                     {userInfo.role === "admin" && (
                        <Dropgroup>
                           <DropLink value='Admin panel' to='/admin' />
                        </Dropgroup>
                     )}

                     <Dropgroup>
                        <DropLink value='My cart' to='/cart' />
                     </Dropgroup>

                     <Dropgroup>
                        <DropLink
                           onClick={logoutHandler}
                           value=' Log out'
                           to='/'
                        />
                     </Dropgroup>
                  </Dropdown>
               ) : (
                  // <div>{userInfo.firstName}</div>
                  <>
                     <Link
                        style={{
                           textDecoration: "none",
                           color: "white",
                        }}
                        to='/login'
                     >
                        <Button to='/login' type='primary'>
                           Log in
                        </Button>
                     </Link>
                     <Link
                        style={{ textDecoration: "none", color: "#29303b" }}
                        to='/register'
                     >
                        <Button>Sign up</Button>
                     </Link>
                  </>
               )}
            </Menu>
         </NavWrapper>
      </Navigation>
   )
}

export default Nav
