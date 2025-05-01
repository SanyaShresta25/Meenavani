/**
 * Fish Model
 * Defines the schema for fish species data
 */

const mongoose = require("mongoose")

const FishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  scientificName: {
    type: String,
    required: true,
  },
  localName: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  season: {
    type: String,
    default: "",
  },
  habitat: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  sustainability: {
    type: String,
    default: "",
  },
  nutritionalValue: {
    type: String,
    default: "",
  },
  cookingMethods: {
    type: [String],
    default: [],
  },
  averagePrice: {
    type: String,
    default: "",
  },
  tags: {
    type: [String],
    default: [],
  },
})

module.exports = mongoose.model("Fish", FishSchema)
