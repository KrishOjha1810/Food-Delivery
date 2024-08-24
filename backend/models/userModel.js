//model for user
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    cartData:{type:Object,default:{}},
},{minimize:false}) //so that cartData entry can be created without any data

const userModel = mongoose.models.user || mongoose.model("user",userSchema);//if already created that will be used otherwise new model will be used
export default userModel

