"use client"
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Button from "./ButtonComponent";
import LayoutAdmin from "./LayoutAdminComponente";

export default function HeaderComponent() {
    const { status, data: session } = useSession();

    if (status !== "authenticated") {
        return null;
    }
    return (
        <>
            <LayoutAdmin>

                <header className="header">
                    <div className="logo">
                        <Link href="/" legacyBehavior>
                            <a>Admin</a>
                        </Link>
                    </div>
                    <nav className="navbar">
                        <ul>
                            <li>
                                <Link href="/" legacyBehavior>
                                    <a>Início</a>
                                </Link>
                            </li>

                            <li>
                                <Link href="/dashboard" legacyBehavior>
                                    <a>Dashboard</a>
                                </Link>
                            </li>
                        </ul>
                        <Button
                            text="Sair"
                            onClick={() => signOut()}
                        />
                    </nav>
                </header>
                <span>{`Olá ${session?.user?.name.split(" ")[0]}`}</span>
            </LayoutAdmin>
        </>
    )
}