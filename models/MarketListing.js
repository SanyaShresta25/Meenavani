/**
 * Market Listing Model
 * Defines the schema for fish market listings
 */

const mongoose = require("mongoose")

const MarketListingSchema = new mongoose.Schema({
  fisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fisherName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  fish: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  contact: {
    type: String,
    default: "",
  },
  fresh: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("MarketListing", MarketListingSchema)
