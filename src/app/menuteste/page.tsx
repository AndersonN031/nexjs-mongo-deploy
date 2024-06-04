"use client"
import style from './style.module.css'
import 'boxicons/css/boxicons.min.css'
import nome from '../images/user-example.png'
import Image from 'next/image'
export default function menutxt (){
    return (
        
    <>
            // <h1 className={style.titulo} >hello word</h1>
            <aside className={style.sidebar}>
                <div className={style.sidebarhead}>
                    <Image src={nome} width={42}
                    height={42} alt={''} />
                    <div className={style.userinfo}>
                        <div className={style.userprofile}>

                            <div className={style.detalhesusuario}></div>
                            <h3>nome do usuario</h3>
                        </div>
                    </div>
                </div>


                <ul className={style.sidebarlink}>
                    <h4 className={style.listtitle}>
                        <div className={style.menuseparator}>

                        </div>
                    </h4>
                    <li className={style.list}>
                        <a className={style.listlink} href="#"><span className='icones'><i className='bx bxs-dashboard'></i></span>
                            Dashboard</a>
                    </li>
                    <li className={style.list}>
                        <a className={style.listlink} href="#"><span className='icones'><i className='bx bxs-package'></i></span>
                            produto</a>
                    </li>
                    <li className={style.list}>
                        <a className={style.listlink} href="#"><span className='icones'><i className='bx bxs-hourglass'></i></span>
                            Produtos acabando</a>
                    </li>
                    <li className={style.list}>
                        <a className={style.listlink} href="#"><span className='icones'><i className='bx bx-plus'></i></span>
                            novo produto</a>
                    </li>
                    <li className={style.list}>
                        <a className={style.listlink} href="#"><span className='icones'><i className='bx bx-log-out'></i></span>
                            Logout</a>
                    </li>

                </ul>
            </aside>
            </>
)
}
