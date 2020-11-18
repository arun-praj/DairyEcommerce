import express from "express"
const router = express.Router()
import asyncHandler from "express-async-handler"

import Feedback from "../models/FeedbackModel.js"

//@description      Get all products
//@Routes           GET /api/feedback/
//@access           public
router.get(
   "/",
   asyncHandler(async (req, res) => {
      const feedbacks = await Feedback.find({})
      if (feedbacks) {
         return res
            .json({
               data: product,
               message: "Feedbacks loaded",
            })
            .status(200)
      }
      res.status(500)
      throw new Error("No any feedbacks")
   })
)

//@description      Add a feedbacks
//@Routes           GET /api/feedback/
//@access           public
router.post(
   "/",
   asyncHandler(async (req, res) => {
      // const {name,email,contact,message} = req.body
      // const feedbacks = await Feedback.find({})

      const feedback = await Feedback.create(req.body)
      // console.log(req.body)
      if (feedback) {
         return res
            .json({
               message: "Success",
            })
            .status(201)
      }
      res.status()
      throw new Error("Error Sending message. Try again")
   })
)

export default router
