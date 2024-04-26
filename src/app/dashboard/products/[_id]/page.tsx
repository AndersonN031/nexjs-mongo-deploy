"use client"
import DashboardComponent from "@/app/components/DashboardComponent";
import HeaderComponent from "@/app/components/HeaderComponent";
import axios from "axios";
import dayjs from "dayjs";
import Link from "next/link"

function priceFormater(number: number): string {
  return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

// criando uma rota dinâmica para exibir o produto e suas informações
export default async function GetId({ params }: any) {
  // desestruturando o id; IMPORTANTE passar ele como _id e não apenas como id.
  const { _id } = params;

  // criando um metodo para deletar o produto passando o _id do mesmo.
  async function removeProduct(productId: any) {
    try {
      const response = await axios.delete(`https://nexjs-mongo-deploy.vercel.app/api/products/${productId}`)

      // const response = await axios.delete(`http://localhost:3000/api/products/${productId}`)
      // verificando se ocorreu tudo bem então retornando para a rota /dashboard/products
      if (response.status === 200) {
        alert("Product removed successfully")
        window.location.href = "/dashboard/products"
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      alert("Error removing product")
    }
  }


  // tratando o metodo get da api para retornar a rota dinâmica atráves do _id
  try {
    const response = await axios.get(`https://nexjs-mongo-deploy.vercel.app/api/products/${_id}`)

    // const response = await axios.get(`http://localhost:3000/api/products/${_id}`)
    const productData = response.data;
    console.log("Valor retornado: ", productData.product.name);

    // verificando se o produto ainda existe

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

              <button className="remove-btn" onClick={() => removeProduct(productData.product._id)}>
                <i className="bi bi-trash-fill"></i>
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
