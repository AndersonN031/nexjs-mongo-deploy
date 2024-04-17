import 'bootstrap-icons/font/bootstrap-icons.css';

export default function DashBoard() {
    return (
        <>
            <div className="wrapper">

                <div className="container-dashboard">

                    <div className="row">
                        <div className="card">
                            <h2>Diversidade de Itens</h2>
                            <p>Quantidade total de diferentes tipos de itens em estoque: XX</p>
                        </div>
                        <div className="card">
                            <h2>Inventário Total</h2>
                            <p>Quantidade total de todos os itens em estoque: XX</p>
                        </div>
                        <div className="card">
                            <h2>Itens Recentes</h2>
                            <p>Número de itens recentemente adicionados: XX</p>
                        </div>
                        <div className="card">
                            <h2>Itens Acabando</h2>
                            <p>Número de itens com estoque baixo: XX</p>
                        </div>
                    </div>
                </div>
                <div className="menu">
                    <ul>
                        <li><i className="bi bi-graph-up-arrow"></i> <a href="/dashboard">Dashboard</a> </li>

                        <li><i className="bi bi-clipboard-data-fill"></i> <a href="/dashboard/products">Produtos</a></li>

                        <li><i className="bi bi-clock"></i> <a href="#">Itens recentes</a></li>

                        <li><i className="bi bi-hourglass-bottom"></i> <a href="#">Itens acabando</a></li>

                        <li><i className="bi bi-pie-chart"></i> <a href="/dashboard/addProduct">Novo produto</a></li>

                    </ul>
                </div>

            </div>
        </>
    )
}