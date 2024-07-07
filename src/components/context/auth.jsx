/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { FirebaseAuth, onAuthStateChanged } from "@/services/firebase/firebase";
import { useRouter } from "next/navigation";
import { Spinner } from '@nextui-org/react';

const AuthStateChangeProvider = (WrappedComponent) => {
    return (props) => {
        const [loading, setLoading] = useState(true);
        const router = useRouter();

        useEffect(() => {
            const checkLogin = onAuthStateChanged(FirebaseAuth, async (user) => {
                if (user) {
                    setLoading(false);
                } else {
                    router.replace('/login');
                }
            });
            return () => {
                checkLogin();
            }
        }, []);

        if (loading) {
            return (
                <Spinner color="primary" size="lg" className=" fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            );
        }

        return (
            <WrappedComponent {...props} />
        );
    }
}

export default AuthStateChangeProvider;
