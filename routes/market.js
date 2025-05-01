/**
 * Market Routes
 * Handles fish market listings and transactions
 */

const express = require("express")
const router = express.Router()
const MarketListing = require("../models/MarketListing")
const User = require("../models/User")
const auth = require("../middleware/auth")
const multer = require("multer")
const path = require("path")

// Set up storage for market listing images
const storage = multer.diskStorage({
  destination: "./uploads/market/",
  filename: (req, file, cb) => {
    cb(null, "market-" + Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb)
  },
})

// Check file type
function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|gif/
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  // Check mime
  const mimetype = filetypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb("Error: Images Only!")
  }
}

// @route   GET api/market
// @desc    Get all market listings
// @access  Public
router.get("/", async (req, res) => {
  try {
    const listings = await MarketListing.find().sort({ createdAt: -1 })
    res.json(listings)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
})

// @route   GET api/market/:id
// @desc    Get market listing by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const listing = await MarketListing.findById(req.params.id)

    if (!listing) {
      return res.status(404).json({ msg: "Listing not found" })
    }

    res.json(listing)
  } catch (err) {
    console.error(err.message)
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Listing not found" })
    }
    res.status(500).send("Server error")
  }
})

// @route   POST api/market
// @desc    Create a market listing
// @access  Private
router.post("/", [auth, upload.single("image")], async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")

    const { fish, quantity, price, location, description, contact, fresh } = req.body

    // Create new listing
    const newListing = new MarketListing({
      fisher: req.user.id,
      fisherName: user.name,
      fish,
      quantity,
      price,
      location: location || user.location,
      description,
      contact: contact || user.phone,
      fresh: fresh === "true",
      image: req.file ? `/uploads/market/${req.file.filename}` : "",
    })

    const listing = await newListing.save()
    res.json(listing)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
})

// @route   DELETE api/market/:id
// @desc    Delete a market listing
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const listing = await MarketListing.findById(req.params.id)

    if (!listing) {
      return res.status(404).json({ msg: "Listing not found" })
    }

    // Check user
    if (listing.fisher.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(401).json({ msg: "User not authorized" })
    }

    await listing.remove()
    res.json({ msg: "Listing removed" })
  } catch (err) {
    console.error(err.message)
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Listing not found" })
    }
    res.status(500).send("Server error")
  }
})

module.exports = router
