"use client"

import { useState } from 'react';
import Link from "next/link"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { addProduct } from '@/app/services/productService';
import LayoutAdmin from '@/app/components/LayoutAdminComponente';
import dayjs from 'dayjs';


const ProductForm = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [manufacturingDate, setManufacturingDate] = useState('');
    const [dueDate, setDueDate] = useState('');


    const notifySuccess = () => toast.success("Produto adicionado com sucesso!",
        {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
        }
    )

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();


        // mandando informações para o body do produto
        const newProduct = {
            name: productName,
            price: productPrice,
            manufacturer: manufacturer,
            quantity: productQuantity,
            category: productCategory,
            manufacturingDate: manufacturingDate,
            dueDate: dueDate
        };

        try {
            const response = await addProduct(newProduct)
            console.log('Produto adicionado:', response);

            setProductName('');
            setProductPrice('');
            setManufacturer('');
            setProductQuantity('');
            setProductCategory('');
            setManufacturingDate('');
            setDueDate('');
            notifySuccess()

        } catch (error) {
            console.log('Erro ao aidiconar produto: ', error)
        }

    };
    return (
        <>
            <LayoutAdmin>

                <form onSubmit={handleSubmit}>
                    <div className="container-form">
                        <div className="form-input">
                            <label htmlFor="productName">Nome do Produto:</label>
                            <input
                                type="text"
                                id="productName"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                className="input-form"
                                required
                            />
                        </div>
                        <div className="form-input">
                            <label htmlFor="productPrice">Preço de mercado:</label>
                            <input
                                type="number"
                                id="productPrice"
                                value={productPrice}
                                onChange={(e) => setProductPrice(e.target.value)}
                                className="input-form"
                                required
                            />
                        </div>
                        <div className="form-input">
                            <label htmlFor="manufacturer">Fabricante:</label>
                            <input
                                type="text"
                                id="manufacturer"
                                value={manufacturer}
                                onChange={(e) => setManufacturer(e.target.value)}
                                className="input-form"
                                required
                            />
                        </div>
                        <div className="form-input">
                            <label htmlFor="productQuantity">Quantidade:</label>
                            <input
                                type="number"
                                id="productQuantity"
                                value={productQuantity}
                                onChange={(e) => setProductQuantity(e.target.value)}
                                className="input-form"
                                required
                            />
                        </div>
                        <div className="form-input">
                            <label htmlFor="manufacturingDate">Categoria:</label>
                            <select onChange={(e) => setProductCategory(e.target.value)} required>
                                <option value="" hidden>Selecione uma opção</option>
                                <option value="Bebidas">Bebidas</option>
                                <option value="Alimentos">Alimentos</option>
                                <option value="Hortifruti">Hortifruti</option>
                                <option value="Higiene pessoal">Higiene pessoal</option>
                                <option value="Papelaria">Papelaria</option>
                                <option value="Congelados e frios">Congelados e frios</option>
                            </select>
                        </div>
                        <div className="form-input">
                            <label htmlFor="manufacturingDate">Fabricado:</label>
                            <input
                                type="date"
                                id="manufacturingDate"
                                value={manufacturingDate}
                                onChange={(e) => setManufacturingDate(e.target.value)}
                                className="input-form"
                                required
                            />
                        </div>
                        <div className="form-input">
                            <label htmlFor="dueDate">Validade:</label>
                            <input
                                type="date"
                                id="dueDate"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="input-form"
                                required
                            />
                        </div>
                        <div className="group-btn-form">
                            <button className="btn-submit" type="submit">Adicionar Produto</button>
                            <Link href="/dashboard/products" className="btn-submit-cancel">
                                Cancelar
                            </Link>
                        </div>
                    </div>
                </form>
                <ToastContainer />
            </LayoutAdmin>
        </>

    );
};

export default ProductForm;
