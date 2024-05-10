"use client"
import HeaderComponent from "@/app/components/HeaderComponent";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

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
        const fetchData = async () => {
            const response = await axios.get(`https://nexjs-mongo-deploy.vercel.app/api/products/${_id}`);
            // const response = await axios.get(`http://localhost:3000/api/products/${_id}`);
            setProduct(response.data.product);
        };
        fetchData();
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
        try {
            const response = await axios.put(`https://nexjs-mongo-deploy.vercel.app/api/products/${_id}`, product);
            // const response = await axios.put(`http://localhost:3000/api/products/${_id}`, product);

            notifyUpdated()
            setTimeout(() => {
                window.location.href = `/dashboard/products/${_id}`
            }, 2000)
            console.log(response.data);
        } catch (error) {
            // console.error('Erro ao atualizar o produto', error);
            alert('Falha ao atualizar o produto.');
        }
    };

    return (
        <>
            <HeaderComponent />

            <div>
                <form onSubmit={e => {
                    e.preventDefault();
                    updateProduct();
                }}>
                    <div className="container-form">
                        <div className="form-input">
                            <label>Nome:</label>
                            <input
                                type="text"
                                name="name"
                                value={product.name}
                                onChange={handleChange}
                                className="input-form"
                            />
                        </div>
                        <div className="form-input">
                            <label>Preço:</label>
                            <input
                                type="number"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                                className="input-form"
                            />
                        </div>
                        <div className="form-input">
                            <label>Fabricante:</label>
                            <input
                                type="text"
                                name="manufacturer"
                                value={product.manufacturer}
                                onChange={handleChange}
                                className="input-form"
                            />
                        </div>
                        <div>
                            <label>Quantidade:</label>
                            <input
                                type="number"
                                name="quantity"
                                value={product.quantity}
                                onChange={handleChange}
                                className="input-form"
                            />
                        </div>
                        <div className="form-input">
                            <label>Data de Fabricação:</label>
                            <input
                                type="date"
                                name="manufacturingDate"
                                value={product.manufacturingDate}
                                onChange={handleChange}
                                className="input-form"
                            />
                        </div>
                        <div className="form-input">
                            <label>Data de Validade:</label>
                            <input
                                type="date"
                                name="dueDate"
                                value={product.dueDate}
                                onChange={handleChange}
                                className="input-form"
                            />
                        </div>
                        <button type="submit" className="btn-save">Salvar</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </>
    );
}
