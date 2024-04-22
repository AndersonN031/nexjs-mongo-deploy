import 'bootstrap-icons/font/bootstrap-icons.css';
import { loadUsers } from '../dashboard/products/page.tsx';


export default async function DashboardComponent({ children }) {
    const products = await loadUsers();
    const totalIinventory = products.reduce((total, product) => total + product.quantity, 0)
    const productsRunningOut = products.filter(product => product.quantity <= 10);
    const totalInventoryProducts = products.reduce((total, product) => total + product.price, 0)

    function priceFormater(number) {
        return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }

    // console.log(itemsRunningOut)

    return (
        <>
            <div className="wrapper">

                <div className="container-dashboard">

                    <div className="row">
                        <div className="card">
                            <h1>{products.length}</h1>
                            <p>Diversidade de produtos</p>
                        </div>
                        <div className="card">
                            <h1>{totalIinventory}</h1>
                            <p>Inventário Total</p>

                        </div>
                        <div className="card">
                            <h1>{priceFormater(totalInventoryProducts)}</h1>
                            <p>Valor total em estoque</p>
                        </div>
                        <div className="card">
                            <h1>{productsRunningOut.length}</h1>
                            <p>Produtos Acabando</p>

                        </div>
                    </div>
                </div>
                <div className="grid-dashboard">
                    <div className="menu">
                        <div className="title-menu">
                            <h1>Menu</h1>
                        </div>
                        <ul>

                            <div className="input-container">
                                <form>
                                    <input type="text" placeholder="Search..." />
                                    <button type="submit"><i className="bi bi-search" aria-hidden="true"></i></button>
                                </form>
                            </div>

                            <li className='title-navigation'><p>NAVEGAÇÃO PRINCIPAL</p></li>
                            <a href="/dashboard"><li><i className="bi bi-graph-up-arrow"></i> Dashboard </li></a>

                            <a href="/dashboard/products"><li><i className="bi bi-clipboard-data-fill"></i> Produtos</li></a>

                            <a href="#"><li><i className="bi bi-clock"></i> Itens recentes</li></a>

                            <a href="#"><li><i className="bi bi-hourglass-bottom"></i> Itens acabando</li></a>

                            <a href="/dashboard/addProduct"><li><i className="bi bi-pie-chart"></i> Novo produto</li></a>
                        </ul>
                        <footer className="footer-menu">
                            <p>Labels</p>
                        </footer>
                    </div>

                    <div className="show-status">
                        {children}
                    </div>
                </div>
            </div >
        </>
    )
}