import DashboardComponent, { fetchProducts } from "@/app/components/DashboardComponent";
import dayjs from "dayjs";
import Link from "next/link";
import { priceFormater } from "../products/page";


export default async function LowStockProduct() {
    const products = await fetchProducts();
    const lowStockProducts = products.filter(product => product.quantity <= 10);

    return (
        <>
            <DashboardComponent>
                <div className="table-container">
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Preço Unid.</th>
                                <th>Fabricante</th>
                                <th>Quantidade</th>
                                <th>Fabricado</th>
                                <th>Validade</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lowStockProducts.map((product, i) => (
                                <tr key={i}>
                                    <td>{product.name}</td>
                                    <td>{typeof product.price === 'number' ? priceFormater(product.price) : 'Preço indisponível'}</td>
                                    <td>{product.manufacturer}</td>
                                    <td>{product.quantity}</td>
                                    <td>{dayjs(product.manufacturingDate).format('DD-MM-YYYY')}</td>
                                    <td>{dayjs(product.dueDate).format('DD-MM-YYYY')}</td>
                                    <td className="td-btn">
                                        <Link href={`/dashboard/products/${product._id}`} legacyBehavior>
                                            <button className="show-btn"><i className="bi bi-eye"></i></button>
                                        </Link>

                                        <Link href={`/dashboard/updateProduct/${product._id}`} legacyBehavior>
                                            <button className="update-btn"><i className="bi bi-pencil-square"></i></button>
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