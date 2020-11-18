import nodemailer from "nodemailer"

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
