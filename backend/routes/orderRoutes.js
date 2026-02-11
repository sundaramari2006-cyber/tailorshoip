const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const PDFDocument = require("pdfkit");

// Add Order
router.post("/add", async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json(newOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
});

// Get Orders by Email
router.get("/:email", async (req, res) => {
  try {
    const orders = await Order.find({ userEmail: req.params.email });
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
});

// Generate PDF Bill (FIXED)
router.get("/bill/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || id === "undefined") {
      return res.status(400).send("Invalid ID");
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).send("Order not found");
    }

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename=bill-${order._id}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(20).text("Tailor Shop Bill");
    doc.moveDown();
    doc.text(`Customer: ${order.customerName}`);
    doc.text(`Dress Type: ${order.dressType}`);
    doc.text(`Amount: ₹${order.amount}`);
    doc.text(`Date: ${new Date(order.date).toDateString()}`);

    doc.end();

  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
