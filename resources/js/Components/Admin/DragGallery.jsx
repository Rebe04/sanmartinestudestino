import React, {useRef, useState} from "react";
import {PhotoIcon, XCircleIcon} from "@heroicons/react/24/solid/index.js";
import InputError from "@/Components/InputError.jsx";

export default function DragGallery({setData, data, errors}) {
    const [dragActive, setDragActive] = useState(false);
    const galleryInputRef = useRef(null);

    const handleFiles = (files) => {
        const newFiles = Array.from(files).filter(file => {
            if (file.type !== 'image/webp') { alert(`El archivo '${file.name}' no es WEBP.`); return false; }
            if (file.size > 1024 * 1024) { alert(`El archivo '${file.name}' pesa más de 1MB.`); return false; }
            return true;
        });
        setData('images', [...data.images, ...newFiles]);
    };

    const handleDrag = (e) => { e.preventDefault(); e.stopPropagation(); setDragActive(e.type === "dragenter" || e.type === "dragover"); };
    const handleDrop = (e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); if (e.dataTransfer.files) handleFiles(e.dataTransfer.files); };
    const handleChange = (e) => { e.preventDefault(); if (e.target.files) handleFiles(e.target.files); };
    const onGalleryButtonClick = () => { galleryInputRef.current.click(); };
    const removeGalleryImage = (indexToRemove) => {
        const fileToRemove = data.images[indexToRemove];
        if (fileToRemove) URL.revokeObjectURL(URL.createObjectURL(fileToRemove));
        setData('images', data.images.filter((_, index) => index !== indexToRemove));
    };
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-smd-dark">Galería de Imágenes WEBP de menos de 1MB cada una.</h2>
            <div onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} className={`p-6 border-2 border-dashed rounded-md flex flex-col items-center justify-center text-center ${dragActive ? 'border-smd-soft-green bg-green-50' : 'border-gray-300'}`}>
                <input ref={galleryInputRef} type="file" multiple accept="image/webp" className="hidden" onChange={handleChange} />
                <PhotoIcon className="h-12 w-12 text-gray-400"/>
                <p className="text-gray-500 mt-2">Arrastra y suelta tus imágenes aquí</p>
                <p className="text-sm text-gray-400 my-2">o</p>
                <button type="button" onClick={onGalleryButtonClick} className="px-4 py-2 bg-gray-200 rounded-md text-sm font-semibold hover:bg-gray-300">Seleccionar Archivos</button>
            </div>
            {data.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {data.images.map((file, index) => (
                        <div key={index} className="relative group">
                            <img src={URL.createObjectURL(file)} alt={`preview ${index}`} className="w-full h-24 object-cover rounded-md border"/>
                            <button type="button" onClick={() => removeGalleryImage(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100" title="Quitar imagen"><XCircleIcon className="h-5 w-5"/></button>
                        </div>
                    ))}
                </div>
            )}
            <InputError message={errors.images} className="mt-2" />
        </div>
    )
}
