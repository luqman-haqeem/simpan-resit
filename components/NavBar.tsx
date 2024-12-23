"use client";

import Link from "next/link"
import { Home, User, Upload } from "lucide-react"
import { usePathname } from 'next/navigation'

export default function NavBar() {
    const pathname = usePathname()

    return (

        <footer className="fixed bottom-0 w-full grid grid-cols-3 p-4 bg-white dark:bg-stone-950 border-t">
            <Link
                href="/protected/dashboard"
                className={`flex flex-col items-center gap-1 text-sm font-medium  ${pathname === '/protected/dashboard' ? 'text-orange-600' : 'text-muted-foreground'}`}
                aria-label="Home"
            >
                <Home className="w-5 h-5" />
                <span>Home</span>
            </Link>
            <Link
                href="/protected/receipts"
                className={`flex flex-col items-center gap-1 text-sm font-medium ${pathname === '/protected/receipts' ? 'text-orange-600' : 'text-muted-foreground'}`}
                aria-label="Receipts"
            >
                <Upload className="w-5 h-5" />
                <span>Receipts</span>
            </Link>
            <Link
                href="/protected/profile"
                className={`flex flex-col items-center gap-1 text-sm font-medium  ${pathname === '/protected/profile' ? 'text-orange-600' : 'text-muted-foreground'}`}
                aria-label="Profile"
            >
                <User className="w-5 h-5" />
                <span>Profile</span>
            </Link>
        </footer >
    );
}