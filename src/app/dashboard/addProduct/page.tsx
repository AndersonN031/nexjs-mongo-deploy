"use client"

import { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        try {
            // POST para a rota /api/products onde contém nosso GET e POST
            const response = await axios.post('/api/products', {
                name: productName,
                price: productPrice
            });

            console.log('Produto adicionado:', response.data);

            // Limpa os campos após o envio bem-sucedido
            setProductName('');
            setProductPrice('');
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="productName">Nome do Produto:</label>
                <input
                    type="text"
                    id="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="productPrice">Preço do Produto:</label>
                <input
                    type="number"
                    id="productPrice"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Adicionar Produto</button>
        </form>
    );
};

export default ProductForm;
