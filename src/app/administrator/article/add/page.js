"use client";
import { Input, Button, Text, Image, Card, CardHeader, Divider, CardBody } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import { MdImage } from "react-icons/md";
import { useEffect, useState } from 'react';
import NavbarAdmin from '@/components/navbar/navbar-admin';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { toast } from 'sonner';
import { collection, addDoc } from "firebase/firestore";
import { uploadFile, getFile } from '@/lib/storage';
import { db } from "@/services/firebase/firebase";
import { useRouter } from 'next/navigation';
import { quillModules } from '@/components/constant/constant';
import { Spinner } from '@nextui-org/react';
import { MdClose } from "react-icons/md";
import { ref, deleteObject } from 'firebase/storage';
import { arrayRemove, updateDoc, doc } from 'firebase/firestore';

const FormPage = () => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [lampiranPreview, setLampiranPreview] = useState([]);
    const [lampiran, setLampiran] = useState([]);
    const [inputCount, setInputCount] = useState(1);

    useEffect(() => {
        if (thumbnail) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnailPreview(reader.result);
            };
            reader.readAsDataURL(thumbnail);
        }
    }, [thumbnail]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setThumbnail(file);
        }
    };
    const handleChangeDate = (e) => {
        setDate(e.target.value);
    };
    const handleChangeLampiran = (e, index) => {
        const files = Array.from(e.target.files);
        const newThumbnailsPreview = files.map(file => URL.createObjectURL(file));

        setLampiranPreview(prev => {
            const updatedPreviews = [...prev];
            updatedPreviews[index] = newThumbnailsPreview[0];
            return updatedPreviews;
        });

        setLampiran(prev => {
            const updatedFiles = [...prev];
            updatedFiles[index] = files[0];
            return updatedFiles;
        });
        if (index === inputCount - 1) {
            setInputCount(inputCount + 1);
        }
    };

    const addArticle = async () => {
        setIsLoading(true);
        let imageUrl = '';
        try {
            if (thumbnail) {
                const folder = 'article/';
                const imagePath = await uploadFile(thumbnail, folder);
                imageUrl = await getFile(imagePath);
            }

            let lampiranUrl = [];
            console.log(lampiran);
            for (let i = 0; i < lampiran.length; i++) {
                const folder = 'attachment/';
                const imagePath = await uploadFile(lampiran[i], folder);
                const url = await getFile(imagePath);
                lampiranUrl.push(url);
            }
            await addDoc(collection(db, "articles"), {
                title: title,
                content: content,
                thumbnail: imageUrl,
                date: date,
                lampiran: lampiranUrl
            })
                .then(() => {
                    toast.success('Berhasil menambahkan data');
                    router.push('/administrator/article');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title === '') {
            toast.warning('Judul harus diisi!');
            return;
        } else if (date === null) {
            toast.warning('Tanggal harus diisi');
            return;
        } else if (thumbnail === null) {
            toast.warning('Gambar Artikel harus diisi');
            return;
        } else if (content === '') {
            toast.warning('Isi Artikel harus diisi');
            return;
        } else if (lampiran.length === 0) {
            toast.warning('Lampiran harus diisi');
        }
        addArticle();
    }

    const handleImageDelete = async (data) => {
        setInputCount(inputCount - 1);
        setLampiran(prev => {
            const updatedFiles = prev.filter(item => item !== data);
            return updatedFiles;
        });
        setLampiranPreview(prev => {
            const updatedPreviews = prev.filter(item => item !== data);
            return updatedPreviews;
        });
    };

    return (
        <div className='flex flex-col min-h-screen bg-gradient-to-br from-slate-300 via-slate-200 to-purple-500'>
            <NavbarAdmin />
            <div className=" py-20">
                <div className="flex justify-center items-center ">
                    <div className="w-full mt-4 max-w-[1024px] px-6 min-w-[420px]:px-6">
                        <Card >
                            <CardHeader>
                                <p className="text-medium">Tambah Artikel</p>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <form onSubmit={handleSubmit}>
                                    <div className="">
                                        <div className='my-4'>
                                            <Input
                                                type="text"
                                                label='Judul'
                                                labelPlacement="outside"
                                                placeholder="Judul"
                                                name="title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                isRequired
                                            />
                                        </div>
                                        <div className="flex w-full flex-col gap-4 mb-4">
                                            <p className='w-full h-4 text-sm'>Tanggal Pelaksanaan<span className='text-red-500'>*</span></p>
                                            <input type="date" className=" w-full h-10 rounded-md bg-gray-100 text-gray-600" placeholder="Tanggal Pelaksanaan" onChange={(e) => { handleChangeDate(e) }} value={date ? date : ''} />
                                        </div>
                                        <div className='w-full md:bg-slate-100 p-2'>
                                            <label className='border-[2px] border-dashed border-stone-300 p-2 flex justify-center items-center min-h-40 w-fit min-w-40 max-w-80 rounded-2xl '>
                                                <input className='w-full h-full sr-only' type="file" accept="image/*" onChange={handleImageChange} />
                                                {thumbnailPreview ? (
                                                    <Image isZoomed src={thumbnailPreview} alt='preview' className='object-cover max-h-40 max-w-80 w-full rounded-lg' />
                                                ) :
                                                    (
                                                        <>
                                                            <div className='flex flex-col justify-center items-center'>
                                                                <MdImage size={32} className='text-gray-400' />
                                                                <p className='text-[14px] text-gray-400'>Unggah thumbnail</p>
                                                            </div>
                                                        </>
                                                    )}
                                            </label>
                                        </div>
                                        <p className='w-full h-4 text-sm my-4 '>Lampiran<span className='text-red-500'>*</span></p>
                                        <div className="flex flex-wrap  rounded-md md:bg-slate-100">
                                            {Array.from({ length: inputCount }).map((_, index) => (
                                                <label key={index} className='border-[2px] border-dashed border-stone-300 flex flex-col justify-center items-center min-h-40 w-fit min-w-40 max-w-80 rounded-2xl p-2 m-2'>
                                                    {lampiranPreview[index] ? (
                                                        <div className='relative'>
                                                            <Image
                                                                isZoomed
                                                                src={lampiranPreview[index]}
                                                                alt={`preview-${index}`}
                                                                className='object-cover max-h-40 max-w-80 w-full rounded-lg'

                                                            />
                                                            <MdClose
                                                                size={24}
                                                                className='z-50 absolute top-2 right-2 text-gray-600 cursor-pointer rounded-full bg-slate-100 bg-opacity-50 w-5 h-5'
                                                                onClick={() => handleImageDelete(lampiranPreview[index])}
                                                            />
                                                        </div>

                                                    ) : (
                                                        <div className='flex flex-col justify-center items-center w-full'>
                                                            <input
                                                                className='w-full h-full sr-only '
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => handleChangeLampiran(e, index)}

                                                            />
                                                            <MdImage size={32} className='text-gray-400' />
                                                            <p className='text-[14px] text-gray-400'>Tambahkan lampiran</p>
                                                        </div>
                                                    )
                                                    }
                                                </label>
                                            ))}
                                        </div>
                                        <p className='w-full h-4 text-sm mt-4 '>Isi konten <span className='text-red-500'>*</span></p>
                                        <div className="h-52 mb-4 mt-2">
                                            <ReactQuill
                                                theme="snow"
                                                name="content"
                                                id="content"
                                                value={content}
                                                placeholder="Isi Content"
                                                onChange={(value) => setContent(value)}
                                                className="sm:h-[80%] h-[70%]"
                                                modules={quillModules}
                                                required
                                            />
                                        </div>
                                        <Button color="primary" type="submit" className="mt-5" disabled={isLoading}>
                                            {isLoading ?
                                                <span className="loading-spinner text-white">
                                                    <Spinner color="white" size="sm" />
                                                </span> : 'Tambah'}
                                        </Button>
                                    </div>
                                </form>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default FormPage;
