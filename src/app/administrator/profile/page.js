"use client"
import dynamic from 'next/dynamic';
import NavbarAdmin from "@/components/navbar/navbar-admin";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "@/services/firebase/firebase";
import { Button, Spinner, Image } from '@nextui-org/react';
import { quillModules } from '@/components/constant/constant';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'sonner';
import { MdImage, MdClose } from "react-icons/md";
import { getFile, uploadFile } from '@/lib/storage';
import { storage } from '@/services/firebase/firebase';
import { ref, deleteObject } from 'firebase/storage';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function Page() {
    const [loading, setLoading] = useState(true);

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({});
    const [strukturOrganisasiPreview, setStrukturOrganisasiPreview] = useState([]);
    const [strukturOrganisasi, setStrukturOrganisasi] = useState([]);
    const [inputCount, setInputCount] = useState(1);
    const docRef = doc(db, "profile", process.env.NEXT_PUBLIC_PROFILE_ID);

    const handleImageChange = (e, index) => {
        const files = Array.from(e.target.files);
        const newThumbnailsPreview = files.map(file => URL.createObjectURL(file));

        setStrukturOrganisasiPreview(prev => {
            const updatedPreviews = [...prev];
            updatedPreviews[index] = newThumbnailsPreview[0];
            return updatedPreviews;
        });

        setStrukturOrganisasi(prev => {
            const updatedFiles = [...prev];
            updatedFiles[index] = files[0];
            return updatedFiles;
        });
        if (index === inputCount - 1) {
            setInputCount(inputCount + 1);
        }
    };
    async function deleteFile(filePath) {
        const fileRef = ref(storage, filePath);
        try {
            await deleteObject(fileRef);
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    }
    const handleImageDelete = async (data) => {

        if (data.includes('blob')) {
            setInputCount(inputCount - 1);
            setStrukturOrganisasi(prev => {
                const updatedFiles = prev.filter(item => item !== data);
                return updatedFiles;
            });
            setStrukturOrganisasiPreview(prev => {
                const updatedPreviews = prev.filter(item => item !== data);
                return updatedPreviews;
            });

        } else {
            const docRef = doc(db, "profile", process.env.NEXT_PUBLIC_PROFILE_ID);
            try {
                await updateDoc(docRef, {
                    strukturOrganisasi: arrayRemove(data)
                });
                await deleteFile(data);
            } catch (error) {
                console.error("Error deleting item: ", error);
            }
            setLoading(!loading);
        }
    };


    useEffect(() => {
        const fetchProfile = async () => {
            const querySnap = await getDoc(docRef);
            if (querySnap.exists()) {
                setData(querySnap.data());
                if (querySnap.data().strukturOrganisasi) {
                    setStrukturOrganisasiPreview(querySnap.data().strukturOrganisasi);
                    setInputCount(querySnap.data().strukturOrganisasi.length + 1);
                }
            }
            setLoading(false);
        }
        fetchProfile();
    }, [loading]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            let imageUrl = data.strukturOrganisasi || [];

            for (let i = 0; i < strukturOrganisasi.length; i++) {
                if (strukturOrganisasi[i]) {
                    const folder = 'strukturOrganisasi/';
                    const uploadedFile = await uploadFile(strukturOrganisasi[i], folder);
                    const fileUrl = await getFile(uploadedFile);
                    imageUrl[i] = fileUrl;
                }
            }

            const updatedData = { ...data, strukturOrganisasi: imageUrl };
            await updateDoc(docRef, updatedData);
            toast.success('Data berhasil disimpan');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex flex-col min-h-screen">
            <NavbarAdmin />
            <div className='flex-grow p-2 flex flex-col shadow-inner max-w-screen-xl mx-auto'>
                <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
                    <div className="flex-grow p-4 flex flex-col">
                        <div className="flex-grow">
                            <p className='w-full text-2xl mb-5 font-bold'>Tentang Padukuhan</p>
                            <div className="h-52 mb-28 sm:mb-16 mt-2">
                                <ReactQuill
                                    theme="snow"
                                    name="tentangPadukuhan"
                                    id="tentangPadukuhan"
                                    value={data.tentangPadukuhan}
                                    placeholder="Isi Content"
                                    onChange={(value) => setData(prev => ({ ...prev, tentangPadukuhan: value }))}
                                    className="h-[90%] md:h-full"
                                    modules={quillModules}
                                    required
                                />
                            </div>
                            <p className='w-full text-2xl mb-5 mt-28 font-bold'>Struktur Organisasi</p>
                            <div className="flex flex-wrap  rounded-lg md:bg-slate-100">
                                {Array.from({ length: inputCount }).map((_, index) => (
                                    <label key={index} className='border-[2px] border-dashed border-stone-300 flex flex-col justify-center items-center min-h-40 w-fit min-w-40 max-w-80 rounded-2xl p-2 m-2'>
                                        {strukturOrganisasiPreview[index] ? (
                                            <div className='relative'>
                                                <Image
                                                    isZoomed
                                                    src={strukturOrganisasiPreview[index]}
                                                    alt={`preview-${index}`}
                                                    className='object-cover max-h-40 max-w-80 w-full rounded-lg'

                                                />
                                                <MdClose
                                                    size={24}
                                                    className='z-50 absolute top-2 right-2 text-gray-600 cursor-pointer rounded-full bg-slate-100 bg-opacity-50 w-5 h-5'
                                                    onClick={() => handleImageDelete(strukturOrganisasiPreview[index])}
                                                />
                                            </div>

                                        ) : (
                                            <div className='flex flex-col justify-center items-center w-full'>
                                                <input
                                                    className='w-full h-full sr-only '
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleImageChange(e, index)}

                                                />
                                                <MdImage size={32} className='text-gray-400' />
                                                <p className='text-[14px] text-gray-400'>Tambahkan</p>
                                                <p className='text-[14px] text-gray-400'>struktur organisasi</p>
                                            </div>
                                        )
                                        }
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='w-full text-end mt-auto p-4'>
                        <Button color="primary" type="submit" className="mb-2 w-full sm:w-0" disabled={isLoading}>
                            {isLoading ?
                                <span className="loading-spinner text-white">
                                    <Spinner color="white" size="sm" />
                                </span> : 'Simpan'}
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    )
}
