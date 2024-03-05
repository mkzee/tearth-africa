import mongoose from "mongoose"

const connectDb = async (uri) => {
    try{
        await mongoose.connect(uri)
        console.log("db connected successfully")
    } catch (error) {
        console.log(error)
    }
}

export default connectDb