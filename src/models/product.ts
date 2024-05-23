// src/models/product.ts
import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    manufacturer: { type: String, required: true },
    quantity: { type: Number, required: true },
    manufacturingDate: { type: Date, required: true },
    category: { type: String, required: true},
    dueDate: { type: Date, required: true },
    createdAt: { type: Date, default: () => Date.now() }

})


export default mongoose.models.Product || mongoose.model('Product', schema)