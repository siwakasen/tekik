"use client";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { AiOutlineSearch } from "react-icons/ai";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase/firebase";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { Link } from "@nextui-org/react";

export default function Page() {
    const q = collection(db, "articles");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState("");

    const fetchData = async () => {
        const querySnapshot = await getDocs(q);
        const articles = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(articles);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredData = data.filter(item =>
        item.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.content.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.date.toLowerCase().includes(searchInput.toLowerCase())
    );
    const formatDate = (dateString) => {
        const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

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
                        <BreadcrumbItem>Berita</BreadcrumbItem>
                    </Breadcrumbs>
                </div>
                <div className="w-full py-3 flex items-center justify-between border-b-2">
                    <p className="font-semibold text-xl sm:text-2xl">BERITA</p>
                    {/* search berita */}
                    <div className="relative flex items-center ">
                        <input
                            type="text"
                            placeholder="Cari berita..."
                            className="px-2 py-2 border border-gray-300 rounded-lg text-xs sm:text-[14px]  ml-4 w-[100px] sm:w-full  focus:outline-none"
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <AiOutlineSearch className="text-gray-500 sm:size-6 relative right-7" />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-5 rounded-lg my-6">
                    {loading ? (
                        [0, 1, 2, 3].map((item) => (
                            <div key={item} className="w-full rounded-lg bg-gray-100 animate-pulse sm:h-52">
                                <div className="sm:flex sm:h-full">
                                    <div className="overflow-hidden sm:max-w-36">
                                        <div className="sm:h-full rounded-t-md w-full aspect-[12/4] bg-gray-300"></div>
                                    </div>
                                    <div className="flex flex-col sm:w-full">
                                        <div className="px-2 py-4 sm:h-full sm:p-6">
                                            <div className="h-8 bg-gray-300 rounded mt-2"></div>
                                            <div className="h-6 bg-gray-300 rounded w-32 mt-1"></div>
                                            <div className="flex items-center gap-1 mt-3">
                                                <div className="h-6 bg-gray-300 rounded w-24"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        filteredData.map((item, index) => (
                            <div key={index} className="w-full rounded-lg hover:shadow-2xl sm:hover:shadow-lg group transition-all flex flex-col justify-between  sm:h-52">
                                <div className="sm:flex sm:h-full">
                                    <div className="overflow-hidden sm:max-w-36">
                                        <img src={item.thumbnail} layout="responsive" alt={""} className="sm:h-full rounded-t-md w-full aspect-[12/4]  object-cover group-hover:scale-110 group-hover:rotate-2 sm:group-hover:rotate-0 transition-transform" />
                                    </div>
                                    <div className="flex flex-col sm:w-full">
                                        <div className="px-2 py-4 sm:h-full sm:p-6">
                                            <p className="text-lg font-semibold text-green-900 uppercase">{item.title}</p>
                                            <p className="text-md text-gray-700 mt-1 line-clamp-2 font-light" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.content) }}></p>
                                            <div className="flex items-center gap-1">
                                                <p className="text-gray-700 font-light text-sm mt-3">{formatDate(item.date)}</p>
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-end ">
                                            <Link href={`/berita/${item.id}`} className="p-2 w-full sm:w-44 text-sm bg-green-700 rounded-b-lg sm:rounded-b-none sm:rounded-ee-large text-white s flex items-center justify-center">
                                                Baca selengkapnya
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className="mt-22 text-center font-light text-sm text-gray-500 p-4 sm:text-start">
                <p className="font-bold text-gray-700 uppercase text-md">Padukuhan Tekik</p>
                <p>Nglindur, Kecamatan Girisubo, Kabupaten Gunung Kidul,</p>
                <p>Daerah Istimewa Yogyakarta</p>

            </div>
        </div>
    );
}
