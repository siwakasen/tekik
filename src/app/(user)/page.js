"use client";

import Image from "next/image";
import Gambar from "@/images/gambar.jpg";
import Square from "@/images/square.png";
import { collection, getDocs, query, orderBy, limit, getDoc, doc } from "firebase/firestore";
import { db } from "@/services/firebase/firebase";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { Link } from "@nextui-org/react";
import { motion } from "framer-motion";

export default function Page() {
    const q = query(collection(db, "articles"), orderBy("date", "desc"), limit(3));
    const docRef = doc(db, "profile", process.env.NEXT_PUBLIC_KEPENDUDUKAN_ID);
    const [data, setData] = useState([]);
    const [dataPenduduk, setDataPenduduk] = useState({});
    const [loading, setLoading] = useState(true);

    const [rwCount, setRwCount] = useState(0);
    const [rtCount, setRtCount] = useState(0);
    const [pendudukCount, setPendudukCount] = useState(0);

    const formatDate = (dateString) => {
        const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const fetchData = async () => {
        const querySnapshot = await getDocs(q);
        const querySnap = await getDoc(docRef);
        setData(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        if (querySnap.exists()) {
            setDataPenduduk(querySnap.data());
        }
        setLoading(false);
    };

    const startCountAnimation = (setCount, endValue) => {
        let start = 0;
        const duration = 2000;
        const increment = endValue / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= endValue) {
                start = endValue;
                clearInterval(timer);
            }
            setCount(Math.floor(start));
        }, 16);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (dataPenduduk.jumlahRW !== undefined) {
            startCountAnimation(setRwCount, dataPenduduk.jumlahRW);
        }
        if (dataPenduduk.jumlahRT !== undefined) {
            startCountAnimation(setRtCount, dataPenduduk.jumlahRT);
        }
        if (dataPenduduk.jumlahPenduduk !== undefined) {
            startCountAnimation(setPendudukCount, dataPenduduk.jumlahPenduduk);
        }
    }, [dataPenduduk]);

    return (
        <>
            <motion.div className="h-screen relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <Image src={Gambar} layout="fill" objectFit="cover" alt="dashboard" />
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white "></div>
                <motion.div className="absolute inset-0 flex flex-col justify-center items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
                    <p className="text-white text-xl lg:text-2xl my-6 font-bold text-center" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                        Selamat datang di website
                    </p>
                    <p className="text-white text-4xl sm:text-5xl md:text-7xl mx-4 lg:text-8xl font-bold text-center" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                        PADUKUHAN TEKIK
                    </p>
                    <p className="text-white px-2 text-xl lg:text-2xl my-6 font-bold text-center" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                        Kalurahan Nglindur, Kapanewon Girisubo, Kabupaten Gunung Kidul
                    </p>
                </motion.div>
            </motion.div>
            <div className="h-full max-w-5xl mt-24 mx-auto ">
                <motion.div className="mx-4 sm:mx-auto max-w-screen-xl mb-24 sm:mb-48 " initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 self-center">
                        <motion.div className="px-4" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                            <p className="text-4xl sm:text-6xl text-green-800 my-4 font-bold">
                                Sekilas Mengenai Tekik
                            </p>
                            <p className="text-lg sm:text-3xl text-gray-600 leading-relaxed font-normal text-justify">
                                Tekik terletak di Kalurahan Nglindur, Kapanewon Girisubo, Kabupaten Gunung Kidul. Tekik adalah dusun yang memiliki potensi desa yang cukup besar. Dengan kerjasama antar warga yang baik, dusun ini diharapkan dapat terus berkembang dan meningkatkan taraf hidup masyarakatnya.
                            </p>
                        </motion.div>
                        <motion.div className="w-full flex justify-center" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                            <div className="relative flex justify-center items-center w-[350px] h-[350px] sm:w-[400px] sm:h-[400px] sm:ml-16 overflow-visible">
                                <div className="absolute top-[80px] sm:left-[80px] left-4 w-full sm:w-full  overflow-hidden h-full  bg-green-100 z-0"></div>
                                <Image src={Square} layout="fill" objectFit="cover" alt="dashboard" />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-3 mb-10 mx-auto gap-4">
                    <motion.div
                        className="flex flex-col rounded-lg bg-green-50 px-auto py-8 text-center"
                        initial="hidden"
                        animate="visible"
                        variants={variants}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-center text-green-600 text-4xl font-extrabold">
                            {rwCount}
                        </p>
                        <p className="text-center text-gray-500 font-medium text-lg">
                            Jumlah RW
                        </p>
                    </motion.div>
                    <motion.div
                        className="flex flex-col rounded-lg bg-green-50 px-auto py-8 text-center"
                        initial="hidden"
                        animate="visible"
                        variants={variants}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <p className="text-center text-green-600 text-4xl font-extrabold">
                            {rtCount}
                        </p>
                        <p className="text-center text-gray-500 font-medium text-lg">
                            Jumlah RT
                        </p>
                    </motion.div>
                    <motion.div
                        className="flex flex-col rounded-lg bg-green-50 px-auto py-8 text-center"
                        initial="hidden"
                        animate="visible"
                        variants={variants}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <p className="text-center text-green-600 text-4xl font-extrabold">
                            {pendudukCount}
                        </p>
                        <p className="text-center text-gray-500 font-medium text-lg">
                            Jumlah Penduduk
                        </p>
                    </motion.div>
                </div>
                <div className="h-24"></div>
                <div className="m-5">
                    <motion.div className="w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                        <p className="text-3xl sm:text-4xl text-green-800 mb-6 text-center font-bold">BERITA TERKINI</p>
                    </motion.div>
                    <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 rounded-lg my-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                        {loading ? (
                            [0, 1, 2].map((item) => (
                                <motion.div key={item} className="w-full rounded-lg bg-gray-100 animate-pulse" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
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
                                </motion.div>
                            ))
                        ) : (
                            data.map((item, index) => (
                                <motion.div key={index} className="w-full rounded-lg hover:scale-105 group transition-all flex flex-col justify-between" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                                    <div>
                                        <div className="overflow-hidden">
                                            <img src={item.thumbnail} layout="responsive" alt={""} className="rounded-t-md w-full aspect-[10/4] object-cover group-hover:scale-110 group-hover:rotate-2 transition-transform" />
                                        </div>
                                        <div className="p-2">
                                            <div className="pb-1 sm:px-2">
                                                <p className="text-lg font-semibold text-green-900 uppercase">{item.title}</p>
                                                <p className="text-md text-gray-700 mt-1 line-clamp-2 font-light" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.content) }}></p>
                                                <div className="flex items-center gap-1">
                                                    <p className="text-gray-700 font-light text-sm mt-3">{formatDate(item.date)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Link href={`/berita/${item.id}`} className="p-2 w-full bg-green-700 rounded-b-lg text-white font-light flex items-center justify-center">
                                        Baca selengkapnya
                                    </Link>
                                </motion.div>
                            ))
                        )}
                    </motion.div>
                    <div className="flex lg:mt-6 justify-end">
                        <Link href="/berita" className="rounded-lg text-green-800 font-semibold mt-8 flex items-end justify-end hover:scale-105 transition-all">{'LIHAT LAINNYA >'}</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
