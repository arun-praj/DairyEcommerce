import React from "react"
import { Link } from "react-router-dom"
import "./Categories.scss"
import Dhau from "assets/products/juju_dhau.jpg"
const Categories = (props) => {
   return (
      <>
         <div className='topics-container card__style'>
            <h1 className='heading_main'>Our Product Categories.</h1>
            <h2 className='heading_sub'>
               Choose from one of the category below.
            </h2>
            <div>
               <div
                  style={{
                     height: "140px",
                     width: "100px",
                     // backgroundColor: "#FAFAFA",
                     borderRadius: "4px",
                     display: "flex",
                     flexDirection: "column",
                     justifyContent: "center",
                     alignItems: "center",
                     border: "solid 1px #dcdacb",
                  }}
                  className='card__sm'
               >
                  <img
                     style={{
                        borderRadius: "4px",
                     }}
                     height='70px'
                     width='70px'
                     src={Dhau}
                     alt='dhau ko photo'
                  />
                  <div style={{ marginTop: "16px", fontSize: "16px" }}>
                     Curd
                  </div>
               </div>
            </div>
         </div>
         <div className='topics-container list__style'>
            <h1 className='heading_main'>Our Product Categories.</h1>
            <h2 className='heading_sub'>
               Choose from one of the category below.
            </h2>
            <div className='topics'>
               <Link to='/categories?category=curd' className='topic-box'>
                  <img src={Dhau} alt='' className='topic-box-img' />
                  Yogurt
               </Link>
               <Link to='/categories?category=cake' className='topic-box'>
                  <img
                     src='/assets/products/redVelvet_cake.jpg'
                     alt=''
                     className='topic-box-img'
                  />
                  Cake
               </Link>
               <Link to='/categories?category=cheese' className='topic-box'>
                  <img
                     src='/assets/products/cheddar_cheese.jpg'
                     alt=''
                     className='topic-box-img'
                  />
                  Cheese
               </Link>
               <div className='topic-box'>
                  Butter
                  <span className='topic-box-text-sm'>Comming Soon!</span>
               </div>
               <div className='topic-box'>
                  Milk
                  <span className='topic-box-text-sm'>Comming Soon!</span>
               </div>
            </div>
         </div>
      </>
   )
}

export default Categories
