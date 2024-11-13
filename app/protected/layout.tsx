
import Link from "next/link"

import { Bell, Home, Search, User, Upload } from "lucide-react"

import { Toaster } from "@/components/ui/toaster"
import NavBar from "@/components/NavBar"

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col min-h-screen ">

            <header className="flex items-center justify-between p-4 bg-white border-b">
                <h1 className="text-2xl font-bold">SimpanResit</h1>
                <div className="flex items-center gap-4">


                </div>
            </header>
            {children}
            <Toaster />
            <div className="p-10"></div>
            {/* <footer className="fixed bottom-0 w-full grid grid-cols-3 p-4 bg-white border-t">
                <Link
                    href="/protected"
                    className="flex flex-col items-center gap-1 text-sm font-medium text-muted-foreground"
                    aria-label="Home"
                >
                    <Home className="w-5 h-5" />
                    <span>Home</span>
                </Link>
                <Link
                    href="/protected/receipts"
                    className="flex flex-col items-center gap-1 text-sm font-medium text-primary"
                    aria-label="Receipts"
                >
                    <Upload className="w-5 h-5" />
                    <span>Receipts</span>
                </Link>
                <Link
                    href="/protected/profile"
                    className="flex flex-col items-center gap-1 text-sm font-medium text-muted-foreground"
                    aria-label="Profile"
                >
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                </Link>
            </footer> */}
            <NavBar />
        </div>
    );
}
