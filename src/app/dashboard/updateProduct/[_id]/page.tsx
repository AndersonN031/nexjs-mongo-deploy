"use client"
import LayoutAdmin from "@/app/components/LayoutAdminComponente";
import MenuComponent from "@/app/components/menu/MenuComponent";
import { fetchProductData, handleUpdateProduct } from "@/app/controllers/productController";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import mediaquerie from "../../../styles/mediaqueries.module.css"
export default function UpdateProduct({ params }: any) {
    const { _id } = params;
    const [product, setProduct] = useState({
        name: '',
        price: 0,
        manufacturer: '',
        quantity: 0,
        manufacturingDate: '',
        dueDate: ''
    });

    // Função para carregar os dados do produto existente
    useEffect(() => {
        fetchProductData(_id, setProduct)
    }, [_id]);

    const notifyUpdated = () => toast.info("Produto atualizado com sucesso!", {
        position: "bottom-right",
        autoClose: 1600,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
    })

    // Função para manipular as mudanças nos inputs
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Função para atualizar o produto
    const updateProduct = async () => {
        handleUpdateProduct(_id, product, notifyUpdated)

    };

    return (
        <>
            <LayoutAdmin>
                <MenuComponent>

                    <div>
                        <form onSubmit={e => {
                            e.preventDefault();
                            updateProduct();
                        }}>
                            <div className={`container-form ${mediaquerie.containerForm}`}>
                                <div className="form-input">
                                    <label>Nome:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={product.name}
                                        onChange={handleChange}
                                        className={`input-form ${mediaquerie.inputForm}`}
                                    />
                                </div>
                                <div className="form-input">
                                    <label>Preço:</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={product.price}
                                        onChange={handleChange}
                                        className={`input-form ${mediaquerie.inputForm}`}
                                    />
                                </div>
                                <div className="form-input">
                                    <label>Fabricante:</label>
                                    <input
                                        type="text"
                                        name="manufacturer"
                                        value={product.manufacturer}
                                        onChange={handleChange}
                                        className={`input-form ${mediaquerie.inputForm}`}
                                    />
                                </div>
                                <div>
                                    <label>Quantidade:</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={product.quantity}
                                        onChange={handleChange}
                                        className={`input-form ${mediaquerie.inputForm}`}
                                    />
                                </div>
                                <div className="form-input">
                                    <label>Data de Fabricação:</label>
                                    <input
                                        type="date"
                                        name="manufacturingDate"
                                        value={product.manufacturingDate}
                                        onChange={handleChange}
                                        className={`input-form ${mediaquerie.inputForm}`}
                                    />
                                </div>
                                <div className="form-input">
                                    <label>Data de Validade:</label>
                                    <input
                                        type="date"
                                        name="dueDate"
                                        value={product.dueDate}
                                        onChange={handleChange}
                                        className={`input-form ${mediaquerie.inputForm}`}
                                    />
                                </div>
                                <button type="submit" className={`btn-save ${mediaquerie.btnSave }`}>Salvar</button>
                            </div>
                        </form>
                    </div>
                </MenuComponent>
            </LayoutAdmin>
            <ToastContainer />
        </>
    );
}
