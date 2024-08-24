import userModel from "../models/userModel.js"

//add items to user cart
const addToCart = async (req,res) =>{
    try {
        let userData = await userModel.findById(req.body.userId);//user id should be same as req.body.userId that we got using authmiddleware
        // console.log(userData);
        let cartData = await userData.cartData;//user cart data stored in this
        if(!cartData[req.body.itemId])
        { //if there is no entry in the cart for this Item id
            cartData[req.body.itemId] = 1;
        }else{//means that ,that item is present
            cartData[req.body.itemId] +=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});//finds by this id and updated cartData
        res.json({success:true,message:"Added to cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

//remove items from user cart
const removeFromCart = async (req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        // console.log(userData);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -=1; 
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed from cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

//fetch user cart data
const getCart = async (req,res) =>{
    try {
        let userData = await userModel.findById(req.body.userId);//user id should be same as req.body.userId that we got using authmiddleware
        // console.log(userData);
        let cartData = await userData.cartData;//user cart data stored in this
        res.json({success:true,cartData});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

export {addToCart,removeFromCart,getCart}