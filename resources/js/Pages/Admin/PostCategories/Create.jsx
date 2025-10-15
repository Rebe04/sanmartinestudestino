import React from 'react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.post-categories.store'));
    };

    return (
        <>
            <Head title="Crear Categoría" />
            <h1 className="text-3xl font-bold text-smd-dark">Crear Nueva Categoría</h1>

            <div className="mt-6 max-w-2xl bg-white rounded-lg shadow-md p-6">
                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="name" value="Nombre de la Categoría" />
                        <TextInput
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full"
                            isFocused={true}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end items-center gap-smd-16">
                        <Link href={route('admin.post-categories.index')} className="text-gray-600 hover:underline mr-4">Cancelar</Link>
                        <PrimaryButton className="px-6 py-2 bg-smd-soft-green text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-400" disabled={processing}>Guardar</PrimaryButton>
                    </div>
                </form>
            </div>
        </>
    );
}

Create.layout = page => <AdminLayout children={page} title="Crear Categoría" />;
