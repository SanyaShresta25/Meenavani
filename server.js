/**
 * Meenavani - Voice of the Fishers
 * Main server file for the MERN stack application
 *
 * This server provides:
 * - API endpoints for authentication, fish data, weather, and market information
 * - MongoDB connection
 * - Express middleware setup
 * - JWT authentication
 */

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")
const dotenv = require("dotenv")
const authRoutes = require("./routes/auth")
const fishRoutes = require("./routes/fish")
const weatherRoutes = require("./routes/weather")
const marketRoutes = require("./routes/market")
const alertRoutes = require("./routes/alerts")

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(cors())

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/meenavani", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err))

// API Routes
app.use("/api/auth", authRoutes)
app.use("/api/fish", fishRoutes)
app.use("/api/weather", weatherRoutes)
app.use("/api/market", marketRoutes)
app.use("/api/alerts", alertRoutes)

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
