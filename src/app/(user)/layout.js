"use client"
import NavbarUser from "@/components/navbar/navbar-user";
export default function Layout({ children }) {
    return (
        <main className="flex flex-col min-h-screen " >
            <NavbarUser />
            {children}
            <div className="w-full bg-gray-50 py-4 text-gray-400">
                <div className=" max-w-screen-lg mx-auto mt-16 flex justify-between items-center">
                    <p>KKN 85 UAJY</p>
                    <p>Copyright© 2024 | KLMPK 28</p>
                </div>
            </div>
        </main>
    );
}