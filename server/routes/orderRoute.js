import asyncHandler from "express-async-handler"
import express from "express"
const router = express.Router()
import { protectUser } from "../middlewares/authMiddleware.js"
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
      const {
         orderItems,
         shippingAddress,
         paymentMethod,
         itemsPrice,
         dateToDeliver,
      } = req.body
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
            totalPrice:
               Number(a.deliveryPrice) +
               Number(itemsPrice) -
               Number(coupanPrice),
            user: req.userId,
            shippingPrice: a.deliveryPrice,
            dateToDeliver,
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

//@description      Get order by order Id
//@Routes           get /api/order/:id
//@access           private
router.get(
   "/:id",
   protectUser,
   asyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id).populate(
         "user",
         "name,email"
      )
      if (order) {
         res.json({
            data: order,
         })
      } else {
         res.status(404)
         throw new Error("Order not found")
      }
   })
)

//@description      Get logedin user orders
//@Routes           get /api/order/my
//@access           private
router.get(
   "/my/orders",
   protectUser,
   asyncHandler(async (req, res) => {
      const orders = await Order.find(
         {
            user: req.userId,
         },
         [],
         {
            sort: {
               createdAt: -1,
            },
         }
      )
      console.log(orders)
      if (orders) {
         res.json({
            data: orders,
         })
      } else {
         res.status(404)
         throw new Error("Your order is empty")
      }
   })
)

//@description      Cancel order by Id// set orderStatus to cancelled
//@Routes           put /api/order/
//@access           private
router.put(
   "/",
   protectUser,
   asyncHandler(async (req, res) => {
      console.log(req.body.id, req.body.status)
      const order = await Order.findOneAndUpdate(
         { _id: req.body.id },
         {
            orderStatus: req.body.status,
         },
         {
            new: true,
         }
      )
      if (order) {
         if (req.body.status === "Cancelled") {
            const { orderItems } = order
            orderItems.forEach(async (el) => {
               await Product.updateOne(
                  {
                     _id: el._id,
                  },
                  {
                     $inc: {
                        countInStock: +el.qty,
                     },
                  }
               )
            })
         }
         res.json({
            message: "success",
            data: order,
         }).status(200)
      } else {
         res.status(406)
         throw new Error("Could not update your request")
      }

      // if (orders) {
      //    res.json({
      //       data: orders,
      //    })
      // } else {
      //    res.status(404)
      //    throw new Error("Your order is empty")
      // }
   })
)
export default router
