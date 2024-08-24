import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config.js'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"


//app config
const app = express()
const port = process.env.PORT || 4000

// middleware
app.use(express.json()) //for parsing
app.use(cors()) // to access backend from front end

// db connection
connectDB();

//api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter)


app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})
// Debugging Middleware
app.use((req, res, next) => {
    console.log(`Received ${req.method} request on ${req.url}`);
    next();
});


//mongodb+srv://krishojha:voimPM7HjDRQ1nXn@cluster.4xbm6l0.mongodb.net/?