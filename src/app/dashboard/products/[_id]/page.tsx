import DashboardComponent from "@/app/components/DashboardComponent";
import HeaderComponent from "@/app/components/HeaderComponent";
import Product from "@/models/product";
import dayjs from "dayjs";

function priceFormater(number: number): string {
  return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default async function GetId({ params }: any) {
  // console.log("Parâmetros recebidos:", params);
  const { _id } = params;
  // console.log("Produto ID:", _id);

  try {
    const productData = await Product.findById(_id);
    console.log("Valor retornado: ", productData.name);

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
            <p className="title-product-id">Produto: {productData.name}</p>
            <div className="product-info">
              <div className="product-price-info">
                <p>Preço: {typeof productData.price === 'number' ? priceFormater(productData.price) : 'Preço indisponível'}</p>
              </div>

              <div className="product-manufacturer-info">
                <p>Fabricante: {productData.manufacturer}</p>
              </div>

              <div className="product-quantity-info">
                <p>Quantidade: {productData.quantity} unid.</p>
              </div>
            </div>
            <p className="product-manufacturer">Fabricado em: {dayjs(productData.manufacturingDate).format("DD/MM/YYYY")}</p>
            <p className="product-manufacturer">Válido até: {dayjs(productData.dueDate).format("DD/MM/YYYY")}</p>

            <div className="container-btn-product">
              <button className="update-btn"><i className="bi bi-pencil-square"></i></button>
              <button className="remove-btn"><i className="bi bi-trash"></i></button>
            </div>
          </div>
        </DashboardComponent>

      </>
    );
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
  }
}
