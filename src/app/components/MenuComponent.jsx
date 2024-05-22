"use client"
import Image from "next/image"
import userImg from "@/app/images/user-example.png"
import { signOut, useSession } from "next-auth/react";
import Button from "./ButtonComponent";

export default function MenuComponent({ children }) {
    const { status, data: session } = useSession()

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
                        <span>{`Olá ${session?.user?.name?.split(" ")[0]}`}</span>
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
                        <Button
                            text="Sair"
                            onClick={() => signOut()}
                        />
                    </ul>
                </div>
            </div>
            {children}
        </>
    )
}