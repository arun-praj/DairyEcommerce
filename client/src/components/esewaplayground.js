import React from "react"
import axios from "axios"
const Esewaplayground = () => {
   const url = "https://tokentest.com.np/payment"
   const params = {
      request_id: "12123122",
      amount: 1000,
      transaction_code: "01XV31A",
   }
   const onSubmit = async (e) => {
      e.preventDefault()
      const config = {
         headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
         },
      }
      const lol = await axios.post(url, params, config)
      console.log(lol)
   }
   return (
      <div>
         <button onClick={onSubmit}>Esewa api sucks</button>
         {/* {lol && <div>lol</div>} */}
      </div>
   )
}

export default Esewaplayground
