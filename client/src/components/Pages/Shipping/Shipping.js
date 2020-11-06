import React, { useEffect, useState } from "react"

import { PageHeader } from "components/common/PageHeader"
import { PageLayout } from "components/common"
import { useDispatch, useSelector } from "react-redux"
import "./Shipping.scss"

const Shipping = ({ history }) => {
   const [region, setRegion] = useState("Bagmati")
   const [city, setCity] = useState("bhaktapur")
   const [area, setArea] = useState("")
   const [listOfArea, setListOfArea] = useState("")
   const [error, setError] = useState("")

   const { isAuth } = useSelector((state) => state.userDetail)
   useEffect(() => {
      if (city !== null || city !== undefined || city.length > 1) {
         const found = addresses.find((address) => {
            return address.region === region
         })
         const q = found.cities.find((ct) => {
            return Object.keys(ct)[0] === city
         })

         if (q !== undefined) {
            setListOfArea(Object.values(q)[0])
         }
      }
   }, [city])
   useEffect(() => {
      if (!isAuth) {
         history.push("/cart")
      }
   })
   const onSubmit = () => {
      if (area.length < 1 || city.length < 1 || region.length < 1) {
         setError("Please fill out Address form")
      } else {
         setError("")
      }
   }

   const addresses = [
      {
         region: "Bagmati",
         cities: [
            {
               bhaktapur: ["Sallaghari", "Suryabinayak", "Kamalbinayak"],
            },
            {
               kathmandu: ["New Road", "Ason", "Kwoteshowr"],
            },
         ],
      },
      {
         region: "Gandaki",
         cities: [
            {
               Pokhara: ["A", "B", "C"],
            },
            {
               Mardi: ["New D", "E", "F"],
            },
         ],
      },
   ]
   return (
      <div>
         <PageHeader>
            <PageLayout style={{ height: "100%" }}>
               <div>Checkout</div>
            </PageLayout>
         </PageHeader>
         <PageLayout>
            <div
               style={{
                  margin: "16px 0",

                  backgroundColor: error ? "#f8d7da" : "white",
                  borderColor: "#f5c6cb",
                  padding: "12px 20px",

                  color: error ? "#333333bb" : "white",
               }}
            >
               {error}
            </div>
            <div className='container'>
               <div className='container_left'>
                  <h4
                     style={{
                        fontSize: "24px",
                        fontWeight: "500",
                        padding: "0 0 8px",
                     }}
                  >
                     Billing Address
                  </h4>
                  <div className='form_container'>
                     <div className='select_container'>
                        <select
                           name=''
                           id='region'
                           className='select_form '
                           onChange={(e) => {
                              setRegion(e.target.value)
                           }}
                        >
                           <option value='' disabled>
                              Region
                           </option>
                           {addresses.map((address) => {
                              return (
                                 <option value={address.region}>
                                    {address.region}
                                 </option>
                              )
                           })}
                        </select>
                        <label htmlFor='region' className='select_label'>
                           Region
                        </label>
                     </div>

                     <div className='select_container'>
                        <select
                           name=''
                           id='city'
                           className='select_form'
                           onChange={(e) => {
                              setCity(e.target.value)
                           }}
                        >
                           <option value='' disabled>
                              City
                           </option>
                           {region &&
                              city &&
                              addresses
                                 .find((address) => {
                                    return address.region === region
                                 })
                                 .cities.map((city) => {
                                    return (
                                       <option
                                          key={Object.keys(city)}
                                          value={Object.keys(city)}
                                       >
                                          {Object.keys(city)}
                                       </option>
                                    )
                                 })}
                        </select>
                        <label htmlFor='city' className='select_label'>
                           City
                        </label>
                     </div>
                     <div className='select_container'>
                        <select
                           name=''
                           id='area'
                           className='select_form '
                           onChange={(e) => {
                              setArea(e.target.value)
                           }}
                        >
                           <option value='' disabled>
                              Area
                           </option>
                           {listOfArea &&
                              listOfArea.map((area) => {
                                 return (
                                    <option key={area} value={area}>
                                       {area}
                                    </option>
                                 )
                              })}
                        </select>
                        <label htmlFor='area' className='select_label'>
                           Area
                        </label>
                     </div>
                  </div>
                  <h4
                     style={{
                        fontSize: "24px",
                        fontWeight: "500",
                        padding: "0 0 8px",
                     }}
                  >
                     Billing Address
                  </h4>
                  {/* <button onClick={onSubmit}>Click me</button> */}
               </div>

               <div className='container_right'>a</div>
            </div>
         </PageLayout>
      </div>
   )
}

export default Shipping
