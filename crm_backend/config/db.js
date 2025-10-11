import mongoose from "mongoose"

const connectDB= async()=>{
    try {
        await mongoose.connect("mongodb+srv://ghar_se_faraar:ghar_se_faraar@cluster0.hpoanc8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Connected to DB!")
    } catch (error) {
        console.log("Failed to connect" , error)
    }
}

export default connectDB