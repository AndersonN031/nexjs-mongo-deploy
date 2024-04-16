import mongoose from "mongoose";

export default async function connectDB() {
    await mongoose.connect(process.env.MONGODB_URL, {
        serverSelectionTimeoutMS: 30000, // 30s
        socketTimeoutMS: 45000, // 45s
    })
}