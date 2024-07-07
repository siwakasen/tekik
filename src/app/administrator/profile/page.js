"use client"
import NavbarAdmin from "@/components/navbar/navbar-admin";
export default function Page() {

    return (
        <main className="flex flex-col h-screen">
            <NavbarAdmin />
            <div className="flex justify-center w-full bg-gradient-to-br from-slate-300 via-slate-200  to-sky-300  h-full">
            </div>
        </main>
    )
}
