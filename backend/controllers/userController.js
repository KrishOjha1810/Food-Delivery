import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; //for encryption of password
import validator from "validator"; //to validate email is correct or not

// login user
const loginUser = async (req, res) => {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});//if there exists a user with that email information gets stored in user variable
        if(!user){
            return res.json({success:false,message:"User doesn't exists"});
        }

        const isMatch = await bcrypt.compare(password,user.password);//comapning the password entered now by request.body and previous password given by user
        if(!isMatch){
            return res.json({success:false,message:"Invalid Credentials"});
        }

        const token = createToken(user._id);//when password matches we'll generate a token
        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
};

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// register user
const registerUser = async (req, res) => {
    // destructuring name email password from the request body
    const { name, password, email } = req.body;
    try {
        const exists = await userModel.findOne({ email }); // check if email already exists
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong Password" });
        }

        // encryption of Password by hashing and salting
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({ // creating new user using userModel
            name: name,
            email: email,
            password: hashedPassword
        });

        const user = await newUser.save(); // Save the user
        const token = createToken(user._id); // generating token using id
        res.json({ success: true, token }); // sending token in json format 
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { loginUser, registerUser };
