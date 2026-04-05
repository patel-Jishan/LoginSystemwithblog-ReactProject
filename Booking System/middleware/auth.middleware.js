var jwt = require("jsonwebtoken")
const Blacklist = require("../models/blacklist.model")

function Auth(...roles) {
  return async (req, res, next) => {
    try {
      let token = req.headers.authorization?.split(" ")[1]
      // console.log("TOKEN:", token)

      if (!token) {
        return res.json({ success: false, message: "Token missing" })
      }

      let isBlack = await Blacklist.findOne({ token })
      if (isBlack) {
        return res.json({ success: false, message: "Token blacklisted" })
      }

      let decoded = jwt.verify(token, process.env.JWT_SECRET)

      if (roles.includes(decoded.role)) {
        req.userId = decoded.userId
        next()
      } else {
        return res.json({ success: false, message: "Not allowed" })
      }

    } catch (e) {

      if (e.message === "jwt expired") {
        try {
          let refreshToken = req.headers.refreshtoken?.split(" ")[1]

          if (!refreshToken) {
            return res.json({ message: "Refresh token missing" })
          }

          let decoded = jwt.verify(refreshToken, process.env.JWT_SECRET)

          let newToken = jwt.sign(
            {
              name: decoded.name,
              role: decoded.role,
              email: decoded.email,
              userId: decoded.userId
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          )

          req.userId = decoded.userId
          res.setHeader("authorization", `Bearer ${newToken}`)

          next()

        } catch (err) {
          return res.json({ message: "Both tokens expired", login: false })
        }
      } else {
        return res.json({ message: e.message })
      }
    }
  }
}

module.exports = { Auth }