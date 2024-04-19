
import DashboardComponent from "@/app/components/DashboardComponent";
import HeaderComponent from "@/app/components/HeaderComponent";
import connectDB from "@/libs/mongodb"
import Product from "@/models/product"
import dayjs from "dayjs"

export const dynamic = 'force-dynamic';

export async function loadUsers() {
    await connectDB()
    const products = await Product.find()
    return products
}

function priceFormater(number: number): string {
    return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
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
                            <p>{typeof product.price === 'number' ? priceFormater(product.price) : 'Preço indisponível'} </p>
                            <p>Fabricante: {product.manufacturer}</p>
                            <p>Quantidade: {product.quantity}</p>
                            <p>Fabricado: {dayjs(product.manufacturingDate).format('DD-MM-YYYY')}</p>
                            <p>Validade: {dayjs(product.dueDate).format('DD-MM-YYYY')}</p>

                        </div>
                    ))}
                </div>

            </DashboardComponent>
        </>
    )
}
