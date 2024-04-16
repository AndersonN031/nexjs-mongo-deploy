import mongoose from "mongoose";

export default function connectDB() {
    mongoose.connect("mongodb://127.0.0.1:27017")
        .then(() => {
            console.log("FINE");
        })
        .catch(() => {
            console.log("BAD");
        })
}