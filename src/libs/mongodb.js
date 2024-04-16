import mongoose from "mongoose";

export default async function connectDB() {
    await mongoose.connect(process.env.MONGODB_URL, {
        family: 4
    })

        .then(() => {
            console.log("FINE");
        })
        .catch(() => {
            console.log("BAD");
        })
}