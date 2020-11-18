import React, { useEffect, useState } from "react"
import Maps from "./Map"
import { PageLayout } from "components/common/PageLayout"
import { Button } from "components/UI/Button"
import axios from "axios"
import "./ContactUs.scss"
const ContactUs = () => {
   const [response, setResponse] = useState()
   const [name, setName] = useState("")
   const [email, setEmail] = useState("")
   const [contact, setcontact] = useState("")
   const [message, setMessage] = useState("")

   // console.log(name)
   // useEffect(() => {
   // }, [])

   const onSubmit = async (e) => {
      e.preventDefault()
      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      }
      const res = await axios.post(
         "http://localhost:9000/api/feedback",
         { name, email, contact, message },
         config
      )
      // console.log(res.data.message)
      setResponse(res.data.message)
   }
   return (
      <PageLayout style={{ paddingBottom: " 62px " }}>
         {response && response.data.message === "Success" ? (
            <div
               style={{
                  fontSize: "24px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
               }}
            >
               Thank you for your feedback
            </div>
         ) : (
            <>
               <header
                  style={{
                     fontSize: "24px",
                     textAlign: "center",
                     margin: "4% 0",
                     fontWeight: 700,
                  }}
               >
                  GET IN TOUCH
               </header>
               <div className='contactus'>
                  <div className='contactus__left'>
                     <div className='contactus__details'>
                        <svg className=' contactus__icon'>
                           <use xlinkHref='/icons/tabler-sprite.svg#tabler-map' />
                        </svg>
                        <div>Bagmati, Bhaktapur, Kamalbinayak Area</div>
                     </div>
                     <div className='contactus__details'>
                        <svg className=' contactus__icon'>
                           <use xlinkHref='/icons/tabler-sprite.svg#tabler-phone' />
                        </svg>
                        01-6614243
                     </div>
                     <div className='contactus__details'>
                        <svg className=' contactus__icon'>
                           <use xlinkHref='/icons/tabler-sprite.svg#tabler-device-mobile' />
                        </svg>
                        9860465326
                     </div>
                     <div className='contactus__details icon__group'>
                        <svg className=' contactus__icon'>
                           <use xlinkHref='/icons/tabler-sprite.svg#tabler-brand-facebook' />
                        </svg>
                        <svg className=' contactus__icon'>
                           <use xlinkHref='/icons/tabler-sprite.svg#tabler-brand-google' />
                        </svg>
                        <svg className=' contactus__icon'>
                           <use xlinkHref='/icons/tabler-sprite.svg#tabler-brand-twitter' />
                        </svg>
                        <svg className=' contactus__icon'>
                           <use xlinkHref='/icons/tabler-sprite.svg#tabler-brand-instagram' />
                        </svg>
                     </div>
                     <div className='map__container'>
                        <Maps />
                     </div>
                  </div>
                  <div className='contactus__right'>
                     <div
                        style={{
                           fontSize: "20px",
                        }}
                     >
                        Leave us a message
                     </div>
                     <div className='contactus__form'>
                        <input
                           type='text'
                           className='contactus__input'
                           placeholder='Name'
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                        />
                        <input
                           type='email'
                           className='contactus__input'
                           placeholder='Email'
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                           type='number'
                           className='contactus__input '
                           placeholder='Contact Number'
                           value={contact}
                           onChange={(e) => setcontact(e.target.value)}
                        />
                        <textarea
                           className='contactus__input contactus__textarea'
                           placeholder='Write your message here'
                           value={message}
                           onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                        {response && response.data.message !== "Success" && (
                           <div
                              style={{
                                 color: " #333333bb",

                                 backgroundColor: "#f8d7da",
                                 borderColor: "#f5c6cb",
                                 padding: "12px 20px",
                              }}
                           >
                              {response.data.message}
                           </div>
                        )}
                        <Button
                           type='primary'
                           style={{ marginTop: "16px" }}
                           onClick={onSubmit}
                        >
                           Send
                        </Button>
                     </div>
                  </div>
               </div>
            </>
         )}
      </PageLayout>
   )
}

export default ContactUs
