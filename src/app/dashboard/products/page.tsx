
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
                                        <button className="show-btn"><i className="bi bi-eye"></i></button>
                                        <button className="update-btn"><i className="bi bi-pencil-square"></i></button>
                                        <button className="remove-btn"><i className="bi bi-trash"></i></button>

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

