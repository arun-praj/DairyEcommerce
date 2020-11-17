import React, { useEffect, useState } from "react"
import { FormContainer } from "components/common"
import { useDispatch } from "react-redux"

import { decoratedProducts } from "data/decoratedProduct"
import { occasions } from "data/occasions"
import { Button } from "components/UI/Button"
import { addToCart } from "redux/actions/cartAction"
import "./Special.scss"
const Special = ({ match, history }) => {
   const dispatch = useDispatch()

   const [formError, setFormError] = useState("")
   const [selectedDesign, setSelectedDesign] = useState()
   const [formData, setFormData] = useState({
      occasion: "",
      text: "",
      qty: "",
   })
   const formDataHandler = (e) => {
      e.persist()
      setFormData((prevState) => {
         return {
            ...prevState,
            [e.target.name]: e.target.value,
         }
      })
   }
   const submitHandler = () => {
      if (formData.text.length > 30) {
         setFormError("Length is greater than 30")
         return
      }
      if (
         formData.occasion === "" ||
         formData.text === "" ||
         selectedDesign === ""
      ) {
         setFormError("Fill in all the form data")
         return
      }
      // console.log(match.params.id)
      dispatch(
         addToCart(
            match.params.id,
            formData.qty,
            true,
            selectedDesign,
            0,
            formData.text
         )
      )
      history.replace("/cart")

      // console.log(formData.occasion, formData.text, selectedDesign)
   }

   // useEffect(() => {
   //    dispatch(listProducts())
   // })
   return (
      <div>
         <FormContainer>
            <h4
               style={{ margin: "15px 0", fontSize: "17px", fontWeight: "600" }}
            >
               Decorate products
            </h4>

            <div className='select_container'>
               <select
                  name='occasion'
                  id='occasion'
                  className='select_form'
                  onChange={formDataHandler}
                  value={formData.occasion}
               >
                  <option value='' disabled selected>
                     Select one of below
                  </option>
                  {occasions.map((occasion) => {
                     return (
                        <option value={occasion.name}>{occasion.name}</option>
                     )
                  })}
               </select>
               <label
                  htmlFor='occasion'
                  style={{
                     opacity: "0.6",
                  }}
                  className='select_label'
               >
                  Whats the occasions?
               </label>
            </div>
            <div className='select_container'>
               <input
                  name='text'
                  type='text'
                  placeholder='eg. Happy birthday Arun'
                  id='contact'
                  className='select_form'
                  onChange={formDataHandler}
                  value={formData.text}
                  style={{
                     paddingLeft: "16px",
                  }}
               />
               <label
                  htmlFor='contact'
                  style={{
                     opacity: "0.6",
                  }}
                  className='select_label'
               >
                  Text to write in product
               </label>
               <div
                  style={{
                     marginTop: "-10px",
                     marginBottom: "16px",
                     fontSize: "12px",
                  }}
               >
                  * no longer than 30 character
               </div>
               <div className='select_container'>
                  <select
                     name='qty'
                     id='occasion'
                     className='select_form'
                     onChange={formDataHandler}
                     value={formData.qty}
                  >
                     <option value='1' selected>
                        1
                     </option>
                     <option value='2'>2</option>
                     <option value='3'>3</option>
                     <option value='4'>4</option>
                     <option value='5'>5</option>
                     <option value='6'>6</option>
                     <option value='7'>7</option>
                     <option value='8'>8</option>
                     <option value='9'>9</option>
                     <option value='10'>10</option>
                  </select>
                  <label
                     htmlFor='occasion'
                     style={{
                        opacity: "0.6",
                     }}
                     className='select_label'
                  >
                     Select the quantity
                  </label>
               </div>
               <div>
                  <div
                     style={{
                        fontSize: "16px",
                        fontWeight: "700",
                        padding: "24px 0px 0 ",
                     }}
                  >
                     Pick a design below:
                  </div>
                  <div className='gallery'>
                     {decoratedProducts.map((product) => {
                        return (
                           <>
                              <input
                                 name={product.decorationName}
                                 style={{
                                    visibility: "hidden",
                                    display: "none",
                                 }}
                                 type='radio'
                                 id='1'
                              />
                              <label
                                 htmlFor={product.decorationName}
                                 onClick={() =>
                                    setSelectedDesign(product.decorationName)
                                 }
                              >
                                 <img
                                    className='gallery__box'
                                    // height='100%'
                                    // width='120px'
                                    style={{
                                       // height: "100px",

                                       cursor: "pointer",

                                       boxShadow:
                                          product.decorationName ===
                                          selectedDesign
                                             ? " inset 0 0 1px rgba(0, 119, 145, 0.5)"
                                             : "none",
                                       border:
                                          product.decorationName ===
                                          selectedDesign
                                             ? "1px solid  #76c5d6"
                                             : "none",
                                    }}
                                    src={product.img}
                                    alt=''
                                 />
                              </label>
                           </>
                        )
                     })}
                  </div>

                  {formError && (
                     <div
                        style={{
                           color: " #333333bb",
                           fontSize: "16px",
                           marginBottom: "16px",
                           backgroundColor: "#f8d7da",
                           borderColor: "#f5c6cb",
                           padding: "12px 20px",
                        }}
                     >
                        {formError}
                     </div>
                  )}
                  <Button type='primary' onClick={submitHandler}>
                     Done
                  </Button>
               </div>
            </div>
         </FormContainer>
      </div>
   )
}

export default Special
