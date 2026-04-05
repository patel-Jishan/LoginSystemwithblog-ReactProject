const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dishId: { type: mongoose.Schema.Types.ObjectId, ref: "Dish" },
  chefId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  date: {
    type: String,
    required: true
  },

  time: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["Order Received", "Preparing", "Out for Delivery", "Delivered"],
    default: "Order Received"
  }

}, { timestamps: true })

module.exports = mongoose.model("Order", orderSchema)