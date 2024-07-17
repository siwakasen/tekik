"use client"
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase/firebase";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import DOMPurify from "dompurify";

export default function Page({ params }) {
    const { id } = params;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchArticle = async () => {
            if (id) {
                const docRef = doc(db, "articles", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();

                    setData(data);
                } else {
                    toast.error('Artikel tidak ditemukan');
                    router.push('/administrator/article');
                }
            }
            setLoading(false);
        };
        fetchArticle();
    }, [id]);
    const formatDate = (dateString) => {
        const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <>
            <div className="h-full max-w-5xl w-full mx-auto">
                <div className="mx-6 min-h-screen">
                    <div className="flex flex-col flex-wrap gap-4 my-2 border-2 rounded-md">
                        <Breadcrumbs
                            separator="/"
                            itemClasses={{
                                separator: "px-2"
                            }}
                            className="bg-gray-100 p-2 rounded-lg"
                        >
                            <BreadcrumbItem href="/">Home</BreadcrumbItem>
                            <BreadcrumbItem href="/berita">Berita</BreadcrumbItem>
                            <BreadcrumbItem>Detail Berita</BreadcrumbItem>
                        </Breadcrumbs>
                    </div>

                    {
                        !loading ? (
                            <>
                                <div className="w-full py-3 flex flex-col gap-2 items-center justify-between ">
                                    <p className="font-semibold text-3xl sm:text-3xl text-green-900 ">{data.title}</p>
                                    <p className="font-light text-sm text-gray-500">{formatDate(data.date)}</p>
                                </div>
                                <div className="overflow-hidden ">
                                    <img src={data.thumbnail} layout="responsive" alt={""} className="sm:h-full rounded-md w-full aspect-[16/10] sm:aspect-[16/6]  object-cover  transition-transform" />
                                </div>
                                <div className="my-4">
                                    <p className="text-md text-gray-700 mt-1 text-justify  font-light" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.content) }}></p>
                                </div>

                                <div className="my-3 border-b-2 border-green-800 ">
                                    <p className="font-bold text-2xl border-b-4 inline-block border-green-800 pe-2 text-green-800">Lampiran</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {
                                        data.lampiran.map((item, index) => (
                                            <div key={index} className="relative ">
                                                <img src={item} layout="responsive" alt={""} className="sm:h-full rounded-md w-full aspect-video  object-cover  transition-transform" />
                                            </div>
                                        ))
                                    }
                                </div>
                            </>
                        ) :
                            <>
                                <div className="w-full py-3 flex flex-col gap-2 items-center justify-between animate-pulse">
                                    <div className="h-10 bg-gray-300 rounded w-3/4 sm:w-2/3"></div>
                                    <div className="h-4 bg-gray-300 rounded w-1/4 sm:w-1/6 mt-2"></div>
                                </div>
                                <div className="overflow-hidden animate-pulse">
                                    <div className="sm:h-full rounded-md w-full aspect-[16/10] sm:aspect-[16/6] bg-gray-300"></div>
                                </div>
                                <div className="my-4 animate-pulse">
                                    <div className="h-4 bg-gray-300 rounded w-full mt-2"></div>
                                    <div className="h-4 bg-gray-300 rounded w-5/6 mt-2"></div>
                                    <div className="h-4 bg-gray-300 rounded w-3/4 mt-2"></div>
                                    <div className="h-4 bg-gray-300 rounded w-2/3 mt-2"></div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-pulse">
                                    {[...Array(3)].map((_, index) => (
                                        <div key={index} className="relative">
                                            <div className="sm:h-full rounded-md w-full aspect-video bg-gray-300"></div>
                                        </div>
                                    ))}
                                </div>
                            </>
                    }
                </div>
                <div className="pt-20  text-center font-light text-sm text-gray-500 p-4 sm:text-start">
                    <p className="font-bold text-gray-700 uppercase text-md">Padukuhan Tekik</p>
                    <p>Nglindur, Kecamatan Girisubo, Kabupaten Gunung Kidul,</p>
                    <p>Daerah Istimewa Yogyakarta</p>
                </div>
            </div>
        </>
    );
}
