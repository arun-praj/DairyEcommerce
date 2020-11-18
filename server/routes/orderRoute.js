import asyncHandler from "express-async-handler"
import express from "express"
const router = express.Router()
import { protectUser } from "../middlewares/authMiddleware.js"
import Order from "../models/OrderModel.js"
import Product from "../models/ProductModel.js"
import User from "../models/UserModel.js"
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

      const userInfo = await User.findById(req.userId)
      // console.log(userInfo)

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
            userName: userInfo.firstName + " " + userInfo.lastName,
            contact: userInfo.contact,
            email: userInfo.email,
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
//@description      Get All orders
//@Routes           get /api/order/delivery
//@access           private
router.get(
   "/delivery/:sort",
   protectUser,
   asyncHandler(async (req, res) => {
      let order = null
      // console.log(req.params.sort)
      if (req.params.sort === "today") {
         const now = new Date()
         let start = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            1,
            0,
            0
         )

         let end = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1,
            0,
            59,
            59
         )
         order = await Order.find({
            dateToDeliver: { $gte: start, $lt: end },
         })
      } else {
         order = await Order.find({})
      }
      // console.log(order[0].user)

      if (order) {
         res.json({
            data: order,
         })
      } else {
         res.status(404)
         throw new Error("Empty Orders")
      }
   })
)

//@description      Get order by order Id
//@Routes           get /api/order/:id
//@access           private
router.get(
   "/",
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

//@description      Cancel order by Id// set orderStatus to cancelled
//@Routes           put /api/deliverystatus/:status
//@access           private
router.put(
   "/deliverystatus/:status",
   protectUser,
   asyncHandler(async (req, res) => {
      console.log(req.params.status)
      console.log(req.body.orderId)
      let update
      // console.log(req);
      if (req.params.status === "success") {
         update = await Order.updateOne(req.body.orderId, {
            orderStatus: "Delivered",
         })
      } else {
         update = await Order.updateOne(req.body.orderId, {
            orderStatus: "Failed",
            orderId: "l",
         })
      }
      console.log(update)
      // const feedback = await Feedback.create(req.body)
      // // console.log(req.body)
      // if (feedback) {
      //    return res
      //       .json({
      //          message: "Success",
      //       })
      //       .status(201)
      // }
      // res.status()
      // throw new Error("Error Sending message. Try again")
      res.send("lol")
      // req.params.status
   })
)

export default router
