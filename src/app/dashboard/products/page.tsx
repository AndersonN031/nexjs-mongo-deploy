import axios from "axios";
import DashboardComponent from "@/app/components/DashboardComponent";
import HeaderComponent from "@/app/components/HeaderComponent";
import dayjs from "dayjs";
import Link from "next/link";

export const dynamic = 'force-dynamic';

function priceFormater(number: number): string {
    return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default async function Home() {
    let products = [];
    try {
        const response = await axios.get('https://nexjs-mongo-deploy.vercel.app/api/products');
        products = response.data; // Certifique-se de que a API retorna a lista de produtos diretamente
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
    }


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
                            {products.map((product: any, i: any) => (
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
