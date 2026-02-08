const express=require("express");
const PDFDocument=require("pdfkit");
const Order=require("../models/Order");

const router=express.Router();

router.post("/add",async(req,res)=>{
    await Order.create(req.body);
    res.json("Order Added")
})

router.get("/:email",async(req,res)=>{
    const orders=await Order.findOne({UserEmail:req.params.eamil});
    res.json("orders");
})

router.get("/bill/:id",async(req,res)=>{
    const order=await Order.findOne(req.params.id);

    const doc=new PDFDocument();
    res.setHeader("Content-Type","application/pdf")
    doc.pipe(res);

    doc.fontSize(20).text("Tailor Shop Bill");
    doc.moveDown();
    doc.text(`Customer:${order.customerName}`);
    doc.text(`Dress Type: ${order.dressType}`);
    doc.text(`Amount:${order.amount}`)
    doc.text(`Date:${order.date.toDateString()}`)
    doc.end();
})

module.export=router;