import React, { useState, useRef } from 'react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Select from 'react-select'; // Asegúrate de haber hecho 'npm install react-select'
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import { PhotoIcon } from "@heroicons/react/24/solid";
import CreatableSelect from "react-select/creatable";

export default function Create({ amenities }) {
    // --- LÓGICA DEL FORMULARIO ---
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        address: '',
        description: '',
        price_range: '',
        instagram: '',
        facebook: '',
        youtube: '',
        phone: '',
        email: '',
        web: '',
        amenities: [],
        images: [],
    });

    // --- LÓGICA PARA EL CARGADOR DE IMÁGENES ---
    const [dragActive, setDragActive] = useState(false);
    const [imagePreviews, setImagePreviews] = useState([]);
    const inputRef = useRef(null);


    const handleFiles = (files) => {
        const newFiles = Array.from(files);

        // Validaciones en el frontend
        const validFiles = newFiles.filter(file => {
            if (file.type !== 'image/webp') {
                alert(`El archivo '${file.name}' no es formato WEBP.`);
                return false;
            }
            if (file.size > 1024 * 1024) { // 1MB
                alert(`El archivo '${file.name}' pesa más de 1MB.`);
                return false;
            }
            return true;
        });

        // Añade los archivos válidos al estado del formulario
        setData('images', [...data.images, ...validFiles]);

        // Crea las URLs para las vistas previas
        const newPreviews = validFiles.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...newPreviews]);
    };

    const handleDrag = (e) => { e.preventDefault(); e.stopPropagation(); setDragActive(e.type === "dragenter" || e.type === "dragover"); };
    const handleDrop = (e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); if (e.dataTransfer.files) handleFiles(e.dataTransfer.files); };
    const handleChange = (e) => { e.preventDefault(); if (e.target.files) handleFiles(e.target.files); };
    const onButtonClick = () => { inputRef.current.click(); };

    // --- LÓGICA PARA EL SELECTOR DE AMENITIES ---
    const amenityOptions = amenities.data.map(amenity => ({ value: amenity.id, label: amenity.name }));
    const handleAmenityChange = (selectedOptions) => {
        const values = selectedOptions ? selectedOptions.map(option => {
            if (option.__isNew__) {
                return option.value;
            }
            return option.value;
        }) : [];
        setData('amenities', values);
    };

    // --- ENVÍO DEL FORMULARIO ---
    const submit = (e) => {
        e.preventDefault();
        post(route('admin.hotels.store'));
    };

    return (
        <>
            <Head title="Crear Nuevo Hotel" />
            <h1 className="text-3xl font-bold text-smd-dark">Crear Nuevo Hotel</h1>

            <form onSubmit={submit} className="mt-6 space-y-6">
                {/* --- SECCIÓN DE INFORMACIÓN GENERAL --- */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-smd-dark">Información General</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <InputLabel htmlFor="name" value="Nombre del Hotel" />
                            <TextInput id="name" value={data.name} onChange={e => setData('name', e.target.value)} className="mt-1 block w-full" isFocused={true}/>
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                        {/* Price Range */}
                        <div>
                            <InputLabel htmlFor="price_range" value="Rango de Precio ($, $$, $$$)" />
                            <TextInput id="price_range" value={data.price_range} onChange={e => setData('price_range', e.target.value)} className="mt-1 block w-full"/>
                            <InputError message={errors.price_range} className="mt-2" />
                        </div>
                        {/* Address */}
                        <div className="md:col-span-2">
                            <InputLabel htmlFor="address" value="Dirección" />
                            <TextInput id="address" value={data.address} onChange={e => setData('address', e.target.value)} className="mt-1 block w-full"/>
                            <InputError message={errors.address} className="mt-2" />
                        </div>
                        {/* Description */}
                        <div className="md:col-span-2">
                            <InputLabel htmlFor="description" value="Descripción" />
                            <textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} rows="5" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
                            <InputError message={errors.description} className="mt-2" />
                        </div>
                    </div>
                </div>

                {/* --- SECCIÓN DE CONTACTO Y REDES --- */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-smd-dark">Contacto y Redes Sociales</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><InputLabel htmlFor="phone" value="Teléfono" /><TextInput id="phone" value={data.phone} onChange={e => setData('phone', e.target.value)} className="mt-1 w-full"/><InputError message={errors.phone} className="mt-2" /></div>
                        <div><InputLabel htmlFor="email" value="Email" /><TextInput id="email" type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="mt-1 w-full"/><InputError message={errors.email} className="mt-2" /></div>
                        <div><InputLabel htmlFor="web" value="Página Web" /><TextInput id="web" type="url" value={data.web} onChange={e => setData('web', e.target.value)} className="mt-1 w-full"/><InputError message={errors.web} className="mt-2" /></div>
                        <div><InputLabel htmlFor="instagram" value="Instagram" /><TextInput id="instagram" type="url" value={data.instagram} onChange={e => setData('instagram', e.target.value)} className="mt-1 w-full"/><InputError message={errors.instagram} className="mt-2" /></div>
                        <div><InputLabel htmlFor="facebook" value="Facebook" /><TextInput id="facebook" type="url" value={data.facebook} onChange={e => setData('facebook', e.target.value)} className="mt-1 w-full"/><InputError message={errors.facebook} className="mt-2" /></div>
                        <div><InputLabel htmlFor="youtube" value="YouTube" /><TextInput id="youtube" type="url" value={data.youtube} onChange={e => setData('youtube', e.target.value)} className="mt-1 w-full"/><InputError message={errors.youtube} className="mt-2" /></div>
                    </div>
                </div>

                {/* --- SECCIÓN DE AMENITIES --- */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-smd-dark">Comodidades (Amenities)</h2>
                    <CreatableSelect
                        isMulti
                        options={amenityOptions}
                        // defaultValue={selectedAmenities} // En Edit.jsx
                        onChange={handleAmenityChange}
                        className="mt-1"
                        placeholder="Selecciona o escribe para crear..."
                        formatCreateLabel={inputValue => `Añadir "${inputValue}"`}
                    />
                    <InputError message={errors.amenities} className="mt-2" />
                </div>

                {/* --- SECCIÓN DE IMÁGENES --- */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-smd-dark">Galería de Imágenes</h2>
                    <div onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} className={`p-6 border-2 border-dashed rounded-md flex flex-col items-center justify-center text-center ${dragActive ? 'border-smd-soft-green bg-green-50' : 'border-gray-300'}`}>
                        <input ref={inputRef} type="file" multiple accept="image/webp" className="hidden" onChange={handleChange} />
                        <PhotoIcon className="h-12 w-12 text-gray-400"/>
                        <p className="text-gray-500 mt-2">Arrastra y suelta tus imágenes aquí</p>
                        <p className="text-sm text-gray-400 my-2">o</p>
                        <button type="button" onClick={onButtonClick} className="px-4 py-2 bg-gray-200 rounded-md text-sm font-semibold hover:bg-gray-300">Seleccionar Archivos</button>
                        <p className="text-xs text-gray-400 mt-2">WEBP de menos de 1MB cada una.</p>
                    </div>
                    {imagePreviews.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {imagePreviews.map((src, index) => (
                                <div key={index} className="relative">
                                    <img src={src} alt={`preview ${index}`} className="w-full h-24 object-cover rounded-md"/>
                                </div>
                            ))}
                        </div>
                    )}
                    <InputError message={errors.images} className="mt-2" />
                </div>

                {/* --- BOTONES DE ACCIÓN --- */}
                <div className="flex justify-end gap-4 py-6">
                    <Link href={route('admin.hotels.index')} className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150">Cancelar</Link>
                    <PrimaryButton className="px-6 py-2 bg-smd-soft-green text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-400" disabled={processing}>Crear Hotel</PrimaryButton>
                </div>
            </form>
        </>
    );
}

Create.layout = page => <AdminLayout children={page} title="Crear Hotel" />;
