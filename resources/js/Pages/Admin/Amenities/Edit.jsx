import React from 'react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import AmenityIcon from "@/Components/AmenityIcon.jsx";

// Recibe la 'amenity' a editar y la lista de 'icons'
export default function Edit({ amenity, icons }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: amenity.data.name || '',
        icon: amenity.data.icon || '',
    });

    const submit = (e) => {
        e.preventDefault();
        // Usa el método 'patch' para la actualización
        patch(route('admin.amenities.update', amenity.data.id));
    };

    return (
        <>
            <Head title={`Editar: ${amenity.data.name}`} />
            <h1 className="text-3xl font-bold text-smd-dark">Editar Comodidad</h1>

            <div className="mt-6 max-w-2xl bg-white rounded-lg shadow-md p-6">
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <InputLabel htmlFor="name" value="Nombre" />
                        <TextInput
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 w-full"
                            isFocused={true}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="icon" value="Icono" />
                        <div className="flex items-center gap-4 mt-1">
                            <select
                                id="icon"
                                value={data.icon}
                                onChange={(e) => setData('icon', e.target.value)}
                                className="w-full rounded-md"
                            >
                                {icons.map(iconName => (
                                    <option key={iconName} value={iconName}>{iconName}</option>
                                ))}
                            </select>
                            <div className="p-2 border rounded-md">
                                <AmenityIcon iconName={data.icon} className="h-6 w-6 text-smd-soft-green" />
                            </div>
                        </div>
                        <InputError message={errors.icon} className="mt-2" />
                    </div>

                    <div className="flex justify-end gap-4">
                        <Link href={route('admin.amenities.index')} className="text-gray-600 hover:underline">Cancelar</Link>
                        <PrimaryButton disabled={processing}>Actualizar</PrimaryButton>
                    </div>
                </form>
            </div>
        </>
    );
}

Edit.layout = page => <AdminLayout children={page} title="Editar Comodidad" />;
