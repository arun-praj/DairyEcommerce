import React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "redux/actions/authAction"
import ProfilePic from "components/UI/ProfilePic/ProfilePic"
import { Button } from "components/UI/Button"

import "./SideDrawer.scss"

const AnimatedSideDiv = styled(motion.div)`
   height: 100%;
   width: 300px;
   position: absolute;
   border: 1px solid #dcdadb;
   z-index: 9;
   top: 0;
   left: 0;
   background-color: #ffffff;
`

const SideDrawer = ({ clickHandler, isSideDrawerOpen }) => {
   const dispatch = useDispatch()
   const { userInfo, loading, isAuth } = useSelector((state) => state.userDetail)
   const logoutHandler = () => {
      dispatch(logout())
      clickHandler()
   }
   const authLink = (
      <Link to='/profile' onClick={() => clickHandler()}>
         {loading ? (
            <span>Loading</span>
         ) : isAuth ? (
            <div style={{ display: "flex" }}>
               <div
                  style={{
                     marginRight: "14px",
                  }}
               >
                  <ProfilePic firstName={userInfo.firstName} lastName={userInfo.lastName} />
               </div>
               <div
                  style={{
                     display: "flex",
                     flexDirection: "column",
                     justifyContent: "space-between",
                  }}
               >
                  <span style={{ fontSize: "16px", fontWeight: "700" }}>{`${userInfo.firstName} ${userInfo.lastName}`}</span>
                  <span
                     style={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "#73726c",
                        textAlign: "left",
                     }}
                  >
                     {userInfo.email}
                  </span>
               </div>
            </div>
         ) : null}
      </Link>
   )
   const guestLink = (
      <>
         <Link
            style={{
               textDecoration: "none",
               color: "white",
               width: "100px",
            }}
            to='/login'
         >
            <Button to='/login' type='primary' onClick={() => clickHandler()}>
               Log in
            </Button>
         </Link>
         <Link style={{ textDecoration: "none", color: "#29303b" }} onClick={() => clickHandler()} to='/register'>
            <Button>Sign up</Button>
         </Link>
      </>
   )
   return (
      <AnimatedSideDiv
         //  animate={{ transform: !isSideDrawerOpen ? "translateX(-100%)" : "translateX(0%)" }}
         animate={{ x: isSideDrawerOpen ? "0" : "-100%" }}
         transition={{ type: "tween", stiffness: 100 }}
      >
         <div
            className='sideDrawer__wrapper'
            style={{
               overflowY: isSideDrawerOpen ? "hidden" : "auto",
            }}
         >
            <ul className='sideDrawer__list' style={{ borderBottom: "1px solid #e8e9eb" }} onClick={() => clickHandler()}>
               <li className='sideDrawer__list--item '>
                  <span className='sideDrawer__list--link' style={{ paddingTop: "0", paddingBottom: "0" }}>
                     <svg className='sideDrawer__list--icon'>
                        <use xlinkHref='/icons/tabler-sprite.svg#tabler-chevron-left' />
                     </svg>
                     <span>Close</span>
                  </span>
               </li>
            </ul>
            <div className='sideDrawer__btns'>{loading ? <h1>Loading</h1> : isAuth ? authLink : guestLink}</div>
            <ul className='sideDrawer__list'>
               <li className='sideDrawer__list--item ' onClick={() => clickHandler()}>
                  <Link to='/' className='sideDrawer__list--link'>
                     <svg className='sideDrawer__list--icon'>
                        <use xlinkHref='/icons/tabler-sprite.svg#tabler-home' />
                     </svg>
                     <span>Home</span>
                  </Link>
               </li>
               <li className='sideDrawer__list--item' onClick={() => clickHandler()}>
                  <Link to='/product' className='sideDrawer__list--link'>
                     <svg className='sideDrawer__list--icon'>
                        <use xlinkHref='/icons/tabler-sprite.svg#tabler-bucket' />
                     </svg>
                     <span>Product</span>
                  </Link>
               </li>
               <li className='sideDrawer__list--item' onClick={() => clickHandler()}>
                  <Link to='/' className='sideDrawer__list--link'>
                     <svg className='sideDrawer__list--icon'>
                        <use xlinkHref='/icons/tabler-sprite.svg#tabler-phone-incoming' />
                     </svg>
                     <span>Contact us</span>
                  </Link>
               </li>
            </ul>
            {isAuth && (
               <ul className='sideDrawer__list'>
                  {/* <li className='sideDrawer__list--item '></li> */}
                  <li className='sideDrawer__list--item' onClick={() => clickHandler()}>
                     <Link to='/profile' className='sideDrawer__list--link'>
                        <svg className='sideDrawer__list--icon'>
                           <use xlinkHref='/icons/tabler-sprite.svg#tabler-brand-github' />
                        </svg>
                        <span>My profile</span>
                     </Link>
                  </li>
                  <li className='sideDrawer__list--item' onClick={() => clickHandler()}>
                     <Link to='/profile' className='sideDrawer__list--link'>
                        <svg className='sideDrawer__list--icon'>
                           <use xlinkHref='/icons/tabler-sprite.svg#tabler-history' />
                        </svg>
                        <span>Purchase History</span>
                     </Link>
                  </li>
               </ul>
            )}

            <ul className='sideDrawer__list' onClick={() => clickHandler()}>
               <li className='sideDrawer__list--item'>
                  <Link to='/cart' className='sideDrawer__list--link'>
                     <svg className='sideDrawer__list--icon'>
                        <use xlinkHref='/icons/tabler-sprite.svg#tabler-shopping-cart' />
                     </svg>
                     <span>My Cart</span>
                  </Link>
               </li>
            </ul>
            {isAuth && (
               <ul className='sideDrawer__list' onClick={logoutHandler}>
                  <li className='sideDrawer__list--item'>
                     <Link to='/logout' className='sideDrawer__list--link'>
                        <svg className='sideDrawer__list--icon'>
                           <use xlinkHref='/icons/tabler-sprite.svg#tabler-logout' />
                        </svg>
                        <span>Log out</span>
                     </Link>
                  </li>
               </ul>
            )}
         </div>

         {/* {loading ? (
            <h1>Loading</h1>
         ) : isAuth ? (
            <h1>{userInfo.firstName}</h1>
         ) : (
            <Link to='/login' onClick={clickHandler}>
               Login
            </Link>
         )}

         {userInfo && <button onClick={logoutHandler}>logout</button>} */}
      </AnimatedSideDiv>
      //   <AnimatePresence>
      //      {isSideDrawerOpen && (

      //      )}
      //   </AnimatePresence>
   )
}

export default SideDrawer
