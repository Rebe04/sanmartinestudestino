import React from 'react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";

export default function Edit({ eventCategory }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: eventCategory.data.name || '',
        description: eventCategory.data.description || '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('admin.event-categories.update', eventCategory.data.slug));
    };

    return (
        <>
            <Head title={`Editar: ${eventCategory.data.name}`} />
            <h1 className="text-3xl font-bold text-smd-dark">Editar Categoría</h1>
            <div className="mt-6 max-w-2xl bg-white rounded-lg shadow-md p-6">
                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="name" value="Nombre de la Categoría" />
                        <TextInput id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1 block w-full" isFocused={true}/>
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="md:col-span-2 mt-smd-16">
                        <InputLabel htmlFor="description" value="Descripción" />
                        <textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} rows="4" className="mt-1 w-full border-gray-300 rounded-md"></textarea>
                        <InputError message={errors.description} className="mt-2" />
                    </div>
                    <div className="mt-6 flex justify-end gap-4 py-4">
                        <Link href={route('admin.event-categories.index')} className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50">Cancelar</Link>
                        <PrimaryButton className="px-6 py-2 bg-smd-soft-green text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-400" disabled={processing}>Actualizar</PrimaryButton>
                    </div>
                </form>
            </div>
        </>
    );
}
Edit.layout = page => <AdminLayout children={page} title="Editar Categoría" />;
