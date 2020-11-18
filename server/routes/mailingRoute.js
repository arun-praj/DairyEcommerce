import asyncHandler from "express-async-handler"
import express from "express"
import User from "../models/UserModel.js"
const router = express.Router()
const sendMail = () => {
   let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         user: "arunkp1122@gmail.com",
         pass: "sasuke07",
      },
   })

   let mailOptions = {
      form: "arunkp1122@gmail.com",
      to: "datheputhebabin@gmail.com",
      subject: "TIHAR OFFER",
      text: "Spend 2000rs to get 100 rs discount and also free deliver.",
   }

   transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
         console.log(err)
      } else {
         console.log("email sent")
      }
   })
}

router.post(
   "/",
   asyncHandler(async (req, res) => {
      console.log(req.body)
      let emails = []
      sendMail()
      //   console.log(req.body)

      //   console.log(req.body)

      //   if (req.body.mailToall) {
      //      const users = await User.find({ subscribeToNews: true }).select(
      //         "email"
      //      )
      //      emails = users
      //         .map(function (elem) {
      //            return elem.email
      //         })
      //         .join(",")
      //      //  console.log(emails)
      //   }
      //   console.log(req.body)
      //   let transporter = nodemailer.createTransport({
      //      service: "gmail",
      //      auth: {
      //         user: "arunkp1122@gmail.com",
      //         pass: "sasuke07",
      //      },
      //   })

      //   let mailOptions = {
      //      form: "arunkp1122@gmail.com",
      //      to: "datheputhebabin@gmail.com",
      //      subject: "TIHAR OFFER",
      //      text: "Spend 2000rs to get 100 rs discount and also free deliver.",
      //   }

      //   transporter.sendMail(mailOptions, (err, data) => {
      //      if (err) {
      //         console.log(err)
      //      } else {
      //         console.log("email sent")
      //      }
      //   })
   })
)
export default router
