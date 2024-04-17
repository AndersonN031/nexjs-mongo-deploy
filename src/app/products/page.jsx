
import connectDB from "@/libs/mongodb"
import Product from "@/models/product"
import Form from "../components/form";

export const dynamic = 'force-dynamic';

async function loadUsers() {
    await connectDB()
    const products = await Product.find()
    return products
}


export default async function Home() {
    const products = await loadUsers()
    console.log(products)
    const collectionName = Product.collection.name
    console.log("Nome da coleção: ", collectionName)
    return (
        <div>
            <h1>Produtos</h1>
            <Form />
            {products.map((product, i) => (
                <div key={i}>
                    <p>Nome :{product.name}</p>
                    <p>R$: {product.price} </p>
                </div>
            ))}
        </div>
    )
}

