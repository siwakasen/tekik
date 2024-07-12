"use client"
import { useState, useRef, useEffect } from "react";
import { Input } from "@nextui-org/input";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/react"
import { Login, GetSignInErrorMessage } from "@/services/firebase/firebase";
import { EyeFilledIcon } from "@/components/icon/eyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/icon/eyeSlashFilledIcon";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
import { Spinner } from "@nextui-org/react";
export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(true);
        const { statusCode } = await Login(email, password);
        if (statusCode === 200) {
            toast.success('Login berhasil')
            router.push('/administrator/profile');
        } else {
            toast.error(GetSignInErrorMessage(statusCode));
        }
        setIsLoading(false);
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
            <div className="hidden md:h-screen md:flex justify-center   items-center bg-gradient-to-tl  from-sky-300 via-green-100  to-green-400">
                <Card className="w-full mx-4 max-w-[400px] max-h-[800px]  md:block">
                    <CardHeader className="flex gap-3 p-5">
                        <div className="flex flex-col w-full">
                            <p className="text-2xl font-bold text-center text-gray-700">Selamat Datang </p>
                            <p className="text-2xl font-bold text-center text-gray-700" >di <span className="text-green-800">Padukuhan Tekik 🌾</span></p>
                        </div>
                    </CardHeader>
                    <Divider />
                    <form onSubmit={handleLogin}>
                        <CardBody className="flex gap-4 py-8 px-6">

                            <Input
                                key={"outside"}
                                type="email"
                                label="Email"
                                value={email}
                                isInvalid={!validEmail}
                                color={validEmail && email ? "" : email ? "danger" : ""}
                                errorMessage="Email tidak valid"
                                onChange={handleChangeEmail}
                                className="my-6"

                                placeholder="example@email.com"
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
                            <button className="w-full bg-blue-500 p-1 mb-4 rounded-xl text-white" size="lg" type="submit" >
                                <span className="text-lg font-semibold">Login</span>
                            </button>
                            <p className="text-sm font-thin text-gray-500">Akses ke dashboard administrator</p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
            <div className="md:hidden h-screen ">

                <div className="p-10 bg-gradient-to-tr h-full  ">
                    <div className="pt-8">
                        <p className="text-xl sm:text-2xl font-bold  text-gray-900">Selamat datang di</p>
                        <p className="text-2xl sm:text-3xl font-bold  text-green-800">Padukuhan Tekik 🌾</p>
                        <p className="mt-4 text-sm sm:text-md text-gray-600">
                            Silahkan masukkan email dan password untuk mengakases halaman admin.
                        </p>
                    </div>
                    <form onSubmit={handleLogin}>
                        <Input
                            key={"outside"}
                            type="email"
                            label="Email"
                            value={email}
                            isInvalid={!validEmail}
                            color={validEmail && email ? "" : email ? "danger" : ""}
                            errorMessage="Email tidak valid"
                            onChange={handleChangeEmail}
                            className="my-6"
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
                            className="mt-6 mb-4"

                        />
                        <div className="flex flex-col items-start pt-4">
                            <button className="w-20 bg-blue-500 p-1 mb-2 rounded-xl text-white" size="lg" type="submit" >
                                {isLoading ?
                                    <span className="loading-spinner text-white">
                                        <Spinner color="white" size="sm" />
                                    </span> : <span className="text-lg font-semibold">
                                        Login
                                    </span>}

                            </button>
                            <p className="text-sm font-thin mb-4 text-gray-500">Akses ke halaman admin</p>
                        </div>
                    </form>
                </div>
            </div>
        </main >
    )
}
