const express = require("express")
const router = express.Router()
const Dish = require("../models/dish.model")
const { Auth } = require("../middleware/auth.middleware")

// Create Dish (Admin)
router.post("/", Auth("admin"), async (req, res) => {
  const dish = new Dish(req.body)
  await dish.save()
  res.json(dish)
})

// Get All
router.get("/", async (req, res) => {
  const dishes = await Dish.find()
  res.json(dishes)
})

// Update
router.patch("/:id", Auth("admin"), async (req, res) => {
  await Dish.findByIdAndUpdate(req.params.id, req.body)
  res.json({ message: "Updated" })
})

// Delete
router.delete("/:id", Auth("admin"), async (req, res) => {
  await Dish.findByIdAndDelete(req.params.id)
  res.json({ message: "Deleted" })
})

module.exports = router