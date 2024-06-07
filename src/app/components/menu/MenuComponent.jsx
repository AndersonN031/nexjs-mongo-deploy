"use client"
import Image from "next/image"
import style from './style.module.css'
import userImg from '../../images/user-example.png'
import { signOut, useSession } from "next-auth/react";
import 'boxicons/css/boxicons.min.css'

export default function MenuComponent({ children }) {
    const { status, data: session } = useSession()

    return (
        <>
            <aside className={style.sidebar}>
                <div className={style.sidebarhead}>
                    <Image src={userImg} width={42}
                        height={42} alt={''} />
                    <div className={style.userinfo}>
                        <div className={style.userprofile}>

                            <div className={style.detalhesusuario}></div>
                            <h3>{session?.user?.name.split(" ")[0]}</h3>
                        </div>
                    </div>
                </div>


                <ul className={style.sidebarlink}>
                    <h4 className={style.listtitle}>
                        <div className={style.menuseparator}>

                        </div>
                    </h4>
                    <li className={style.list}>
                        <a className={style.listlink} href="/dashboard"><span className='icones'><i className='bx bxs-dashboard'></i></span>
                            Dashboard</a>
                    </li>
                    <li className={style.list}>
                        <a className={style.listlink} href="/dashboard/products"><span className='icones'><i className='bx bxs-package'></i></span>
                            produto</a>
                    </li>
                    <li className={style.list}>
                        <a className={style.listlink} href="/dashboard/lowStock"><span className='icones'><i className='bx bxs-hourglass'></i></span>
                            Produtos acabando</a>
                    </li>
                    <li className={style.list}>
                        <a className={style.listlink} href="/dashboard/addProduct"><span className='icones'><i className='bx bx-plus'></i></span>
                            novo produto</a>
                    </li>
                    <li className={style.list}>
                        <a
                            onClick={() => signOut()}
                            className={`logout ${style.listlink}`}
                        >
                            <span className='icones'>
                                <i className='bx bx-log-out'></i>
                            </span>
                            Sair</a>
                    </li>

                </ul>
            </aside>
            {children}
        </>
    )
}