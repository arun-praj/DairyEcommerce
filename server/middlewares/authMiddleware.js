import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../models/UserModel.js"
const protectUser = asyncHandler(async (req, res, next) => {
   if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
   ) {
      try {
         const decode = await jwt.verify(
            req.headers.authorization.split(" ")[1],
            process.env.JWT_SECRET
         )
         req.userId = decode.id
      } catch (e) {
         res.status(403)
         throw new Error("Not authorized, Invalid token")
      }
   } else {
      res.status(403)
      throw new Error("Not authorized, No token")
   }
   next()
})

const admin = asyncHandler(async (req, res, next) => {
   const user = await User.findById(req.userId)
   if (req.userId && user.role === "admin") {
      next()
   } else {
      res.status(401)
      throw new Error("Not authorized not admin")
   }
})

export { protectUser, admin }
