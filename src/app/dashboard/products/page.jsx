"use client"
import 'bootstrap-icons/font/bootstrap-icons.css';
import MenuComponent from "@/app/components/MenuComponent";
import { fetchProducts } from "@/app/services/productService";
import formatData from "../../services/formatDataService"
import Link from "next/link";
import LayoutAdmin from '@/app/components/LayoutAdminComponente';
import { useEffect, useState } from 'react';

// deixando a rota dinâmica para ser atualizada assim que alguma chamada HTTP for feita
export const dynamic = 'force-dynamic';

export function priceFormater(number) {
    return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}


// criando uma table para exibir todos os produtos da API
export default function ShowProductInTable() {
    const [busca, setBusca] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        try {
            async function loadProducts() {
                const fetchedProducts = await fetchProducts();
                setProducts(fetchedProducts);
            }

            loadProducts();
        } catch (error) {
            console.log("Erro ao procurar produtos!", error)
        }

    }, []);


    const lowerBusca = busca.toLowerCase()
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(lowerBusca)
    );

    return (
        <>
            <LayoutAdmin>
                <MenuComponent>
                    <div className='input-products'>
                        <input
                            type="text"
                            value={busca}
                            onChange={(ev) => setBusca(ev.target.value)}
                        />
                    </div>
                    <div className="product-container">
                        {filteredProducts.map((product) => (
                            <div className="product-card" key={product._id}>
                                <div className="product-info">

                                    <h3 className="product-name">{product.name}</h3>
                                    <p className="product-price">{typeof product.price === 'number' ? priceFormater(product.price) : 'Preço indisponível'}</p>
                                    <div className="product-details">
                                        <p><span>Fabricante:</span> {product.manufacturer}</p>
                                        <p><span>Quantidade:</span> {product.quantity}</p>
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
