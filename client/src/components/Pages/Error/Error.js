import React, { useEffect } from "react"
import { Link } from "react-router-dom"

import "./Error.scss"
// const style = {
//    height: "100vh",
//    width: "100vw",
// };
const Error = (props) => {
   useEffect(() => {
      window.scrollTo(0, 0)
   }, [])
   return (
      <div>
         <section className='page_404'>
            <div className='four_zero_four_bg'>
               <h1 className='text-center '>404</h1>
            </div>
            <div className='contant_box_404'>
               <h4
                  style={{
                     fontSize: "16px",
                     fontWeight: 700,
                  }}
               >
                  Looks like you're lost
               </h4>

               <p
                  style={{
                     fontSize: "12px",
                     fontWeight: 500,
                  }}
               >
                  The page you are looking for is not available!
               </p>

               <Link to='/' href='' className='link_404'>
                  Go to Home
               </Link>
            </div>
         </section>
      </div>
   )
}
export default Error
