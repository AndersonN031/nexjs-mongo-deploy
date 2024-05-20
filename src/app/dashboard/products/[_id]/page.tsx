"use client"
import MenuComponent from "@/app/components/MenuComponent";
import { fetchProductData, handleDeleteProduct } from "@/app/controllers/productController";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css'

function priceFormater(number: number) {
  return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  manufacturer: string;
  quantity: number;
  manufacturingDate: string;
  dueDate: string;
}

export default function GetId({ params }: any) {
  const { _id } = params;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProductData(_id, setProduct)
  }, [_id]);

  const removeProduct = async (productId: string) => {
    const notifyDelete = () => toast.error("Produto excluído com sucesso!", {
      position: "bottom-right",
      autoClose: 1600,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored'
    });

    try {
      await handleDeleteProduct(productId, notifyDelete);
    } catch (error) {
      console.error("Erro ao deletar o produto:", error);
    }
  };


  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* <MenuComponent> */}
      <div className="container-product-id">
        <p className="title-product-id">Produto: {product.name}</p>
        <div className="product-info">
          <div className="product-price-info">
            <p>Preço: {typeof product.price === 'number' ? priceFormater(product.price) : 'Preço indisponível'}</p>
          </div>
          <div className="product-manufacturer-info">
            <p>Fabricante: {product.manufacturer}</p>
          </div>
          <div className="product-quantity-info">
            <p>Quantidade: {product.quantity} unid.</p>
          </div>
        </div>
        <p className="product-manufacturer">Fabricado em: {dayjs(product.manufacturingDate).format("DD/MM/YYYY")}</p>
        <p className="product-manufacturer">Válido até: {dayjs(product.dueDate).format("DD/MM/YYYY")}</p>
        <div className="container-btn-product">
          <button className="remove-btn" onClick={() => removeProduct(product._id)}>
            <i className="bi bi-trash-fill"></i>
          </button>
        </div>
      </div>
      <ToastContainer />
      {/* </MenuComponent> */}
    </>
  );
}
