import React from "react"
import "./Badge.scss"
const Badge = (props) => {
   const badgeTypes = ["HIGHEST RATED", "BESTSELLER"]
   let classes
   switch (props.children) {
      case "Processing":
         classes = "badge__info"
         break
      case "Packed for delivery":
         classes = "bagde__warning"
         break
      case "Cancelled":
         classes = "badge__danger"
         break
      case "Delivered":
         classes = "badge__success"
         break
      default:
         classes = ""
   }
   return <div className={`badge ${classes}`}>{props.children}</div>
}

export default Badge
