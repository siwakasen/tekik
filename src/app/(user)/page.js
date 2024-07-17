"use client"

import Image from "next/image"
import Nature from "@/images/nature.jpg"
import { MdDateRange } from "react-icons/md";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase/firebase";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { Link } from "@nextui-org/react";

export default function Page() {
    const q = collection(db, "articles");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setData(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);
    const formatDate = (dateString) => {
        const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };
    return (
        <>
            <div className="h-screen relative">
                <Image src={Nature} layout="fill" objectFit="cover" alt="dashboard" />
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white "></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center">
                    <p className="text-white text-xl lg:text-2xl my-6  font-bold text-center" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                        Selamat datang di website
                    </p>
                    <p className="text-white text-4xl sm:text-5xl md:text-7xl mx-4 lg:text-8xl font-bold text-center" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                        PADUKUHAN TEKIK
                    </p>
                    <p className="text-white text-xl lg:text-2xl my-6 font-bold text-center" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                        Kalurahan Nglindur, Kapanewon Girisubo, Kabupaten Gunung Kidul
                    </p>
                </div>
            </div>
            <div className="h-full max-w-5xl mt-24 mx-auto ">
                <div className="mx-4 sm:mx-auto max-w-screen-xl mb-24  sm:mb-48 ">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 self-center">
                        <div className="px-4">
                            <p className="text-4xl sm:text-6xl text-green-800 my-4 font-bold">
                                Sekilas Mengenai Tekik
                            </p>
                            <p className="text-xl sm:text-3xl text-gray-600 leading-relaxed font-normal text-justify">
                                Tekik terletak di Kalurahan Nglindur, Kapanewon Girisubo, Kabupaten Gunung Kidul. Tekik adalah dusun yang memiliki potensi desa yang cukup besar. Dengan kerjasama antar warga yang baik, dusun ini diharapkan dapat terus berkembang dan meningkatkan taraf hidup masyarakatnya.
                            </p>
                        </div>
                        <div className="w-full flex  justify-center">
                            <div className="relative flex justify-center items-center w-[350px] h-[350px] sm:w-[400px] sm:h-[400px] sm:ml-16 ">
                                <div className=" absolute top-[80px] sm:left-[80px] left-4 w-full sm:w-[600px] sm:max-w-[600px] overflow-hidden h-[350px] sm:h-[540px] bg-green-100 z-0"></div>
                                <Image src={Nature} layout="fill" objectFit="cover" alt="dashboard" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 mb-10 mx-auto gap-4">
                    <div className="flex flex-col rounded-lg bg-green-50 px-auto py-8 text-center">
                        <p className="text-center text-green-600 text-4xl font-extrabold">
                            1
                        </p>
                        <p className="text-center text-gray-500 font-medium text-lg">
                            Jumlah RW
                        </p>
                    </div>
                    <div className="flex flex-col rounded-lg bg-green-50 px-auto py-8 text-center">
                        <p className="text-center text-green-600 text-4xl font-extrabold">
                            2
                        </p>
                        <p className="text-center text-gray-500 font-medium text-lg">
                            Jumlah RT
                        </p>
                    </div>
                    <div className="flex flex-col rounded-lg bg-green-50 px-auto py-8 text-center">
                        <p className="text-center text-green-600 text-4xl font-extrabold">
                            90
                        </p>
                        <p className="text-center text-gray-500 font-medium text-lg">
                            Jumlah Penduduk
                        </p>
                    </div>
                </div>
                <div className="h-24"></div>
                <div className="m-5">
                    <div className="w-full">
                        <p className="text-3xl sm:text-4xl text-green-800 mb-6  text-center font-bold">BERITA TERKINI</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 rounded-lg my-6">
                        {loading ? (
                            [0, 1, 2].map((item) => (
                                <div key={item} className="w-full rounded-lg bg-gray-100 animate-pulse">
                                    <div className="rounded-t-md w-full aspect-[16/9] bg-gray-300"></div>
                                    <div className="p-2">
                                        <div className="pt-2 pb-1 sm:px-4">
                                            <div className="h-8 bg-gray-300 rounded mt-2"></div>
                                            <div className="flex items-center mt-4 gap-1">
                                                <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
                                                <div className="h-6 bg-gray-300 rounded w-32"></div>
                                            </div>
                                            <div className="mt-4">
                                                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                                                <div className="h-6 bg-gray-300 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-2 w-full bg-gray-300 rounded-b-lg mt-4 h-10"></div>
                                </div>
                            ))
                        ) : (
                            data.map((item, index) => (
                                <div key={index} className="w-full rounded-lg hover:scale-105  group transition-all flex flex-col justify-between">
                                    <div>
                                        <div className="overflow-hidden">
                                            <img src={item.thumbnail} layout="responsive" alt={""} className="rounded-t-md w-full aspect-[10/4] object-cover group-hover:scale-110 group-hover:rotate-2 transition-transform" />
                                        </div>
                                        <div className="p-2">
                                            <div className=" pb-1 sm:px-2 ">
                                                <p className="text-lg font-semibold text-green-900 uppercase">{item.title}</p>
                                                <p className="text-md text-gray-700 mt-1 line-clamp-2 font-light" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.content) }}></p>
                                                <div className="flex items-center  gap-1">
                                                    <p className="text-gray-700 font-light text-sm mt-3">{formatDate(item.date)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Link href={`/berita/${item.id}`} className="p-2 w-full  bg-green-700 rounded-b-lg text-white font-light flex items-center justify-center">
                                        Baca selengkapnya
                                    </Link>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="flex lg:mt-6  justify-end">
                        <Link href="/berita" className=" rounded-lg text-green-800  font-semibold mt-8 flex items-end justify-end hover:scale-105 transition-all">{'LIHAT LAINNYA >'}</Link>
                    </div>
                </div>
            </div >
        </>
    )
}
