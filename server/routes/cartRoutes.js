import express from "express"

const router = express.Router()

import Cart from "../models/CartModel.js"
import asyncHandler from "express-async-handler"

//@description      Add to cart
//@Routes           GET /api/cart/
//@access           public
router.post(
   "/",
   asyncHandler((req, res, next) => {
      const product = req.body

      res.json({
         data: product,
      })
   })
)

export default router
