import React from "react"
import KhaltiCheckout from "khalti-checkout-web"

const Esewaplayground = () => {
   let config = {
      // replace this key with yours
      publicKey: "test_public_key_dc74e0fd57cb46cd93832aee0a390234",
      productIdentity: "1234567890",
      productName: "Drogon",
      productUrl: "http://gameofthrones.com/buy/Dragons",
      eventHandler: {
         onSuccess(payload) {
            // hit merchant api for initiating verfication
            console.log(payload)
         },
         // onError handler is optional
         onError(error) {
            // handle errors
            console.log(error)
         },
         onClose() {
            console.log("widget is closing")
         },
      },
      paymentPreference: [
         "KHALTI",
         "EBANKING",
         "MOBILE_BANKING",
         "CONNECT_IPS",
         "SCT",
      ],
   }
   let checkout = new KhaltiCheckout(config)
   return (
      <div>
         <button
            onClick={() => {
               checkout.show({ amount: 1000 })
            }}
         >
            click me
         </button>
      </div>
   )
}

// import axios from "axios"
// const  = () => {
//    const url = "https://tokentest.com.np/payment"
//    const params = {
//       request_id: "12123122",
//       amount: 1000,
//       transaction_code: "01XV31A",
//    }
//    const onSubmit = async (e) => {
//       e.preventDefault()
//       const config = {
//          headers: {
//             "Access-Control-Allow-Origin": "*",
//             "Content-Type": "application/json",
//          },
//       }
//       const lol = await axios.post(url, params, config)
//       console.log(lol)
//    }
//    return (
//       <div>
//          <form action='https://uat.esewa.com.np/epay/main' method='POST'>
//             <input value='100' name='tAmt' type='hidden' />
//             <input value='90' name='amt' type='hidden' />
//             <input value='5' name='txAmt' type='hidden' />
//             <input value='2' name='psc' type='hidden' />
//             <input value='3' name='pdc' type='hidden' />
//             <input value='epay_payment' name='scd' type='hidden' />
//             <input
//                value='ee2c3ca1-696b-4cc5-a6be-2c40d929d453'
//                name='pid'
//                type='hidden'
//             />
//             <input
//                value='http://merchant.com.np/page/esewa_payment_success?q=su'
//                type='hidden'
//                name='su'
//             />
//             <input
//                value='http://merchant.com.np/page/esewa_payment_failed?q=fu'
//                type='hidden'
//                name='fu'
//             />
//             <input value='Submit' type='submit' />
//          </form>
//       </div>
//    )
// }

export default Esewaplayground
