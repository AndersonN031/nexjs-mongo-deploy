import mongoose, { mongo } from "mongoose";

const { Schema } = mongoose

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        // createdAt: { type: Date, default: () => Date.now() },
        // updatedAt: { type: Date, default: () => Date.now() }
    },
    { timestamps: true }
)

const modelName = mongoose.models.User || mongoose.model("User", userSchema);

export default modelName;