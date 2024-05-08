import DashboardComponent, { fetchProducts } from "@/app/components/DashboardComponent";
import dayjs from "dayjs";
import Link from "next/link";


// deixando a rota dinâmica para ser atualizada assim que alguma chamada HTTP for feita
export const dynamic = 'force-dynamic';


export function priceFormater(number: number): string {
    return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// criando uma table para exibir todos os produtos da API
export default async function ShowProductInTable() {
    let products = await fetchProducts()

    return (
        <>
            <DashboardComponent>
                <div className="product-container">
                    {products.map((product: any, i: any) => (
                        <div className="product-card" key={i}>
                            <div className="product-info">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-price">{typeof product.price === 'number' ? priceFormater(product.price) : 'Preço indisponível'}</p>
                                <div className="product-details">
                                    <p><span>Fabricante:</span> {product.manufacturer}</p>
                                    <p><span>Quantidade:</span> {product.quantity}</p>
                                    <p><span>Fabricado:</span> {dayjs(product.manufacturingDate).format('DD-MM-YYYY')}</p>
                                    <p><span>Validade:</span> {dayjs(product.dueDate).format('DD-MM-YYYY')}</p>
                                </div>
                            </div>
                            <div className="product-actions">
                                <Link href={`/dashboard/products/${product._id}`} legacyBehavior>
                                    <button className="show-btn"><i className="bi bi-eye"></i></button>
                                </Link>
                                <Link href={`/dashboard/updateProduct/${product._id}`} legacyBehavior>
                                    <button className="update-btn"><i className="bi bi-pencil-square"></i></button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>


            </DashboardComponent>
        </>
    )
}
