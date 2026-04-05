const express = require("express")
const router = express.Router()

const Order = require("../models/order.model")
const User = require("../models/user.model")
const { Auth } = require("../middleware/auth.middleware")
const sendMail = require("../utils/sendMail")

// Place Order
router.post("/", Auth("admin"), async (req, res) => {
  try {

    if (!req.body.date || !req.body.time) {
      return res.json({ message: "Date and Time required" })
    }

    const chefs = await User.find({ role: "chef" })

    if (chefs.length === 0) {
      return res.json({ message: "No chefs available" })
    }

    const randomChef = chefs[Math.floor(Math.random() * chefs.length)]

    const order = new Order({
      userId: req.userId,
      dishId: req.body.dishId,
      chefId: randomChef._id,
      date: req.body.date,
      time: req.body.time
    })

    await order.save()

    res.json({
      message: "Order placed successfully",
      order
    })

  } catch (e) {
    res.json({ message: e.message })
  }
})

// Update Status (Chef)
router.patch("/:id", Auth("chef"), async (req, res) => {
  const order = await Order.findById(req.params.id).populate("userId")

  if (!order) return res.json({ message: "Order not found" })

  order.status = req.body.status
  await order.save()

  if (req.body.status === "Delivered") {
    await sendMail(
      order.userId.email,
      "Order Delivered 🎉",
      `<h2>Your order delivered</h2><p>Order ID: ${order._id}</p>`
    )
  }

  res.json(order)
})

module.exports = router