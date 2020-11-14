import React, { useEffect, useState } from "react"
import { PageLayout, Input, FormContainer } from "components/common"
import { useDispatch, useSelector } from "react-redux"
import { listProducts } from "redux/actions/productsAction"

import { occasions } from "data/occasions"
const Special = () => {
   const dispatch = useDispatch()
   const { userInfo, loading, error, isAuth } = useSelector(
      (state) => state.userDetail
   )
   const [formData, setFormData] = useState({
      email: "",
      password: "",
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
   useEffect(() => {
      dispatch(listProducts())
   })
   return (
      <div>
         <FormContainer>
            <h4
               style={{ margin: "15px 0", fontSize: "17px", fontWeight: "600" }}
            >
               Decorate products
            </h4>

            <div className='select_container'>
               <input
                  name='contact'
                  type='text'
                  placeholder='Your full name'
                  id='contact'
                  className='select_form'
                  style={{
                     paddingLeft: "16px",
                     opacity: "0.7",
                     //  marginLeft: "10px",
                  }}
               />
               <label htmlFor='contact' className='select_label'>
                  Full name
               </label>
            </div>

            <div className='select_container'>
               <input
                  name='contact'
                  type='number'
                  placeholder='Your contact number'
                  id='contact'
                  className='select_form'
                  style={{
                     paddingLeft: "16px",
                     opacity: "0.7",
                     //  marginLeft: "10px",
                  }}
               />
               <label htmlFor='contact' className='select_label'>
                  Contact no
               </label>
            </div>
            <div className='select_container'>
               <select name='occasion' id='occasion' className='select_form'>
                  <option value='' disabled selected>
                     Select one of below
                  </option>
                  {occasions.map((occasion) => {
                     return (
                        <option value={occasion.name} selected>
                           {occasion.name}
                        </option>
                     )
                  })}
               </select>
               <label htmlFor='occasion' className='select_label'>
                  Whats the occasions?
               </label>
            </div>
            <div className='select_container'>
               <select name='occasion' id='occasion' className='select_form'>
                  <option value='' disabled selected>
                     Select one of below
                  </option>
                  <option value='' disabled selected>
                     curd
                  </option>
                  <option value='' disabled selected>
                     cake
                  </option>
               </select>
               <label htmlFor='occasion' className='select_label'>
                  Select product category
               </label>
            </div>
         </FormContainer>
      </div>
   )
}

export default Special
