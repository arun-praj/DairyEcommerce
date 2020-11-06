import express from "express"
const router = express.Router()
import asyncHandler from "express-async-handler"

import User from "../models/UserModel.js"
import generateToken from "../utils/generateWebToken.js"
import protectUser from "../middlewares/authMiddleware.js"
//@description      User login and get token
//@Routes           GET /api/auth/login
//@access           public
router.post(
   "/login",
   asyncHandler(async (req, res, next) => {
      const { email, password } = req.body
      let user = await User.findOne({
         email,
      }).select("+password")

      if (user && (await user.matchPassword(password))) {
         return res
            .json({
               message: "Auth Success",
               data: {
                  token: generateToken(user._id),
                  user,
               },
            })
            .status(200)
      } else {
         throw new Error("Invalid Email or Password")
      }
   })
)

//@description      User register and get token
//@Routes           GET /api/auth/register
//@access           public
router.post(
   "/register",
   asyncHandler(async (req, res, next) => {
      const user = req.body

      const userExist = await User.findOne({ email: user.email })
      if (userExist) {
         res.status(400)
         throw new Error("User already exists")
      }
      const createdUser = await User.create(user)
      if (createdUser) {
         return res
            .json({
               message: "Success",
               data: {
                  user: createdUser,
                  token: generateToken(createdUser._id),
               },
            })
            .status(201)
      }
      throw new Error("User cannot be created")
   })
)

//@description      Update user
//@Routes           PUT /api/auth/profile
//@access           private
router.put(
   "/profile",
   protectUser,

   asyncHandler(async (req, res, next) => {
      const user = await User.findById(req.userId)
      if (user) {
         user.firstName = req.body.firstName || user.firstName
         user.lastName = req.body.lastName || user.lastName
         user.contact = req.body.contact || user.contact

         if (req.body.password) {
            user.password = req.body.password
         }
      }
      const updatedUser = await user.save()
      if (updatedUser) {
         return res
            .json({
               message: "Success",
               data: {
                  user: updatedUser,
                  token: generateToken(updatedUser._id),
               },
            })
            .status(201)
      }
      throw new Error("User cannot be created")
   })
)

//@description      Get user profile
//@Routes           GET /api/auth/me
//@access           private
router.get(
   "/me",
   protectUser,
   asyncHandler(async (req, res, next) => {
      const user = await User.findById(req.userId).select("-password")

      if (user) {
         res.status(200)
         res.json({
            message: "User authorized by token",
            data: user,
         })
      } else {
         res.status(403)
         throw new Error("User not authorized")
      }
   })
)

export default router
