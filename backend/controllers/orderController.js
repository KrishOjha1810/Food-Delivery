import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Function to handle placing an order from the frontend
const placeOrder = async (req, res) => {
    const frontend_url = "https://food-delivery-frontend-wnrp.onrender.com/";//if in future url changes remember to change the url here  // URL for redirection after payment
    try {
        // Creating a new order in the database
        const newOrder = new orderModel({
            userId: req.body.userId, // User ID making the order
            items: req.body.items, // Items included in the order
            amount: req.body.amount, // Total amount for the order
            address: req.body.address, // Shipping address
        });

        await newOrder.save(); // Save the new order in MongoDB

        // Clear the user's cart after the order is placed
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Prepare the line items for the Stripe payment, converting to Indian Rupees
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr", // Payment currency
                product_data: {
                    name: item.name, // Product name
                },
                unit_amount: item.price * 100 * 80, // Convert price to rupees (Stripe requires amounts in cents)
            },
            quantity: item.quantity, // Quantity of the item ordered
        }));

        // Add delivery charges as a line item
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges", // Name for delivery charges
                },
                unit_amount: 2 * 100 * 80, // Delivery charges (2 dollars converted to rupees)
            },
            quantity: 1, // Quantity is 1 since it's a flat fee
        });

        // Create a Stripe checkout session with the line items
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment', // Payment mode
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`, // Redirect on success
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`, // Redirect on failure
        });

        // Respond with the session URL for redirection to Stripe payment page
        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error); // Log any errors for debugging
        res.json({ success: false, message: "Error" }); // Respond with an error message
    }
};

// Function to verify the order after payment is processed
// This is a temporary solution; using webhooks is more reliable for production
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body; // Extract orderId and payment success status from request body
    try {
        if (success === 'true') {
            // If payment is successful, update the order's payment status to true
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            console.log(`Order ${orderId} marked as paid.`); // Log the successful payment
            res.json({ success: true, message: "Paid" });
        } else if (success === 'false') {
            // If payment failed, delete the order from the database
            const deletedOrder = await orderModel.findByIdAndDelete(orderId);
            if (deletedOrder) {
                console.log(`Order ${orderId} has been deleted.`); // Log the deletion
                res.json({ success: false, message: 'Not Paid' });
            } else {
                console.log(`Order ${orderId} not found for deletion.`); // Log if order was not found
                res.json({ success: false, message: 'Order not found.' });
            }
        } else {
            console.log('Invalid success value received:', success); // Log if an unexpected success value is received
            res.json({ success: false, message: 'Invalid success value.' });
        }
    } catch (error) {
        console.error('Error during order verification:', error); // Log any errors for debugging
        res.json({ success: false, message: "Error occurred while processing the order." }); // Respond with an error message
    }
}

//user orders for frontend 
const userOrders = async(req,res) =>{
    try {
        const orders = await orderModel.find({userId:req.body.userId});//user id will come from authmiddleware
        res.json({success:true,data:orders,message:"Your Order has been Placed"}); //data will have everything id,userid,items every information,amount,address,payment status,date
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

//Listing Orders for admin panel 
const listOrders = async(req,res) =>{
    try {
        const orders = await orderModel.find({});//all the orders in this variable 
        res.json({success:true,data:orders}); 
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//api for udating order status 
const updateStatus = async (req,res) =>{  //to update status in database field 
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log();
        res.json({success:false,message:"Error"})
    }
} 

export { placeOrder, verifyOrder,userOrders,listOrders,updateStatus };
