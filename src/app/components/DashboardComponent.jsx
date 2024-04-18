import 'bootstrap-icons/font/bootstrap-icons.css';


export default function DashboardComponent({ children }) {
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