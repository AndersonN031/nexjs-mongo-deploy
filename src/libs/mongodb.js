import mongoose from "mongoose";

export default function connectDB() {
    return mongoose.connect(process.env.MONGODB_URL, {
        serverSelectionTimeoutMS: 30000, // 30s
        socketTimeoutMS: 45000, // 45s
    }).then(() => {
        console.log("MongoDB connected successfully");
    }).catch(err => {
        console.error("MongoDB connection error:", err);
    });
}