import Link from "next/link";

export default function HeaderComponent() {
    return (
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
            </nav>
        </header>
    )
}