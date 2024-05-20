// Criando um controller para gerenciar a lógica do service
import { deleteProduct, getProductId, updateProduct } from "../services/productService"


export const fetchProductData = async (id: string, setProduct: Function) => {
    try {
        const product = await getProductId(id);
        setProduct(product);
    } catch (error) {
        console.error('Erro ao carregar o produto', error);
    }
}

export const handleUpdateProduct = async (id: string, product: any, notifyUpdated: Function) => {
    try {
        await updateProduct(id, product);
        notifyUpdated();
        setTimeout(() => {
            window.location.href = `/dashboard/products/${id}`
        }, 1000);
    } catch (error) {
        console.log('Erro ao atualizar o produto', error);
    }
};


export const handleDeleteProduct = async (id: string, notifyDelete: Function) => {
    try {
        await deleteProduct(id);
        notifyDelete();
        setTimeout(() => {
            window.location.href = '/dashboard/products';
        }, 2000)
    } catch (error) {
        console.error('Erro ao deletar o produto', error);
    }
}