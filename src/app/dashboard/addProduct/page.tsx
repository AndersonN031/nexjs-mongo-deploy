"use client"

import { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [manufacturingDate, setManufacturingDate] = useState('');
    const [dueDate, setDueDate] = useState('');


    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        try {
            // POST para a rota /api/products onde contém nosso GET e POST
            const response = await axios.post('/api/products', {
                name: productName,
                price: productPrice,
                manufacturer: manufacturer,
                quantity: productQuantity,
                manufacturingDate: manufacturingDate,
                dueDate: dueDate
            });

            console.log('Produto adicionado:', response.data);


            setProductName('');
            setProductPrice('');
            setManufacturer('');
            setProductQuantity('');
            setManufacturingDate('');
            setDueDate('');
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="container-form">
                <div className="form-input">
                    <label htmlFor="productName">Nome do Produto:</label>
                    <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
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
                        required
                    />
                </div>
                <div className="form-input">
                    <label htmlFor="manufacturingDate">Fabricado:</label>
                    <input
                        type="date"
                        id="manufacturingDate"
                        value={manufacturingDate}
                        onChange={(e) => setManufacturingDate(e.target.value)}
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
                        required
                    />
                </div>
                <button className="btn-submit" type="submit">Adicionar Produto</button>
            </div>
        </form>
    );
};

export default ProductForm;
