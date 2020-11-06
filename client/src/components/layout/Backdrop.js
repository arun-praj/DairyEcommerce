import React from "react"

const Backdrop = ({ clickHandler, isSideDrawerOpen }) => {
   return (
      <div
         style={{
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: "1",
            height: "100%",
            width: "100vw",
            // backgroundColor: "rgba(255, 255, 255, 0.95)",
            filter: "blur(10px)",
            backgroundColor: "rgba(0,0,0,0.1)",

            display: isSideDrawerOpen ? "block" : "none",
         }}
         onClick={clickHandler}
      ></div>
   )
}

export default Backdrop
