const mongoose = require("mongoose")

const blacklistSchema = new mongoose.Schema({
  token: String,
  expiresAt: Date
})

module.exports = mongoose.model("Blacklist", blacklistSchema)