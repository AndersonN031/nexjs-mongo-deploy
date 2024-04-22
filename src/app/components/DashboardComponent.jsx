import 'bootstrap-icons/font/bootstrap-icons.css';
import { loadUsers } from '../dashboard/products/page.tsx';
import dayjs from 'dayjs';

export default async function DashboardComponent({ children }) {
    const products = await loadUsers();
    const totalIinventory = products.reduce((total, product) => total + product.quantity, 0)

    // const recentProducts = products.filter(product => {
    //     // Verifica se product.createdAt está definido
    //     if (product.createdAt) {
    //         const now = dayjs(); // Obtém a data e hora atual
    //         const createdAt = dayjs(product.createdAt); // Converte a data de criação do produto para um objeto Day.js

    //         const differenceInHours = now.diff(createdAt, 'hour'); // Calcula a diferença em horas entre as duas datas

    //         // console.log(`Diferença em horas para o produto ${product._id}:`, differenceInHours);

    //         return differenceInHours < 24;
    //     } else {
    //         return false;
    //     }
    // });

    const itemsRunningOut = products.filter(product => {
        if (product.quantity <= 10) {
            // console.log(`${product.name} está acabando`)
            return true
        } else {
            return false;
        }
    })

    console.log(itemsRunningOut)
    return (
        <>
            <div className="wrapper">

                <div className="container-dashboard">

                    <div className="row">
                        <div className="card">
                            <h1>{products.length}</h1>
                            <p>Diversidade de Itens</p>
                        </div>
                        <div className="card">
                            <h1>{totalIinventory}</h1>
                            <p>Inventário Total</p>

                        </div>
                        <div className="card">
                            <h1>nada por enquanto</h1>
                            <p>Itens Recentes</p>

                        </div>
                        <div className="card">
                            <h1>{itemsRunningOut.length}</h1>
                            <p>Itens Acabando</p>

                        </div>
                    </div>
                </div>
                <div className="grid-dashboard">
                    <div className="menu">
                        <div className="title-menu">
                            <h1>Menu</h1>
                        </div>
                        <ul>
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