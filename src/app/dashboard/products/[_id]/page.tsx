"use client"
import DashboardComponent from "@/app/components/DashboardComponent";
import HeaderComponent from "@/app/components/HeaderComponent";
import axios from "axios";
import dayjs from "dayjs";

function priceFormater(number: number): string {
  return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default async function GetId({ params }: any) {
  const { _id } = params;

  async function removeProduct(productId: any) {
    try {
      const response = await axios.delete(`https://nexjs-mongo-deploy.vercel.app/api/products/${productId}`)
      if (response.status === 200) {
        alert("Product removed successfully")
        window.location.href = "/dashboard/products"
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      alert("Error removing product")
    }
  }

  try {
    const response = await axios.get(`https://nexjs-mongo-deploy.vercel.app/api/products/${_id}`)
    const productData = response.data;
    console.log("Valor retornado: ", productData.product.name);


    if (!productData) {
      console.error("Nenhum produto encontrado com o ID:", _id);
      return (
        <>
          <h1>Produto não encontrado</h1>
        </>
      );
    }


    return (
      <>
        <HeaderComponent />
        <DashboardComponent>
          <div className="container-product-id">
            <p className="title-product-id">Produto: {productData.product.name}</p>
            <div className="product-info">
              <div className="product-price-info">
                <p>Preço: {typeof productData.product.price === 'number' ? priceFormater(productData.product.price) : 'Preço indisponível'}</p>
              </div>

              <div className="product-manufacturer-info">
                <p>Fabricante: {productData.product.manufacturer}</p>
              </div>

              <div className="product-quantity-info">
                <p>Quantidade: {productData.product.quantity} unid.</p>
              </div>
            </div>
            <p className="product-manufacturer">Fabricado em: {dayjs(productData.product.manufacturingDate).format("DD/MM/YYYY")}</p>
            <p className="product-manufacturer">Válido até: {dayjs(productData.product.dueDate).format("DD/MM/YYYY")}</p>

            <div className="container-btn-product">

              <button className="update-btn"><i className="bi bi-pencil-square"></i></button>

              <button className="remove-btn" onClick={() => removeProduct(productData.product._id)}>
                <i className="bi bi-pencil-square"></i>
              </button>

            </div>
          </div>
        </DashboardComponent>

      </>
    );
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
  }
}
