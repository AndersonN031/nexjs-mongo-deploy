import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    manufacturer: { type: String, required: true },
    quantity: { type: Number, required: true},
    manufacturingDate: { type: Date, required: true},
    dueDate: { type: Date, required: true}

})

export default mongoose.models.Product || mongoose.model('Product', schema)