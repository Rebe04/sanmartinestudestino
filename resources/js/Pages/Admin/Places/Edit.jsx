import React, { useState, useRef } from 'react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import { PhotoIcon, XCircleIcon } from "@heroicons/react/24/solid";
import DragGallery from "@/Components/Admin/DragGallery.jsx";

export default function Edit({ place, placeCategories }) {
    const placeData = place.data;
    const { data, setData, post, processing, errors, isDirty } = useForm({
        _method: 'PATCH',
        name: placeData.name || '',
        place_category_id: placeData.place_category.id || '',
        address: placeData.address || '',
        price: placeData.price || '',
        description: placeData.description || '',
        instagram: placeData.instagram || '',
        facebook: placeData.facebook || '',
        youtube: placeData.youtube || '',
        phone: placeData.phone || '',
        email: placeData.email || '',
        images: [],
        images_to_delete: [],
    });

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

    const removeExistingImage = (imageId) => {
        setData('images_to_delete', [...data.images_to_delete, imageId]);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.places.update', placeData.slug), { forceFormData: true });
    };

    return (
        <>
            <Head title={`Editar: ${placeData.name}`} />
            <h1 className="text-3xl font-bold text-smd-dark mb-6">Editar Lugar</h1>

            <form onSubmit={submit} className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-smd-dark">Información del Lugar</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <InputLabel htmlFor="name" value="Nombre del Lugar" />
                            <TextInput id="name" value={data.name} onChange={e => setData('name', e.target.value)} className="mt-1 w-full" isFocused={true}/>
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="place_category_id" value="Categoría" />
                            <select id="place_category_id" value={data.place_category_id} onChange={e => setData('place_category_id', e.target.value)} className="mt-1 w-full border-gray-300 rounded-md shadow-sm">
                                <option value="">Selecciona una categoría</option>
                                {placeCategories.data.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                            </select>
                            <InputError message={errors.place_category_id} className="mt-2" />
                        </div>
                        <div className="md:col-span-2">
                            <InputLabel htmlFor="address" value="Dirección" />
                            <TextInput id="address" value={data.address} onChange={e => setData('address', e.target.value)} className="mt-1 w-full"/>
                            <InputError message={errors.address} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="price" value="Precio (ej. $10.000, Gratis, etc.)" />
                            <TextInput id="price" value={data.price} onChange={e => setData('price', e.target.value)} className="mt-1 w-full"/>
                            <InputError message={errors.price} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="phone" value="Teléfono" />
                            <TextInput id="phone" value={data.phone} onChange={e => setData('phone', e.target.value)} className="mt-1 w-full"/>
                            <InputError message={errors.phone} className="mt-2" />
                        </div>
                        <div className="md:col-span-2">
                            <InputLabel htmlFor="description" value="Descripción" />
                            <textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} rows="4" className="mt-1 w-full border-gray-300 rounded-md"></textarea>
                            <InputError message={errors.description} className="mt-2" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-smd-dark">Redes Sociales</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div><InputLabel htmlFor="email" value="Email" /><TextInput id="email" type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="mt-1 w-full"/><InputError message={errors.email} className="mt-2" /></div>
                            <div><InputLabel htmlFor="web" value="Página Web" /><TextInput id="web" value={data.web} onChange={e => setData('web', e.target.value)} className="mt-1 w-full"/><InputError message={errors.web} className-="mt-2" /></div>
                            <div><InputLabel htmlFor="facebook" value="Facebook" /><TextInput id="facebook" value={data.facebook} onChange={e => setData('facebook', e.target.value)} className="mt-1 w-full"/><InputError message={errors.facebook} className="mt-2" /></div>
                            <div><InputLabel htmlFor="instagram" value="Instagram" /><TextInput id="instagram" value={data.instagram} onChange={e => setData('instagram', e.target.value)} className="mt-1 w-full"/><InputError message={errors.instagram} className="mt-2" /></div>
                            <div><InputLabel htmlFor="youtube" value="YouTube" /><TextInput id="youtube" value={data.youtube} onChange={e => setData('youtube', e.target.value)} className="mt-1 w-full"/><InputError message={errors.youtube} className="mt-2" /></div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-smd-dark">Galería de Imágenes WEBP de menos de 1MB cada una.</h2>

                    <h3 className="text-lg font-medium text-gray-600 mb-4">Imágenes Actuales</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                        {placeData.images.filter(img => !data.images_to_delete.includes(img.id)).map(image => (
                            <div key={image.id} className="relative group">
                                <img src={image.url} className="w-full h-24 object-cover rounded-md border" />
                                <button type="button" onClick={() => removeExistingImage(image.id)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100" title="Marcar para eliminar"><XCircleIcon className="h-5 w-5"/></button>
                            </div>
                        ))}
                    </div>

                    <h3 className="text-lg font-medium text-gray-600 mb-4">Añadir Nuevas Imágenes</h3>
                    <DragGallery data={data} setData={setData} errors={errors} />
                </div>

                <div className="flex justify-end gap-4 py-4">
                    <Link href={route('admin.places.index')} className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50">Cancelar</Link>
                    <PrimaryButton className="px-6 py-2 bg-smd-soft-green text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-400" disabled={processing || !isDirty}>Actualizar Lugar</PrimaryButton>
                </div>
            </form>
        </>
    );
}

Edit.layout = page => <AdminLayout children={page} title="Editar Lugar" />;
