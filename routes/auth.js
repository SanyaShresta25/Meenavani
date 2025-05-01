/**
 * Authentication Routes
 * Handles user registration, login, and profile management
 */

const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const auth = require("../middleware/auth")

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, location, phone } = req.body

    // Check if user already exists
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ msg: "User already exists" })
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
      role: role || "fisher",
      location,
      phone,
    })

    await user.save()

    // Create and return JWT token
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    }

    jwt.sign(payload, process.env.JWT_SECRET || "meenavani_secret", { expiresIn: "24h" }, (err, token) => {
      if (err) throw err
      res.json({ token })
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
})

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" })
    }

    // Verify password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" })
    }

    // Create and return JWT token
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    }

    jwt.sign(payload, process.env.JWT_SECRET || "meenavani_secret", { expiresIn: "24h" }, (err, token) => {
      if (err) throw err
      res.json({ token })
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
})

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
})

// @route   PUT api/auth/user
// @desc    Update user profile
// @access  Private
router.put("/user", auth, async (req, res) => {
  try {
    const { name, location, phone } = req.body

    // Build user object
    const userFields = {}
    if (name) userFields.name = name
    if (location) userFields.location = location
    if (phone) userFields.phone = phone

    // Update user
    const user = await User.findByIdAndUpdate(req.user.id, { $set: userFields }, { new: true }).select("-password")

    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
})

module.exports = router
