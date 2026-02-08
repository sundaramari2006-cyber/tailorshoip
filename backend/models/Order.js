const mongoose=require("mongoose");

const OrderSchema=new mongoose.Schema({
    customerName:String,
    dressType:String,
    amount:Number,
    userEmail:String,
    date:{type:Date,default:Date.now}
});
module.exports=mongoose.model("Order",OrderSchema)