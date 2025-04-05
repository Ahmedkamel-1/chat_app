import mongoose from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT).then(()=>console.log("DB connected successfully!")).catch((error)=>console.log(error))
    } catch (error) {
        console.log(console.error)
    }
}

export default connectDB