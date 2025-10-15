import React from 'react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import {Head, Link, router, useForm} from '@inertiajs/react';
import Select from 'react-select';
import { XCircleIcon } from '@heroicons/react/24/solid';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import CreatableSelect from "react-select/creatable";

// Un pequeño componente para el Drag & Drop de imágenes
function ImageUploader({ onFilesAdded }) {
    const inputRef = React.useRef(null);
    // ... (Puedes copiar la lógica de Drag & Drop de Posts/Create.jsx aquí si lo deseas)
    return (
        <div>
            <input type="file" multiple accept="image/webp" onChange={e => onFilesAdded(Array.from(e.target.files))} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-smd-soft-green/10 file:text-smd-soft-green hover:file:bg-smd-soft-green/20"/>
            <p className="text-xs text-gray-500 mt-1">Sube una o más imágenes en formato WEBP (máx. 1MB cada una).</p>
        </div>
    );
}

export default function Edit({ hotel, amenities }) {
    const hotelData = hotel.data;

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PATCH',
        name: hotelData.name || '',
        address: hotelData.address || '',
        description: hotelData.description || '',
        price_range: hotelData.price_range || '',
        instagram: hotelData.instagram || '',
        facebook: hotelData.facebook || '',
        youtube: hotelData.youtube || '',
        phone: hotelData.phone || '',
        email: hotelData.email || '',
        web: hotelData.web || '',
        amenities: hotelData.amenities.map(a => a.id) || [],
        images: [],
        images_to_delete: [],
    });

    const amenityOptions = amenities.data.map(a => ({ value: a.id, label: a.name }));
    const selectedAmenities = amenityOptions.filter(o => data.amenities.includes(o.value));

    const handleAmenityChange = (selectedOptions) => {
        const values = selectedOptions ? selectedOptions.map(option => {
            if (option.__isNew__) {
                return option.value;
            }
            return option.value;
        }) : [];
        setData('amenities', values);
    };

    const handleNewImages = (files) => {
        setData('images', [...data.images, ...files]);
    };

    const removeExistingImage = (imageId) => {
        setData('images_to_delete', [...data.images_to_delete, imageId]);
    };

    const submit = (e) => {
        e.preventDefault();
        router.post(route('admin.hotels.update', hotelData), data, {
            forceFormData: true,
        });
        // post(route('admin.hotels.update', hotelData));
    };

    return (
        <>
            <Head title={`Editar Hotel: ${hotelData.name}`} />
            <h1 className="text-3xl font-bold">Editar Hotel</h1>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Información General</h2>
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
                    <h2 className="text-xl font-semibold mb-4">Comodidades (Amenities)</h2>
                    <CreatableSelect
                        isMulti
                        options={amenityOptions}
                        defaultValue={selectedAmenities}
                        onChange={handleAmenityChange}
                        className="mt-1"
                        placeholder="Selecciona o escribe para crear..."
                        formatCreateLabel={inputValue => `Añadir "${inputValue}"`}
                    />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Galería de Imágenes</h2>

                    {/* Imágenes existentes */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        {hotelData.images.filter(img => !data.images_to_delete.includes(img.id)).map(image => (
                            <div key={image.id} className="relative group">
                                <img src={image.url} className="w-full h-32 object-cover rounded-md" />
                                <button
                                    type="button"
                                    onClick={() => removeExistingImage(image.id)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <XCircleIcon className="h-5 w-5" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Input para nuevas imágenes */}
                    <ImageUploader onFilesAdded={handleNewImages} />
                    {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images}</p>}
                </div>

                <div className="flex justify-end gap-4">
                    <Link href={route('admin.hotels.index')} className="px-4 py-2 text-gray-600">Cancelar</Link>
                    <PrimaryButton disabled={processing} className="px-6 py-2 bg-smd-soft-green text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-400">Actualizar Hotel</PrimaryButton>
                </div>
            </form>
        </>
    );
}

Edit.layout = page => <AdminLayout children={page} title="Editar Hotel" />;
