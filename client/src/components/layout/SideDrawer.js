import React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
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
   return (
      <AnimatedSideDiv
         //  animate={{ transform: !isSideDrawerOpen ? "translateX(-100%)" : "translateX(0%)" }}
         animate={{ x: isSideDrawerOpen ? "0" : "-100%" }}
         transition={{ type: "tween", stiffness: 100 }}
      >
         <Link to='/login' onClick={clickHandler}>
            Login
         </Link>
      </AnimatedSideDiv>
      //   <AnimatePresence>
      //      {isSideDrawerOpen && (

      //      )}
      //   </AnimatePresence>
   )
}

export default SideDrawer
