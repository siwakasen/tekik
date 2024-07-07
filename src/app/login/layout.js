"use client"
import AuthLoginStateChangeProvider from "@/components/context/authLogin";

function Layout({ children }) {
    return (
        <main>
            {children}
        </main>
    );
};

export default AuthLoginStateChangeProvider(Layout);
