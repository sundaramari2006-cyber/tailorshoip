const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: String,
  dressType: String,
  amount: Number,
  userEmail: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);
