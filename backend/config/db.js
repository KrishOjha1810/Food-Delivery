import mongoose from "mongoose"

export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://krishojha:voimPM7HjDRQ1nXn@cluster.4xbm6l0.mongodb.net/TOMATO').then(()=> console.log('DB CONNECTED'));
}