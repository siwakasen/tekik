"use client"
import AuthStateChangeProvider from "@/components/context/authAdmin";

function Layout({ children }) {
    return (
        <main >
            {children}
        </main>
    );
};

export default AuthStateChangeProvider(Layout);
