
import DashboardComponent from "@/app/components/DashboardComponent";
import HeaderComponent from "@/app/components/HeaderComponent";
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
    return (
        <>
            <HeaderComponent />
            <DashboardComponent>
                <div>
                    <h1>Produtos</h1>
                    {products.map((product, i) => (
                        <div key={i}>
                            <p>Nome :{product.name}</p>
                            <p>R$: {product.price} </p>
                        </div>
                    ))}
                </div>

            </DashboardComponent>
        </>
    )
}

