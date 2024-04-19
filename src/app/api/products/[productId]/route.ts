import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {
    const { params } = context;
    try {
        const product = await Product.findById(params.productId);

        return NextResponse.json({
            product,
        })
    } catch (error) {
        console.error({ error: "Não foi possivel encontrar o produto." })
    }
}

export async function DELETE(request: Request, context: any) {
    const { params } = context;

    try {
        const product = await Product.findByIdAndDelete(params.productId)
        if (!product) {
            return new NextResponse("produto não encontrado!")
        }
        return NextResponse.json({
            product,
        })
    } catch (error) {
        console.error({ error: "Não foi possivel deletar o produto." })
    }
} 