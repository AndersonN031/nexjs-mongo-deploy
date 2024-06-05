import 'bootstrap-icons/font/bootstrap-icons.css';
import MenuComponent from "./MenuComponent"
import { fetchProducts } from '../services/productService';

// chamando a api utilizando o get


export default async function DashboardComponent() {
    //passando os dados do fetchProducts para a const products
    const products = await fetchProducts()


    // metodos para exibir dados no dashboard
    const totalInventory = products.reduce((total, product) => total + product.quantity, 0);
    const productsRunningOut = products.filter(product => product.quantity <= 10);
    const totalInventoryValue = products.reduce((total, product) => total + product.price * product.quantity, 0);

    function priceFormater(number) {
        return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    return (
        <>
            <MenuComponent>
                <div className="grid-dashboard">

                    <div className="show-status">
                        {/* <div className="wrapper"> */}
                        <div className="container-dashboard">
                            <div className="div-dashboard-user">
                                <p className="dashboard-user">Dashboard User</p>
                            </div>
                            <div className="row">
                                <div className="card total-in-stock">
                                    <div className="container-title-card">
                                        <p className="title-card">Valor total em estoque</p>
                                        <i className="bi bi-currency-dollar"></i>
                                    </div>
                                    <p className="number-card flexible-text">{priceFormater(totalInventoryValue)}</p>
                                </div>
                                <div className="card">
                                    <div className="container-title-card-white">
                                        <p className="title-card">Diversidade de produtos</p>
                                        <i className="bi bi-boxes"></i>

                                    </div>
                                    <p className="number-card">{products.length}</p>
                                </div>
                                <div className="card">
                                    <div className="container-title-card-white">
                                        <p className="title-card">Inventário Total</p>
                                        <i className="bi bi-box"></i>
                                    </div>
                                    <p className="number-card">{totalInventory}</p>
                                </div>
                                <div className="card">
                                    <div className="container-title-card-white">
                                        <p className="title-card">Produtos Acabando</p>
                                        <i className="bi bi-exclamation-triangle"></i>
                                    </div>
                                    <p className="number-card">{productsRunningOut.length}</p>
                                </div>
                            </div>
                        </div>

                        {/* </div> */}

                    </div>
                </div>
            </MenuComponent>

        </>
    );
}
