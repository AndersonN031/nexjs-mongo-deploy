import Link from "next/link";
import HeaderComponent from "./components/HeaderComponent"

export default async function Home() {
  return (
    <>
      <HeaderComponent />
      <div className="container">
        <h1>Controle de Estoque</h1>
        <p>Bem-vindo ao nosso sistema de controle de estoque!</p>
        <div className="links">
          <Link href="/dashboard" legacyBehavior>
            <a>Dashboard</a>
          </Link>
        </div>
      </div>
    </>
  )
}

