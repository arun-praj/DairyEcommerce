import React, { useState, useEffect } from "react"
import { createGlobalStyle, ThemeProvider } from "styled-components/macro"
import { useDispatch } from "react-redux"

//redux
import { loadUser } from "redux/actions/authAction"

import Routes from "components/Routes"
import Nav from "components/layout/Nav"
import SideDrawer from "components/layout/SideDrawer"
import Backdrop from "components/layout/Backdrop"

const GlobalStyle = createGlobalStyle`
   :root{
      font-size:62.5%;
   }
   *,*::after,*::before{
      box-sizing:border-box;
      padding : 0px;
      margin:0px;
   }
   body{
      /* font-family: 'Source Sans Pro', sans-serif; */
      /* font-family: -apple-system, BlinkMacSystemFont, sans-serif; */
      font-family: 'Alegreya Sans', sans-serif;
      /* font-family: 'Varela Round', sans-serif; */
      color: #3c3b37;
      line-height: 1.2;
   }
   h4{
      font-size:22px;
      font-weight:500;
   }
   Link,a{
      text-decoration:none;
   }
   Link:hover{
      cursor:pointer;
   }
`

const theme = {
   linkColor: "#007791",
   linkColorLight: "#8ed1dc",
   fontColor: "#505763",
   fontColorDark: "#29303b",
   fontColorLight: "#d1d3dc",
   cardBorder: "solid 1px #dcdacb",
   cardShadow:
      "0 0 1px 1px rgba(20, 23, 28, 0.1), 0 3px 1px 0 rgba(20, 23, 28, 0.1)",
   btnPrimaryColor: "#ec5252",
}

const App = () => {
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(loadUser())
   }, [dispatch])

   const [isSideDrawerOpen, sideDrawerToggler] = useState(false)

   const sideDrawerHandler = () => sideDrawerToggler(!isSideDrawerOpen)

   return (
      <ThemeProvider theme={theme}>
         <GlobalStyle />
         <Nav clickHandler={sideDrawerHandler} />
         <SideDrawer
            clickHandler={sideDrawerHandler}
            isSideDrawerOpen={isSideDrawerOpen}
         />
         <Backdrop
            clickHandler={sideDrawerHandler}
            isSideDrawerOpen={isSideDrawerOpen}
         />
         <Routes />
      </ThemeProvider>
   )
}

export default App
