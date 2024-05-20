require('dotenv').config();
import axios from "axios";

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL

export async function fetchProducts() {
    try {
        const response = await axios.get(BaseUrl)
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        return []; // Retorna um array vazio em caso de erro
    }
}

export const getProducts = async () => {
    const response = await axios.get(BaseUrl);
    return response.data;
};

export const getProductId = async (id: string) => {
    const response = await axios.get(`${BaseUrl}/${id}`)
    return response.data.product
}

//Configuração de adicionar produtos

export const addProduct = async (product: any) => {
    const response = await axios.post(BaseUrl, product)
    return response.data;
}


// Configuração de chamada PUT
export const updateProduct = async (id: string, product: any) => {
    const response = await axios.put(`${BaseUrl}/${id}`, product)
    return response.data;
}

// Configuração de chamada DELETE
export const deleteProduct = async (id: string) => {
    const response = await axios.delete(`${BaseUrl}/${id}`)
    console.log(`ID do produto: ${response} `)
    return response.data;
}
