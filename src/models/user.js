import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: String,
    age: String
})

export default mongoose.models.User || mongoose.model('User', schema)