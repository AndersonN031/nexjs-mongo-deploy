"use client"
import Image from "next/image"
import userImg from "@/app/images/user-example.png"

export default function MenuComponent({ children }) {
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
            </div>
            {children}
        </>
    )
}