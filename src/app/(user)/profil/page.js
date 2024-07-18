"use client"
import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase/firebase";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import DOMPurify from "dompurify";

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
                                            <img src={item} layout="responsive" alt={""} className="sm:h-full rounded-md w-full aspect-video  object-cover  transition-transform" />
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="my-5 border-b-2 border-green-800 ">
                                <p className="font-mono uppercase  text-2xl sm:text-3xl border-b-4 inline-block border-green-800 pe-2 text-green-800">Peta Padukuhan</p>
                            </div>
                            <div>
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
