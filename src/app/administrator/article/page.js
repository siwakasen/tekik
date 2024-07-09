"use client"
import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    getKeyValue,
} from "@nextui-org/react";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";


import NavbarAdmin from "@/components/navbar/navbar-admin";
import { useRouter } from "next/navigation";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/services/firebase/firebase";
import { useEffect, useState } from "react";
import { Image } from "@nextui-org/react";
import { toast } from "sonner";
import { storage } from '@/services/firebase/firebase';
import { ref, deleteObject } from 'firebase/storage';

export default function Page() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [id, setID] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const q = collection(db, "articles");
    const router = useRouter();

    const fetchData = async () => {
        const querySnapshot = await getDocs(q);
        setData(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    async function deleteFile(filePath) {
        const fileRef = ref(storage, filePath);
        try {
            await deleteObject(fileRef);
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    }
    const handleDelete = async (id, thumbnail) => {
        await deleteDoc(doc(db, "articles", id)).then(() => {
            toast.success("Data berhasil dihapus");
            fetchData();
        });
        await deleteFile(thumbnail);
        console.log(id, thumbnail);
        setLoading(!loading);
    }

    const handleAdd = async () => {
        router.push("/administrator/article/add");
    }

    const handleEdit = (id) => {
        router.push(`/administrator/article/edit/${id}`);
    }
    const handleOpen = (id, thumbnail) => {
        onOpen();
        setID(id);
        setThumbnail(thumbnail);
    }

    const columns = [
        {
            key: "title",
            title: "JUDUL",
        },
        {
            key: "thumbnail",
            title: "THUMBNAIL",
        },
        {
            key: "content",
            title: "ISI KONTEN",
        },
        {
            key: "date",
            title: "TANGGAL PELAKSANAAN",
        },
        {
            key: "action",
            title: "ACTION",
        }
    ];

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <main>

            <div className="flex flex-col h-screen bg-gradient-to-br from-slate-300 via-slate-200  to-sky-300">
                <NavbarAdmin />
                <div className="flex justify-center w-full   h-full">
                    <div className="w-full max-w-screen-2xl px-2 py-10">
                        <div className="flex my-2 justify-start" >
                            <Button onClick={handleAdd} color="success" className="text-white font-semibold     " >Tambah Artikel</Button>
                        </div>
                        <Table aria-label="Example table with dynamic content">
                            <TableHeader  >
                                <TableColumn className="w-8/12 md:w-auto">JUDUL</TableColumn>
                                <TableColumn className="hidden md:table-cell">THUMBNAIL</TableColumn>
                                <TableColumn className="hidden md:table-cell">ISI KONTEN</TableColumn>
                                <TableColumn className="hidden md:table-cell">TANGGAL PELAKSANAAN</TableColumn>
                                <TableColumn >ACTION</TableColumn>
                            </TableHeader>
                            <TableBody items={data} >
                                {(item) => (
                                    <TableRow key={item.title}>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.key}
                                                className={['thumbnail', 'content', 'date'].includes(column.key) ? 'hidden md:table-cell' : ''}
                                            >
                                                {getKeyValue(item, column.key) ? (
                                                    column.key === 'thumbnail' ? (
                                                        <Image src={getKeyValue(item, column.key)} alt="thumbnail" className="w-20 h-20" />
                                                    ) : column.key === 'content' ? (
                                                        getKeyValue(item, column.key).slice(0, 50) + "..."
                                                    ) : (
                                                        getKeyValue(item, column.key)
                                                    )
                                                ) : (
                                                    <div className="flex gap-2 justify-start ">
                                                        <Button onClick={() => handleEdit(item.id)} size="small" color="primary">
                                                            Ubah
                                                        </Button>
                                                        <Button size="small" color="danger" onClick={() => { handleOpen(item.id, item.thumbnail) }}>
                                                            Hapus
                                                        </Button>
                                                    </div>
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                    </div>
                </div>
            </div >
            <Modal
                placement="bottom-center"
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                motionProps={{
                    variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: "easeOut",
                            },
                        },
                        exit: {
                            y: -20,
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: "easeIn",
                            },
                        },
                    }
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Hapus Artikel</ModalHeader>
                            <ModalBody>
                                <p>
                                    Apakah Anda yakin ingin menghapus data ini?
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Tidak
                                </Button>
                                <Button color="primary" onPress={() => { handleDelete(id, thumbnail); onClose() }}>
                                    Ya
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </main >
    )
}
