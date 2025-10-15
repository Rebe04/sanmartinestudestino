import React, { useState } from 'react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { Link, Head, useForm } from '@inertiajs/react';
import { PencilSquareIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import Pagination from "@/Components/Utils/Pagination.jsx";
import Modal from "@/Components/Utils/Modal.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import AmenityIcon from "@/Components/AmenityIcon.jsx";

export default function Index({ amenities }) {
    const { data, meta } = amenities;
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [amenityToDelete, setAmenityToDelete] = useState(null);
    const { delete: destroy, processing } = useForm();

    const confirmDeletion = (amenity) => {
        setAmenityToDelete(amenity);
        setConfirmingDeletion(true);
    };

    const closeModal = () => setConfirmingDeletion(false);

    const deleteAmenity = (e) => {
        e.preventDefault();
        destroy(route('admin.amenities.destroy', amenityToDelete.id), {
            onSuccess: () => closeModal(),
        });
    };

    return (
        <>
            <Head title="Gestionar Comodidades" />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-smd-dark">Comodidades (Amenities)</h1>
                <Link href={route('admin.amenities.create')} className="inline-flex items-center gap-2 bg-smd-soft-green text-white font-bold px-4 py-2 rounded-lg hover:bg-green-700">
                    <PlusIcon className="h-5 w-5" />
                    Crear Comodidad
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Icono</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Nombre</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((amenity) => (
                        <tr key={amenity.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="p-4 text-smd-dark">
                                <AmenityIcon iconName={amenity.icon} className="h-6 w-6" />
                            </td>
                            <td className="p-4 font-medium text-smd-dark">{amenity.name}</td>
                            <td className="p-4">
                                <div className="flex gap-2">
                                    <Link href={route('admin.amenities.edit', amenity.id)} className="text-blue-600 hover:text-blue-900" title="Editar">
                                        <PencilSquareIcon className="h-5 w-5" />
                                    </Link>
                                    <button onClick={() => confirmDeletion(amenity)} className="text-red-600 hover:text-red-900" title="Eliminar">
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6">
                <Pagination links={meta.links} />
            </div>

            <Modal show={confirmingDeletion} onClose={closeModal}>
                <form onSubmit={deleteAmenity} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">¿Eliminar Comodidad?</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Se eliminará la comodidad <span className="font-bold">"{amenityToDelete?.name}"</span>.
                    </p>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>
                        <DangerButton className="ms-3" disabled={processing}>Eliminar</DangerButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}

Index.layout = page => <AdminLayout children={page} title="Comodidades" />;
