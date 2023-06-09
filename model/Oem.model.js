const mongoose = require('mongoose');
require('dotenv').config()

const oemSchema = mongoose.Schema({
  model: { type: String },
  year: { type: String },
  listPrice: { type: Number },
  availableColors: { type: [String] },
  mileage: { type: Number },
  power: { type: Number },
  maxSpeed: { type: Number }
},{versionKey:false});

oemSchema.index({ model: "text", year: "text" });

const OemModel = mongoose.model('Oemmodel', oemSchema);

module.exports = {OemModel};