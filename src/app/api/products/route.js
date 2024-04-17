import { NextResponse } from "next/server";
import connectDB from "../../../libs/mongodb";
import Product from "@/models/product";

export async function GET() {
    await connectDB()
    const products = await Product.find()
    return NextResponse.json(products)

}

export async function POST(request) {
    await connectDB()
    const data = await request.json()

    const products = await Product.create(data)
    return NextResponse.json(products)
}
