
import connectDB from "@/libs/mongodb"
import Product from "@/models/product"

export const dynamic = 'force-dynamic';

async function loadUsers() {
    await connectDB()
    const products = await Product.find()
    return products
}


export default async function Home() {
    const products = await loadUsers()
    console.log(products)
    return (
        <div>
            <h1>Produtos</h1>
            {products.map((product, i) => (
                <div key={i}>
                    <p>Nome :{product.name}</p>
                    <p>Idade: {product.age} anos</p>
                </div>
            ))}
        </div>
    )
}

// teste