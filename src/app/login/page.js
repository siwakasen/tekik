"use client"
import { useState, useEffect } from "react";
import { Input } from "@nextui-org/input";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/react"
import { Login, GetSignInErrorMessage } from "@/services/firebase/firebase";
import { EyeFilledIcon } from "@/components/icon/eyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/icon/eyeSlashFilledIcon";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const router = useRouter();


    const handleLogin = async (e) => {
        e.preventDefault();
        if (email === '') {
            setValidEmail(false);
        }
        if (password === '') {
            setValidPassword(false);
        }
        if (email === '' || password === '') {
            return;
        }
        const { statusCode } = await Login(email, password);
        if (statusCode === 200) {
            toast.success('Login berhasil')
            router.push('/administrator/article');
        } else {
            toast.error(GetSignInErrorMessage(statusCode));
        }
    }
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        if (e.target.value) {
            if (validateEmail(e.target.value)) {
                setValidEmail(true);
            } else {
                setValidEmail(false);
            }
        }
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
        if (e.target.value) {
            setValidPassword(true);
        } else {
            setValidPassword(false);
        }
    }
    return (
        <main>
            <div className="flex justify-center h-screen items-center bg-gradient-to-tl from-sky-500 via-white  to-teal-300">
                <Card className="w-full mx-4 max-w-[400px] max-h-[800px]">
                    <CardHeader className="flex gap-3 p-5">
                        <div className="flex flex-col w-full">
                            <p className="text-3xl font-bold text-center text-gray-700">Selamat Datang !</p>
                        </div>
                    </CardHeader>
                    <Divider />
                    <form onSubmit={handleLogin}>
                        <CardBody className="flex gap-4 py-8 px-6">
                            <Input
                                type="email"
                                label="Email"
                                value={email}
                                isInvalid={!validEmail}
                                color={validEmail && email ? "" : email ? "danger" : ""}
                                errorMessage="Email tidak valid"
                                onChange={handleChangeEmail}
                            />
                            <Input
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                        {isVisible ? (
                                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                }
                                type={isVisible ? "text" : "password"}
                                label="Password"
                                value={password}
                                isInvalid={!validPassword}
                                color={validPassword && password ? "" : password ? "danger" : ""}
                                errorMessage="Password tidak boleh kosong"
                                onChange={handleChangePassword}
                            />
                        </CardBody>
                        <Divider />
                        <CardFooter className="flex flex-col items-start pt-4 pb-5 px-6">
                            <button className="w-full bg-blue-500 p-1 mb-4 rounded text-white" size="lg" type="submit" >
                                <span className="text-lg font-semibold">Login</span>
                            </button>
                            <p className="text-sm font-thin text-gray-500">Akses ke dashboard administrator</p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </main >
    )
}
