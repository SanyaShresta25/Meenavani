/**
 * Alert Model
 * Defines the schema for safety and market alerts
 */

const mongoose = require("mongoose")

const AlertSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["warning", "danger", "info"],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  validUntil: {
    type: String,
    required: true,
  },
  severity: {
    type: String,
    enum: ["Low", "Moderate", "High"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Alert", AlertSchema)
