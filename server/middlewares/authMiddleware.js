import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"

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

export default protectUser
