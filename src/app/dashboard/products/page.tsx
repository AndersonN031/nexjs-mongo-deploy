import 'bootstrap-icons/font/bootstrap-icons.css';
import MenuComponent from "@/app/components/MenuComponent";
import { fetchProducts } from "@/app/services/productService";
import dayjs from "dayjs";
import Link from "next/link";
import LayoutAdmin from '@/app/components/LayoutAdminComponente';
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
            <LayoutAdmin>
                <MenuComponent>
                    <div className="product-container">
                        {products.map((product: any, i: any) => (
                            <div className="product-card" key={i}>
                                <div className="product-info">
                                    <h3 className="product-name">{product.name}</h3>
                                    <p className="product-price">{typeof product.price === 'number' ? priceFormater(product.price) : 'Preço indisponível'}</p>
                                    <div className="product-details">
                                        <p><span>Fabricante:</span> {product.manufacturer}</p>
                                        <p><span>Quantidade:</span> {product.quantity}</p>
                                        <p>Fab: <span className="text-fab">{dayjs(product.manufacturingDate).format('DD/MM/YYYY')}</span></p>
                                        <p>Val: <span className="text-val">{dayjs(product.dueDate).format('DD-MM-YYYY')}</span></p>
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
                </MenuComponent>

            </LayoutAdmin>


        </>
    )
}
