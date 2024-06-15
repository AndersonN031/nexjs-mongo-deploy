import 'bootstrap-icons/font/bootstrap-icons.css';
import MenuComponent from "../menu/MenuComponent"
import { fetchProducts } from '../../services/productService';
import style from "./style.module.css"

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

    function numberFormater(number) {
        return new Intl.NumberFormat('pt-BR').format(number);
    }

    return (
        <>
            <MenuComponent>
                <div className={`grid-dashboard ${style.gridDashboard}`}>

                    <div className={`show-info ${style.showInfo}`}>

                        <div className="container-dashboard">
                            <div className="div-dashboard-user">
                                <p className={`dashboard-user ${style.dashboardUser}`}>Dashboard User</p>
                            </div>
                            <div className={`row ${style.row}`}>
                                <div className="card total-in-stock">
                                    <div className={`container-title-card ${style.containerTitleCard}`}>
                                        <p className={`title-card ${style.titleCard}`}>Valor total em estoque</p>
                                        <i className="bi bi-currency-dollar"></i>
                                    </div>
                                    <p className={`number-card flexible-text ${style.numberCard}`}>{priceFormater(totalInventoryValue)}</p>
                                </div>
                                <div className={`card ${style.card}`}>
                                    <div className={`container-title-card-white ${style.containerTitleCardWhite}`}>
                                        <p className={`title-card ${style.titleCard}`}>Diversidade de produtos</p>
                                        <i className="bi bi-boxes"></i>

                                    </div>
                                    <p className={`number-card ${style.numberCard}`}>{numberFormater(products.length)}</p>
                                </div>
                                <div className={`card ${style.card}`}>
                                    <div className={`container-title-card-white ${style.containerTitleCardWhite}`}>
                                        <p className={`title-card ${style.titleCard}`}>Inventário Total</p>
                                        <i className="bi bi-box"></i>
                                    </div>
                                    <p className={`number-card ${style.numberCard}`}>{numberFormater(totalInventory)}</p>
                                </div>
                                <div className={`card ${style.card}`}>
                                    <div className={`container-title-card-white ${style.containerTitleCardWhite}`}>
                                        <p className={`title-card ${style.titleCard}`}>Produtos Acabando</p>
                                        <i className="bi bi-exclamation-triangle"></i>
                                    </div>
                                    <p className={`number-card ${style.numberCard}`}>{numberFormater(productsRunningOut.length)}</p>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            </MenuComponent>

        </>
    );
}
