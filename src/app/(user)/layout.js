"use client"
import NavbarUser from "@/components/navbar/navbar-user";
export default function Layout({ children }) {
    return (
        <main className="flex flex-col min-h-screen" >
            <NavbarUser />
            {children}
        </main>
    );
}
