import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';
import Stripe from 'stripe';

// For getting this stripe String we have to visit Stripe official website and create an account. 
// In our home page, we find the secret key.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order from frontend
const placeOrder = async (req, res) => {
  console.log("placeOrder api called");
  
  const frontend_url = process.env.FRONTEND_URL || "http://localhost:5173";

  console.log("Request Body:", req.body);

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    console.log("New Order to Save:", newOrder);

    await newOrder.save(); // Saving the newOrder in the database
    console.log("Order saved successfully");

    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: { 
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: 'payment',
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.log("Error placing order:", error);
    res.json({ success: false, message: "Error placing order" });
  }
};


const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") { // Corrected comparison operator
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error verifying order" });
  }
};


//user orders for frontend
const userOrders = async (req, res) =>{
  try {
    const orders = await orderModel.find({userId:req.body.userId});
    res.json({success:true, data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"})
    
  }
}

//Listing orders for admin panel
const listOrders = async (req, res)=>{
  try {
    const orders = await orderModel.find({});
    res.json({success:true, data:orders});
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"})
  }
}

//api for updating order status
const updateStatus = async (req, res)=>{
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status});
    res.json({success:true, message:"Status updated"})
  } catch (error) {
      console.log(error);
      res.json({success:false, message:"Error"})
      
  }
}

export { placeOrder, verifyOrder, userOrders , listOrders, updateStatus};
