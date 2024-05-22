"use client"
import React from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Spinner from "./SpinnerComponent";

export default function LayoutAdmin({ children }) {
    const router = useRouter();

    // Obtendo o estado da sessão do usuário usando o hook useSession do NextAuth
    const { data: session, status } = useSession();

    // Se o status da sessão for "loading", retorna null (aguarda a sessão carregar)
    if (status === "loading") {
        return null;
    }

    // Se não houver uma sessão ativa
    if (!session) {
        setTimeout(() => {
            router.push("/login");
        }, 100);

        return <Spinner />;
    }

    // Retorna o layout com os componentes filhos se o usuário estiver autenticado
    return (
        <div>{children}</div>
    )
}

