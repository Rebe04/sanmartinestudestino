import React from 'react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";

// Recibe la categoría a editar como prop
export default function Edit({ food_category }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: food_category.data.name || '',
        description: food_category.data.description || '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('admin.food-categories.update', food_category.data.slug));
    };

    return (
        <>
            <Head title={`Editar: ${food_category.data.name}`} />
            <h1 className="text-3xl font-bold text-smd-dark">Editar Categoría</h1>

            <div className="mt-6 max-w-2xl bg-white rounded-lg shadow-md p-6">
                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="name" value="Nombre de la Categoría" />
                        <TextInput
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full mb-smd-16"
                            isFocused={true}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div>
                        <label>Descripción</label>
                        <textarea value={data.description} onChange={e => setData('description', e.target.value)} rows="3" className="mt-1 block w-full rounded-md"></textarea>
                        {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                    </div>
                    <div className="mt-6 flex justify-end items-center gap-smd-16">
                        <Link href={route('admin.food-categories.index')} className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50">Cancelar</Link>
                        <PrimaryButton className="px-6 py-2 bg-smd-soft-green text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-400" disabled={processing}>Actualizar</PrimaryButton>
                    </div>
                </form>
            </div>
        </>
    );
}

Edit.layout = page => <AdminLayout children={page} title="Editar Categoría" />;
