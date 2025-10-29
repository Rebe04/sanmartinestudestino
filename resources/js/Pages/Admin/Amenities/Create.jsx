import React from 'react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import AmenityIcon from "@/Components/AmenityIcon.jsx";

export default function Create({ icons }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        icon: icons[0] || '', // Selecciona el primer ícono por defecto
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.amenities.store'));
    };

    return (
        <>
            <Head title="Crear Comodidad" />
            <h1 className="text-3xl font-bold text-smd-dark">Crear Nueva Comodidad</h1>

            <div className="mt-6 max-w-2xl bg-white rounded-lg shadow-md p-6">
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <InputLabel htmlFor="name" value="Nombre" />
                        <TextInput id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1 w-full" isFocused={true}/>
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="icon" value="Icono" />
                        <div className="flex items-center gap-4 mt-1">
                            <select id="icon" value={data.icon} onChange={(e) => setData('icon', e.target.value)} className="w-full rounded-md">
                                {icons.map(iconName => (
                                    <option key={iconName} value={iconName}>{iconName}</option>
                                ))}
                            </select>
                            {/* Vista previa del ícono seleccionado */}
                            <div className="p-2 border rounded-md">
                                <AmenityIcon iconName={data.icon} className="h-6 w-6 text-smd-soft-green" />
                            </div>
                        </div>
                        <InputError message={errors.icon} className="mt-2" />
                    </div>

                    <div className="flex justify-end gap-4">
                        <Link href={route('admin.amenities.index')} className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50">Cancelar</Link>
                        <PrimaryButton className="px-6 py-2 bg-smd-soft-green text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-400" disabled={processing}>Guardar</PrimaryButton>
                    </div>
                </form>
            </div>
        </>
    );
}

Create.layout = page => <AdminLayout children={page} title="Crear Comodidad" />;
