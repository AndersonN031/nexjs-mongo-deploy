"use client"
import dayjs from "dayjs";
import Link from "next/link";
import { priceFormater } from "../products/page";
import MenuComponent from "@/app/components/menu/MenuComponent";
import { fetchProducts } from "@/app/services/productService";
import LayoutAdmin from "@/app/components/LayoutAdminComponente";
import { useEffect, useState } from "react";

export const dynamic = 'force-dynamic';

export default function LowStockProduct() {
    const [search, setSearch] = useState('')
    const [products, setProducts] = useState([])

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const fetchedProducts = await fetchProducts();
                setProducts(fetchedProducts);
            } catch (error) {
                console.log("Erro ao buscar produtos: ", error.message);
            }
        };

        loadProducts();
    }, []);

    const lowStockProducts = products.filter(product => product.quantity <= 10);

    const lowerSearch = search.toLowerCase()
    const filteredProducts = lowStockProducts.filter((product) =>
        product.name.toLowerCase().includes(lowerSearch)
    );

    return (
        <>
            <LayoutAdmin>
                <MenuComponent>
                    <div className='search'>
                        <input
                            type="text"
                            value={search}
                            onChange={(ev) => setSearch(ev.target.value)}
                            className="search__input"
                            placeholder="Procurar produtos"
                        />
                        <button className="search__button">
                            <svg class="search__icon" aria-hidden="true" viewBox="0 0 24 24">
                                <g>
                                    <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                                </g>
                            </svg>
                        </button>
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
                                        <p><span>Fab:</span> {dayjs(product.manufacturingDate).format('DD/MM/YYYY')}</p>
                                        <p><span>Val:</span> {dayjs(product.dueDate).format('DD-MM-YYYY')}</p>
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