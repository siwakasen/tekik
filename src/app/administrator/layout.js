"use client"
import AuthStateChangeProvider from "@/components/context/auth";

function Layout({ children }) {
    return (
        <main >
            {children}
        </main>
    );
};

export default AuthStateChangeProvider(Layout);
