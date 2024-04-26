// app/api/products/[productId]/route.ts
import Product from "@/models/product";
import { NextResponse } from "next/server";

// criando um GET para a API /api/products/
// Usando o GET no nome na function,o nextjs(14.2.1) reconhece automaticamente que é um endpoint GET
// Esse GET vai procurar o produto pelo ID
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


export async function PUT(request: Request, context: any) {
    const { params } = context;
    try {
        // Parsear o corpo da requisição para obter os dados para atualização
        const data = await request.json();

        // Atualizar o produto com o ID fornecido e os novos dados
        const product = await Product.findByIdAndUpdate(params.productId, data, { new: true, runValidators: true });

        // Verificar se o produto foi encontrado e atualizado
        if (!product) {
            return new Response(JSON.stringify({ error: "Produto não encontrado." }), { status: 404 });
        }

        return new Response(JSON.stringify({ product }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error("Não foi possível encontrar ou atualizar o produto.", error);
        return new Response(JSON.stringify({ error: "Erro ao processar a solicitação." }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}

// Usando o DELETE no nome na function,o nextjs(14.2.1) reconhece automaticamente que é um endpoint DELETE
// Esse DELETE vai procurar o produto pelo ID e deletar o mesmo
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

