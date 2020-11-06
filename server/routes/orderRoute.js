import asyncHandler from "express-async-handler"
import express from "express"
const router = express.Router()
import protectUser from "../middlewares/authMiddleware.js"
import Order from "../models/OrderModel.js"
import Product from "../models/ProductModel.js"

import { address } from "../data/address.js"
//@description      add new order
//@Routes           POST /api/order
//@access           private
router.post(
   "/",
   protectUser,
   asyncHandler(async (req, res) => {
      const { orderItems, shippingAddress, paymentMethod, itemsPrice } = req.body
      const { area, region, city } = shippingAddress

      //Calculate delivery price
      const { cities } = address.find((add) => {
         return add.region === region
      })
      const { areas } = cities.find((ct) => {
         return ct.name === city
      })
      const a = areas.find((ar) => {
         return (ar.area = area)
      })
      const coupanPrice = itemsPrice > 2000 ? 100 : 0
      console.log(itemsPrice)
      if (orderItems && orderItems.length === 0) {
         res.status(400)
         throw new Error("No order item")
      } else {
         const order = new Order({
            orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice: Number(a.deliveryPrice) + Number(itemsPrice) - Number(coupanPrice),
            user: req.userId,
            shippingPrice: a.deliveryPrice,
         })
         const createdOrder = await order.save()
         //decrease stock count in database
         orderItems.forEach(async (el) => {
            await Product.updateOne(
               {
                  _id: el._id,
               },
               {
                  $inc: {
                     countInStock: -el.qty,
                  },
               }
            )
         })
         res.status(201).json({
            data: createdOrder,
         })
      }
   })
)
export default router
