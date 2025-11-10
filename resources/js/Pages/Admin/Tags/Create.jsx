import React from 'react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { HexColorPicker } from 'react-colorful';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        color: '#f6c132',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.tags.store'));
    };

    return (
        <>
            <Head title="Crear Tag" />
            <h1 className="text-3xl font-bold">Crear Nuevo Tag</h1>
            <form onSubmit={submit} className="mt-6 max-w-2xl bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <InputLabel htmlFor="name" value="Nombre del Tag" />
                    <TextInput id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1 w-full" isFocused={true}/>
                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="color" value="Color" />
                    <div className="flex items-center gap-4 mt-1">
                        <HexColorPicker color={data.color} onChange={(color) => setData('color', color)} />
                        <div style={{ backgroundColor: data.color }} className="w-16 h-16 rounded-lg border border-gray-300"></div>
                        <TextInput id="color" value={data.color} onChange={(e) => setData('color', e.target.value)} className="w-full"/>
                    </div>
                    <InputError message={errors.color} className="mt-2" />
                </div>
                <div className="mt-6 flex justify-end gap-4">
                    <Link href={route('admin.tags.index')} className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50">Cancelar</Link>
                    <PrimaryButton className="px-6 py-2 bg-smd-soft-green text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-400" disabled={processing}>Guardar</PrimaryButton>
                </div>
            </form>
        </>
    );
}
Create.layout = page => <AdminLayout children={page} title="Crear Tag" />;
