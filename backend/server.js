import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoutes.js"
import userRouter from "./routes/userRouters.js"
import 'dotenv/config.js'
import cartRouter from "./routes/cartRouters.js"
import orderRouter from "./routes/orderRouters.js"

// app config
const app = express()
const PORT = process.env.PORT || 1303

//middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB()


//api endPoint

app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user" ,userRouter)
app.use("/api/cart",cartRouter) 
app.use("/api/order",orderRouter)


app.get("/",(req,res)=>{ 
    res.send("API Working Perfectly")
})


app.listen(PORT,()=>{
    console.log(`Server Running On http://localhost:${PORT}`)
})

