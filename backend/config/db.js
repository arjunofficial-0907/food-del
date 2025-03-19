import mongoose from "mongoose";


 export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://official000abc:334455@cluster0.dcrm7.mongodb.net/food-del').then(()=>console.log("DB Connected"))
}