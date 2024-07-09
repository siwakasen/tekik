"use client"
import dynamic from 'next/dynamic';
import NavbarAdmin from "@/components/navbar/navbar-admin";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, collection } from "firebase/firestore";
import { db } from "@/services/firebase/firebase";
import { Input, Button, Spinner, Image } from '@nextui-org/react';
import { quillModules } from '@/components/constant/constant';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'sonner';
import { set } from 'date-fns';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
export default function Page() {
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);


    const docRef = doc(db, "profile", process.env.NEXT_PUBLIC_PROFILE_ID);
    useEffect(() => {
        const fetchProfile = async () => {
            const querySnap = await getDoc(docRef);
            if (querySnap.exists()) {
                setData(querySnap.data());
            }
            setLoading(false);
        }
        fetchProfile();
    }, [loading]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const docRef = doc(db, "profile", process.env.NEXT_PUBLIC_PROFILE_ID);
        try {
            await updateDoc(docRef, {
                ...data
            }).then(() => {
                toast.success('Data berhasil disimpan');
            }).finally(() => {
                setIsLoading(false);
            });
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <main className="flex flex-col h-screen bg-gradient-to-br from-slate-300 via-slate-200  to-sky-300">
            <NavbarAdmin />
            <div className='h-full p-10'>
                <div className="flex justify-center w-full h-full">
                    <div className="w-full  mt-4 max-w-screen-2xl  px-6 min-w-[420px]:px-6">
                        <Card className='h-full'>
                            <CardHeader>
                                <p className="text-4xl font-semibold">Profil Padukuhan</p>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <form onSubmit={(e) => { handleSubmit(e) }} >
                                    <div className="p-4">
                                        <p className='w-full h-4 text-2xl mb-5 font-bold'>Tentang Padukuhan</p>
                                        <div className="h-52 mb-4 mt-2">
                                            <ReactQuill
                                                theme="snow"
                                                name="content"
                                                id="content"
                                                value={data.tentangPadukuhan}
                                                placeholder="Isi Content"
                                                onChange={(value) => setData(prev => ({ ...prev, tentangPadukuhan: value }))}
                                                className="sm:h-[80%] h-[70%]"
                                                modules={quillModules}
                                                required
                                            />
                                        </div>
                                        <p className='w-full h-4 text-2xl my-5 font-bold'>Sejarah Padukuhan</p>
                                        <div className="h-52 mb-4 mt-2">
                                            <ReactQuill
                                                theme="snow"
                                                name="content"
                                                id="content"
                                                value={data.sejarahPadukuhan}
                                                placeholder="Isi Cjarahontent"
                                                onChange={(value) => setData(prev => ({ ...prev, sejarahPadukuhan: value }))}
                                                className="sm:h-[80%] h-[70%]"
                                                modules={quillModules}
                                                required
                                            />
                                        </div>
                                        <div className='w-full text-end'>
                                            <Button color="primary" type="submit" className="mt-5 " disabled={isLoading}>
                                                {isLoading ?
                                                    <span className="loading-spinner text-white">
                                                        <Spinner color="white" size="sm" />
                                                    </span> : 'Simpan'}
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </CardBody>
                        </Card>
                    </div>
                </div>

            </div>
        </main >
    )
}
