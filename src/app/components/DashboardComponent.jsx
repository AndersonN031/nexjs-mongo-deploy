import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import userImg from "@/app/images/user-example.png"
import Image from "next/image"

// chamando a api utilizando o get
export async function fetchProducts() {
    try {
        // const response = await axios.get('https://nexjs-mongo-deploy.vercel.app/api/products');

        const response = await axios.get(`http://localhost:3000/api/products`)
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        return []; // Retorna um array vazio em caso de erro
    }
}

export default async function DashboardComponent({ children }) {
    //passando os dados do fetchProducts para a const products
    const products = await fetchProducts();

    // metodos para exibir dados no dashboard
    const totalInventory = products.reduce((total, product) => total + product.quantity, 0);
    const productsRunningOut = products.filter(product => product.quantity <= 10);
    const totalInventoryValue = products.reduce((total, product) => total + product.price * product.quantity, 0);

    function priceFormater(number) {
        return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    return (
        <>
            <div className="grid-dashboard">
                <div className="menu">
                    <div className="img-menu">
                        <Image src={userImg}
                            width={160}
                            height={160}
                            alt="user"
                            className="image-user"
                        />

                        <p>Anderson Nunes</p>
                        <p className="email-p">exampleuser@gmail.com</p>
                    </div>
                    <ul>
                        <div className="input-container">
                            <form>
                                <input type="text" placeholder="Search..." />
                                <button type="submit"><i className="bi bi-search" aria-hidden="true"></i></button>
                            </form>
                        </div>
                        <li className='title-navigation'></li>
                        <a href="/dashboard"><li><i className="bi bi-graph-up-arrow"></i> Dashboard </li></a>
                        <a href="/dashboard/products"><li><i className="bi bi-clipboard-data-fill"></i> Produtos</li></a>
                        <a href="/dashboard/lowStock"><li><i className="bi bi-hourglass-bottom"></i> Produtos acabando</li></a>
                        <a href="/dashboard/addProduct"><li><i className="bi bi-pie-chart"></i> Novo produto</li></a>
                    </ul>
                </div>
                <div className="show-status">
                    {/* <div className="wrapper"> */}
                    <div className="container-dashboard">
                        <div className="div-dashboard-user">
                            <p className="dashboard-user">Dashboard User</p>
                        </div>
                        <div className="row">
                            <div className="card total-in-stock">
                                <p className="title-card">Valor total em estoque</p>
                                <p className="number-card">{priceFormater(totalInventoryValue)}</p>
                            </div>
                            <div className="card">
                                <p className="title-card">Diversidade de produtos</p>
                                <p className="number-card">{products.length}</p>
                            </div>
                            <div className="card">
                                <p className="title-card">Inventário Total</p>
                                <p className="number-card">{totalInventory}</p>
                            </div>
                            <div className="card">
                                <p className="title-card">Produtos Acabando</p>
                                <p className="number-card">{productsRunningOut.length}</p>
                            </div>
                        </div>
                    </div>

                    {/* </div> */}

                    {children}
                </div>
            </div>

        </>
    );
}
