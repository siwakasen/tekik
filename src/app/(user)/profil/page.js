"use client"
import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase/firebase";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import DOMPurify from "dompurify";
import Image from "next/image"
import Denah from "@/images/denah.jpg"


export default function Page() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const docRef = doc(db, "profile", process.env.NEXT_PUBLIC_PROFILE_ID);
    useEffect(() => {
        const fetchProfile = async () => {
            const querySnap = await getDoc(docRef);
            if (querySnap.exists()) {
                console.log(querySnap.data());
                setData(querySnap.data());
            }
            setLoading(false);
        }
        fetchProfile();
    }, [loading]);

    return (
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
                        <BreadcrumbItem >Profil</BreadcrumbItem>
                    </Breadcrumbs>
                </div>
                {
                    loading ? (
                        <>
                            <div className="my-5 border-b-2 border-green-800 animate-pulse">
                                <div className="h-10 bg-gray-300 rounded w-3/4 sm:w-2/3"></div>
                            </div>
                            <div className="animate-pulse">
                                <div className="h-4 bg-gray-300 rounded w-full mt-2"></div>
                                <div className="h-4 bg-gray-300 rounded w-5/6 mt-2"></div>
                                <div className="h-4 bg-gray-300 rounded w-3/4 mt-2"></div>
                                <div className="h-4 bg-gray-300 rounded w-2/3 mt-2"></div>
                            </div>
                            <div className="my-5 border-b-2 border-green-800 animate-pulse">
                                <div className="h-10 bg-gray-300 rounded w-3/4 sm:w-2/3"></div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-pulse">
                                {[...Array(2)].map((_, index) => (
                                    <div key={index} className="relative">
                                        <div className="sm:h-full rounded-md w-full aspect-video bg-gray-300"></div>
                                    </div>
                                ))}
                            </div>
                            <div className="my-5 border-b-2 border-green-800 animate-pulse">
                                <div className="h-10 bg-gray-300 rounded w-3/4 sm:w-2/3"></div>
                            </div>
                            <div className="max-h-xs grid grid-cols-1 sm:grid-cols-2 gap-4 animate-pulse">
                                <div className="max-w-full max-h-full bg-gray-300 aspect-square"></div>
                                <div className="w-full h-full bg-gray-300"></div>
                            </div>
                        </>
                    ) :
                        <>
                            <div className="my-5 border-b-2 border-green-800 ">
                                <p className="font-mono uppercase  text-2xl sm:text-3xl border-b-4 inline-block border-green-800 pe-2 text-green-800">Tentang Padukuhan</p>
                            </div>
                            <div>
                                <p className="font-light text-justify" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.tentangPadukuhan) }}></p>
                            </div>
                            <div className="my-5 border-b-2 border-green-800 ">
                                <p className="font-mono uppercase  text-2xl sm:text-3xl border-b-4 inline-block border-green-800 pe-2 text-green-800">Struktur Organisasi</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {
                                    data.strukturOrganisasi.map((item, index) => (
                                        <div key={index} className="relative ">
                                            <img src={item} layout="responsive" alt={""} className="sm:h-full rounded-md w-full aspect-video object-cover transition-transform" />
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="mt-7 mb-5 border-b-2 border-green-800 ">
                                <p className="font-mono uppercase  text-2xl sm:text-3xl border-b-4 inline-block border-green-800 pe-2 text-green-800">Lokasi Padukuhan</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Image src={Denah} layout="responsive" className="w-full h-full min-h-[600px]" objectFit="cover" alt="dashboard" />
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1554.2729537097596!2d110.76072302979117!3d-8.15023426237121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7bc7002e36ef07%3A0x37a0be507115eb60!2sPadukuhan%20Tekik!5e1!3m2!1sid!2sid!4v1721368960581!5m2!1sid!2sid" className="border-0 w-full h-full min-h-[600px]" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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
    )
}
