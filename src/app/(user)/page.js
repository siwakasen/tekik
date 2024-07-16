"use client"

import Image from "next/image"
import Nature from "@/images/nature.jpg"

export default function Page() {
    return (
        <>
            <div className="h-screen relative">
                <Image src={Nature} layout="fill" objectFit="cover" alt="dashboard" />
                <div className="absolute inset-0 bg-black opacity-20"></div> {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white "></div>
                <div className="absolute inset-0 flex justify-center items-center">
                    <p className="text-white text-8xl font-bold" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                        SELAMAT DATANG
                    </p>
                </div>
            </div>
            <div className="container mx-auto mt-10 px-4 py-8 flex flex-col justify-center items-center">
                <p className="text-4xl text-green-800 mt-4 font-bold">Padukuhan Tekik</p>
                <p className="text-xl text-green-800 mt-4 w-1/3 flex items-center justify-center px-10">Nglindur, Kecamatan Girisubo, Kabupaten Gunung Kidul, Daerah Istimewa Yogyakarta, Indonesia</p>
            </div>
        </>
    )
}
