"use client";
import { Input, Button, Text, Image, Card, CardHeader, Divider, CardBody } from '@nextui-org/react';
import dynamic from 'next/dynamic';

import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import NavbarAdmin from '@/components/navbar/navbar-admin';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import { toast } from 'sonner';
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { uploadFile, getFile } from '@/lib/storage';
import { db } from "@/services/firebase/firebase";
import { useRouter } from 'next/navigation';
import { DatePicker } from "@nextui-org/react";
import { CalendarDate } from '@nextui-org/react';
import { set } from 'date-fns';

const FormPage = ({ params }) => {
    const { id } = params;
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchArticle = async () => {
            if (id) {
                const docRef = doc(db, "articles", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setTitle(data.title);
                    setContent(data.content);
                    setThumbnailPreview(data.thumbnail);

                } else {
                    toast.error('Artikel tidak ditemukan');
                    router.push('/administrator/article');
                }
            }
        };
        fetchArticle();
    }, [id]);


    useEffect(() => {
        const fetchArticle = async () => {
            if (id) {
                const docRef = doc(db, "articles", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setTitle(data.title);
                    setContent(data.content);
                    setThumbnailPreview(data.thumbnail);

                } else {
                    toast.error('Artikel tidak ditemukan');
                    router.push('/administrator/article');
                }
            }
        };
        fetchArticle();
    }, [id]);


    useEffect(() => {
        const fetchArticle = async () => {
            if (id) {
                const docRef = doc(db, "articles", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setTitle(data.title);
                    setContent(data.content);
                    setThumbnailPreview(data.thumbnail);
                    setDate(data.date);
                } else {
                    toast.error('Artikel tidak ditemukan');
                    router.push('/administrator/article');
                }
            }
        };
        fetchArticle();
    }, [id]);

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

    const updateArticle = async () => {
        setIsLoading(true);
        let imageUrl = thumbnailPreview;
        if (thumbnail) {
            const folder = 'article/';
            const imagePath = await uploadFile(thumbnail, folder);
            imageUrl = await getFile(imagePath);
        }
        const docRef = doc(db, "articles", id);
        await updateDoc(docRef, {
            title: title,
            content: content,
            thumbnail: imageUrl,
            date: date,
        })
            .then(() => {
                toast.success('Berhasil memperbarui data', {
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
        } else if (thumbnail === null && !thumbnailPreview) {
            toast.warning('Gambar Artikel harus diisi');
            return;
        } else if (content === '') {
            toast.warning('Isi Artikel harus diisi');
            return;
        } else if (date === null) {
            toast.warning('Tanggal harus diisi');
            return;
        }
        updateArticle();
    }

    return (
        <div className='flex flex-col min-h-screen bg-gradient-to-br from-slate-300 via-slate-200 to-purple-500'>
            <NavbarAdmin />
            <div className="h-full  py-20">
                <div className="flex justify-center items-center h-full">
                    <div className="w-full max-w-[1024px] px-6 min-w-[420px]:px-6">
                        <Button color="danger" onClick={() => router.back()} className="text-white my-2 font-semibold">Kembali</Button>
                        <Card>
                            <CardHeader>
                                <p className="text-medium">Ubah Artikel</p>
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
                                            <input type="date" className=" w-36 h-10" placeholder="Tanggal Pelaksanaan" onChange={(e) => { handleChangeDate(e) }} value={date ? date : ''} />
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
                                            {isLoading ? <span className="loading-spinner text-white"></span> : 'Simpan'}
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
