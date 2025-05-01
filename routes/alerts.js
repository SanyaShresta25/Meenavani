/**
 * Alert Routes
 * Handles safety and market alerts for fishers
 */

const express = require("express")
const router = express.Router()
const Alert = require("../models/Alert")
const auth = require("../middleware/auth")

// @route   GET api/alerts
// @desc    Get all alerts
// @access  Public
router.get("/", async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ createdAt: -1 })
    res.json(alerts)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
})

// @route   GET api/alerts/:id
// @desc    Get alert by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id)

    if (!alert) {
      return res.status(404).json({ msg: "Alert not found" })
    }

    res.json(alert)
  } catch (err) {
    console.error(err.message)
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Alert not found" })
    }
    res.status(500).send("Server error")
  }
})

// @route   POST api/alerts
// @desc    Create an alert (admin only)
// @access  Private/Admin
router.post("/", auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Not authorized" })
    }

    const { type, title, description, source, area, validUntil, severity } = req.body

    // Create new alert
    const newAlert = new Alert({
      type,
      title,
      description,
      source,
      area,
      validUntil,
      severity,
    })

    const alert = await newAlert.save()
    res.json(alert)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
})

// @route   DELETE api/alerts/:id
// @desc    Delete an alert (admin only)
// @access  Private/Admin
router.delete("/:id", auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Not authorized" })
    }

    const alert = await Alert.findById(req.params.id)

    if (!alert) {
      return res.status(404).json({ msg: "Alert not found" })
    }

    await alert.remove()
    res.json({ msg: "Alert removed" })
  } catch (err) {
    console.error(err.message)
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Alert not found" })
    }
    res.status(500).send("Server error")
  }
})

module.exports = router
