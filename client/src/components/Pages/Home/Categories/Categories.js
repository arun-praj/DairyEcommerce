import React from "react"
import { Link } from "react-router-dom"
import "./Categories.scss"

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
                     src='data:image/jpeg;base64,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'
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
                  <img
                     src='./backend/uploads/normal_dhau.jpg'
                     alt=''
                     className='topic-box-img'
                  />
                  Yogurt
               </Link>
               <Link to='/categories?category=cake' className='topic-box'>
                  <img
                     src='./backend/uploads/red-velvet.jpg'
                     alt=''
                     className='topic-box-img'
                  />
                  Cake
               </Link>
               <Link to='/categories?category=cheese' className='topic-box'>
                  <img
                     src='./backend/uploads/Nepali-yak-cheese.jpg'
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
