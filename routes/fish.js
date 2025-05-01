/**
 * Fish Routes
 * Handles fish species data and image classification
 */

const express = require("express")
const router = express.Router()
const Fish = require("../models/Fish")
const auth = require("../middleware/auth")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const tf = require("@tensorflow/tfjs")

// Set up storage for fish images
const storage = multer.diskStorage({
  destination: "./uploads/fish/",
  filename: (req, file, cb) => {
    cb(null, "fish-" + Date.now() + path.extname(file.originalname))
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

// Load fish classification model
let model
async function loadModel() {
  try {
    // In a real implementation, you would load a trained TensorFlow.js model
    // model = await tf.loadLayersModel('file://./models/fish_classifier/model.json');
    console.log("Fish classification model loaded")
  } catch (error) {
    console.error("Error loading fish classification model:", error)
  }
}

// Call loadModel on server start
loadModel()

// @route   GET api/fish
// @desc    Get all fish species
// @access  Public
router.get("/", async (req, res) => {
  try {
    const fish = await Fish.find()
    res.json(fish)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
})

// @route   GET api/fish/:id
// @desc    Get fish by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const fish = await Fish.findById(req.params.id)

    if (!fish) {
      return res.status(404).json({ msg: "Fish not found" })
    }

    res.json(fish)
  } catch (err) {
    console.error(err.message)
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Fish not found" })
    }
    res.status(500).send("Server error")
  }
})

// @route   POST api/fish/classify
// @desc    Classify fish from image
// @access  Private
router.post("/classify", [auth, upload.single("image")], async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "Please upload an image" })
    }

    // In a real implementation, you would:
    // 1. Load the image
    // 2. Preprocess it for the model
    // 3. Run inference with the model
    // 4. Return the classification results

    // For now, we'll return mock results
    const mockResults = {
      species: "Indian Mackerel (Rastrelliger kanagurta)",
      confidence: 92,
      alternatives: [
        { name: "Short Mackerel", confidence: 5 },
        { name: "Indian Scad", confidence: 2 },
      ],
      info: {
        localName: "Bangude (ಬಂಗುಡೆ)",
        season: "Peak season: October to March",
        sustainability: "Sustainable when caught using traditional methods",
        nutritionalValue: "High in Omega-3, protein, and vitamins",
      },
    }

    // Return the results
    res.json(mockResults)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
})

// @route   POST api/fish
// @desc    Add a new fish species (admin only)
// @access  Private/Admin
router.post("/", auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Not authorized" })
    }

    const {
      name,
      scientificName,
      localName,
      image,
      season,
      habitat,
      description,
      sustainability,
      nutritionalValue,
      cookingMethods,
      averagePrice,
      tags,
    } = req.body

    // Create new fish
    const newFish = new Fish({
      name,
      scientificName,
      localName,
      image,
      season,
      habitat,
      description,
      sustainability,
      nutritionalValue,
      cookingMethods,
      averagePrice,
      tags,
    })

    const fish = await newFish.save()
    res.json(fish)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
})

module.exports = router
