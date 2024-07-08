import React, { useState } from 'react'
import { Button, Input, Image } from '@nextui-org/react'
import ReactQuill from 'react-quill'
import { quillModules } from '@/components/constant/constant'

export const FormArticle = ({ setTitle, handleChangeDate, hann }) => {
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
                {isLoading ? <span className="loading-spinner text-white"></span> : 'Tambah'}
            </Button>
        </div>
    </form>
}
