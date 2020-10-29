import React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "redux/actions/authAction"
const AnimatedSideDiv = styled(motion.div)`
   height: 100vh;
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
   const { userInfo, loading } = useSelector((state) => state.userDetail)
   const logoutHandler = () => {
      dispatch(logout())
      clickHandler()
   }
   return (
      <AnimatedSideDiv
         //  animate={{ transform: !isSideDrawerOpen ? "translateX(-100%)" : "translateX(0%)" }}
         animate={{ x: isSideDrawerOpen ? "0" : "-100%" }}
         transition={{ type: "tween", stiffness: 100 }}
      >
         {loading ? (
            <h1>Loading</h1>
         ) : userInfo ? (
            <h1>{userInfo.firstName}</h1>
         ) : (
            <Link to='/login' onClick={clickHandler}>
               Login
            </Link>
         )}

         {userInfo && <button onClick={logoutHandler}>logout</button>}
      </AnimatedSideDiv>
      //   <AnimatePresence>
      //      {isSideDrawerOpen && (

      //      )}
      //   </AnimatePresence>
   )
}

export default SideDrawer
