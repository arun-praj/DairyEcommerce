import React from "react"
import "./Spinner.css"

const Spinner = (props) => {
   let absCenter
   if (props.position === "center") {
      absCenter = {
         position: "absolute",
         top: "40%",
         // width: "100vh",
         // left: "0",
         // right: "0",
         // top: "0",
         // bottom: "0",
         // margin: "auto",
      }
   }
   return (
      <div class='spinner' style={absCenter}>
         <i className='i'></i>
         <i className='i'></i>
         <i className='i'></i>
         <i className='i'></i>
         <i className='i'></i>
         <i className='i'></i>
         <i className='i'></i>
         <i className='i'></i>
         <i className='i'></i>
         <i className='i'></i>
         <i className='i'></i>
         <i className='i'></i>
      </div>
   )
}

export default Spinner
