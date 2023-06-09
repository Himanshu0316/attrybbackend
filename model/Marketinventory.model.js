const mongoose = require('mongoose');
require('dotenv').config()

const marketInventorySchema = mongoose.Schema({
  image: { type: String, required: true }, 
  title: { type: String, required: true }, 
  description: { type: [String], required: true },
  kmsOnOdometer: { type: Number, required: true }, 
  majorScratches: { type: Boolean, default: false }, 
  originalPaint: { type: Boolean, default: true }, 
  accidentsReported: { type: Number, default: 0 }, 
  previousBuyers: { type: Number, default: 0 }, 
  registrationPlace: { type: String, required: true }, 
  currentPrice: { type: Number, default: 0 }, 
  dealer: { type: mongoose.Schema.Types.ObjectId, ref: 'Dealer' }, 
  oemSpecs: { type: mongoose.Schema.Types.ObjectId, ref: 'Oemmodel' }
},{versionKey:false});

marketInventorySchema.index({ title: "text", description: "text" });

const MarketInventoryModel = mongoose.model('MarketInventory', marketInventorySchema);

module.exports = {MarketInventoryModel};