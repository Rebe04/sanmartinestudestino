import React, { useState, useRef } from 'react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import { PhotoIcon, XCircleIcon } from "@heroicons/react/24/solid";
import DragGallery from "@/Components/Admin/DragGallery.jsx";

export default function Create({ placeCategories }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '', address: '', price: '', description: '',
        instagram: '', facebook: '', youtube: '', phone: '', email: '',
        place_category_id: '',
        images: [],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.places.store'), { forceFormData: true });
    };

    return (
        <>
            <Head title="Crear Lugar" />
            <h1 className="text-3xl font-bold text-smd-dark mb-6">Crear Nuevo Lugar</h1>

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

                <DragGallery data={data} setData={setData} errors={errors} />

                <div className="flex justify-end gap-4 py-4">
                     <Link href={route('admin.places.index')} className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50">Cancelar</Link>
                    <PrimaryButton className="px-6 py-2 bg-smd-soft-green text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-400" disabled={processing}>Guardar Lugar</PrimaryButton>
                </div>
            </form>
        </>
    );
}

Create.layout = page => <AdminLayout children={page} title="Crear Lugar" />;
