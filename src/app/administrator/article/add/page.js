"use client";
import { Input, Button, Text, Image, Card, CardHeader, Divider, CardBody } from '@nextui-org/react';
import dynamic from 'next/dynamic';

import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import NavbarAdmin from '@/components/navbar/navbar-admin';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import { toast } from 'sonner';
import { collection, addDoc } from "firebase/firestore";
import { uploadFile, getFile } from '@/lib/storage';
import { db } from "@/services/firebase/firebase";
import { useRouter } from 'next/navigation';
const FormPage = () => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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


    const addArticle = async () => {
        setIsLoading(true);
        let imageUrl = '';
        if (thumbnail) {
            const folder = 'article/';
            const imagePath = await uploadFile(thumbnail, folder);
            imageUrl = await getFile(imagePath);
        }
        await addDoc(collection(db, "articles"), {
            title: title,
            content: content,
            thumbnail: imageUrl,
            date: date,
        })
            .then(() => {
                toast.success('Berhasil menambahkan data', {
                    position: 'top-right',
                });
                router.push('/administrator/article');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title === '') {
            toast.warning('Judul harus diisi!');
            return;
        } else if (thumbnail === null) {
            toast.warning('Gambar Artikel harus diisi');
            return;
        } else if (content === '') {
            toast.warning('Isi Artikel harus diisi');
            return;
        } else if (date === null) {
            toast.warning('Tanggal harus diisi');
            return;
        }
        addArticle();
    }

    return (
        <div className='flex flex-col min-h-screen bg-gradient-to-br from-slate-300 via-slate-200 to-purple-500'>
            <NavbarAdmin />
            <div className="h-full  py-20">
                <div className="flex justify-center items-center h-full">
                    <div className="w-full mt-4 max-w-[1024px] px-6 min-w-[420px]:px-6">
                        <Card>
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
                                        <div className="flex w-full flex-col gap-4">
                                            <p className='w-full h-4 text-sm'>Tanggal Pelaksanaan<span className='text-red-500'>*</span></p>
                                            <input type="date" className=" w-36 h-10" placeholder="Tanggal Pelaksanaan" onChange={(e) => { handleChangeDate(e) }} />
                                        </div>
                                        <p className='w-full h-4 text-sm mt-4 mb-2'>Thumbnail <span className='text-red-500'>*</span></p>
                                        <input className='w-full h-full mb-4' type="file" accept="image/*" onChange={handleImageChange} />
                                        {thumbnailPreview && (
                                            <Image isZoomed src={thumbnailPreview} width='50%' alt='preview' />
                                        )}
                                        <p className='w-full h-4 text-sm mt-4 '>Isi konten <span className='text-red-500'>*</span></p>
                                        <div className="h-52 mb-4 mt-2">
                                            <ReactQuill
                                                theme="snow"
                                                onChange={(value) => setContent(value)}
                                                placeholder="Isi Content"
                                                className="sm:h-[80%] h-[70%]"
                                                value={content}
                                            />
                                        </div>
                                        <Button color="primary" type="submit" className="mt-5" disabled={isLoading}>
                                            {isLoading ? <span className="loading-spinner text-white"></span> : 'Tambah'}
                                        </Button>
                                    </div>
                                </form>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormPage;
