// app/api/products/route.ts
import { NextResponse } from "next/server";
import connectDB from "../../../libs/mongodb";
import Product from "@/models/product";

// endpoint GET de todas informações da API
// Usando o GET no nome na function,o nextjs(14.2.1) reconhece automaticamente que é um endpoint GET
export async function GET() {
    await connectDB()
    const products = await Product.find()
    return NextResponse.json(products)

}

// endpoint POST para postar um novo product
// Usando o GET no nome na function,o nextjs(14.2.1) reconhece automaticamente que é um endpoint POST
export async function POST(request: Request) {
    await connectDB()
    const data = await request.json()

    const products = await Product.create(data)
    return NextResponse.json(products)
}

export async function PUT(request: Request) {
    const body = await request.json();
    return NextResponse.json({message: body})
}