require("dotenv").config()
const express = require("express")
const cors = require("cors")

const connectDB = require("./config/db")

const authRoutes = require("./routes/auth.routes")
const dishRoutes = require("./routes/dish.routes")
const orderRoutes = require("./routes/order.routes")

const app = express()

app.use(express.json())
app.use(cors())

app.use("/auth", authRoutes)
app.use("/dish", dishRoutes)
app.use("/order", orderRoutes)

app.get("/", (req, res) => {
  res.send("Dish Booking API Running 🚀")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, async () => {
  await connectDB()
  console.log("Server running on", PORT)
})