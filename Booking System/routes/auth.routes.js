const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/user.model")
const Blacklist = require("../models/blacklist.model")
const sendMail = require("../utils/forgetMail")

// Signup
router.post("/signup", async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 5)
  const user = new User({ ...req.body, password: hash })
  await user.save()

  res.json({ message: "User created" })
})

// Login
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.json({ message: "User not found" })

  const match = await bcrypt.compare(req.body.password, user.password)
  if (!match) return res.json({ message: "Wrong password" })

  const accessToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  )

  const refreshToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  )

  res.json({ accessToken, refreshToken })
})

// Logout
router.post("/logout", async (req, res) => {
  let token = req.headers.authorization.split(" ")[1]

  await Blacklist.create({
    token,
    expiresAt: new Date(Date.now() + 15 * 60 * 1000)
  })

  res.json({ message: "Logout successful" })
})

// Forgot Password
router.post("/forgot-password", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res.json({ success: false, message: "User not found" })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    )

    const link = `http://localhost:5173/reset/${token}`

    // ✅ Yaha tumhara sendMail use hoga
    await sendMail(
      user.email,
      "Reset Password",
      `
      <div style="text-align:center;">
        <h2>Reset Your Password</h2>
        <a href="${link}" 
           style="padding:10px 20px; background:blue; color:white; text-decoration:none;">
           Reset Password
        </a>
        <p>This link will expire in 10 minutes</p>
      </div>
      `
    )

    res.json({ success: true, message: "Email sent" })

  } catch (err) {
    res.json({ success: false, message: err.message })
  }
})
// Reset Password
router.post("/reset-password/:token", async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET)

    const hash = await bcrypt.hash(req.body.password, 5)

    await User.findByIdAndUpdate(decoded.id, { password: hash })

    res.json({ success: true, message: "Password updated successfully" })

  } catch (err) {
    res.json({ success: false, message: "Invalid or expired token" })
  }
})

module.exports = router