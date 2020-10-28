import express from "express"
import path, { dirname } from "path"
import dotenv from "dotenv"
import cors from "cors"
import connect from "./config/connect.js"
import { fileURLToPath } from "url"
import { _404Error, errorHandler } from "./middlewares/errorHandler.js"
//routes
import productRoute from "./routes/productRoute.js"
import cartRoute from "./routes/cartRoutes.js"
import authRoute from "./routes/authRoute.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const app = express()
app.use(cors())
dotenv.config({
   path: "./server/config/config.env",
})
connect()

app.use(express.json())

app.use("/api/products", productRoute)
app.use("/api/cart", cartRoute)
app.use("/api/auth", authRoute)

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "../client/build")))
   app.use("*", (req, res) =>
      res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"))
   )
} else {
   app.get("/", (req, res, next) => {
      res.send("API is running")
   })
}

//error handler
app.use(_404Error)
app.use(errorHandler)

const PORT = process.env.PORT || 9000
app.listen(PORT, () => {
   console.log(`Server Started at PORT :  ${PORT}`)
})
