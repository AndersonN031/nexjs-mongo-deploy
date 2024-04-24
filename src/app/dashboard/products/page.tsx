
import DashboardComponent from "@/app/components/DashboardComponent";
import HeaderComponent from "@/app/components/HeaderComponent";
import connectDB from "@/libs/mongodb"
import Product from "@/models/product"
import dayjs from "dayjs"
import Link from "next/link"

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
    const products = await Product.find()



    return (
        <>
            <HeaderComponent />
            <DashboardComponent>
                <div className="table-container">
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Preço</th>
                                <th>Fabricante</th>
                                <th>Quantidade</th>
                                <th>Fabricado</th>
                                <th>Validade</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, i) => (
                                <tr key={i}>
                                    <td>{product.name}</td>
                                    <td>{typeof product.price === 'number' ? priceFormater(product.price) : 'Preço indisponível'}</td>
                                    <td>{product.manufacturer}</td>
                                    <td>{product.quantity}</td>
                                    <td>{dayjs(product.manufacturingDate).format('DD-MM-YYYY')}</td>
                                    <td>{dayjs(product.dueDate).format('DD-MM-YYYY')}</td>
                                    <td className="td-btn">

                                        {/* app/dashboard/products/page.tsx */}
                                        <Link href={`/dashboard/products/${product._id}`} legacyBehavior>
                                            <button className="show-btn"><i className="bi bi-eye"></i></button>
                                        </Link>



                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </DashboardComponent>
        </>
    )
}

