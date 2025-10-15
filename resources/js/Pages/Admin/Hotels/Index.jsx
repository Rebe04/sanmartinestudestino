import React, { useState } from 'react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { Link, Head, useForm } from '@inertiajs/react';
import { PencilSquareIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import Pagination from "@/Components/Utils/Pagination.jsx";
import Modal from "@/Components/Utils/Modal.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";

export default function Index({ hotels }) {
    // El objeto 'hotels' ya viene con la estructura de paginación ('data', 'meta', 'links')
    const { data, meta } = hotels;

    // --- Lógica para el modal de confirmación de borrado ---
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [hotelToDelete, setHotelToDelete] = useState(null);
    const { delete: destroy, processing } = useForm();

    const confirmDeletion = (hotel) => {
        setHotelToDelete(hotel);
        setConfirmingDeletion(true);
    };

    const closeModal = () => {
        setConfirmingDeletion(false);
        setHotelToDelete(null);
    };

    const deleteHotel = (e) => {
        e.preventDefault();
        destroy(route('admin.hotels.destroy', hotelToDelete), {
            onSuccess: () => closeModal(),
        });
    };
    // --- Fin de la lógica del modal ---

    return (
        <>
            <Head title="Gestionar Hoteles" />

            {/* --- Cabecera de la Página --- */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-smd-dark">Hoteles</h1>
                <Link
                    href={route('admin.hotels.create')}
                    className="inline-flex items-center gap-2 bg-smd-soft-green text-white font-bold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                    <PlusIcon className="h-5 w-5" />
                    Crear Hotel
                </Link>
            </div>

            {/* --- Tabla de Hoteles (Responsiva) --- */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Vista de Tabla para Desktop */}
                <table className="w-full hidden md:table">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Nombre</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Rango de Precio</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Teléfono</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Acciones</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {data.map((hotel) => (
                        <tr key={hotel.id} className="hover:bg-gray-50">
                            <td className="p-4 flex items-center">
                                <img
                                    src={hotel.image_url}
                                    alt={hotel.name}
                                    className="w-10 h-10 rounded-md object-cover mr-4 flex-shrink-0"
                                />
                                <div>
                                    <p className="font-bold text-smd-dark">{hotel.name}</p>
                                    <p className="text-xs text-gray-500">{hotel.address}</p>
                                </div>
                            </td>
                            <td className="p-4">
                                    <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                        {hotel.price_range}
                                    </span>
                            </td>
                            <td className="p-4 text-gray-700">{hotel.phone}</td>
                            <td className="p-4">
                                <div className="flex gap-2">
                                    <Link href={route('admin.hotels.edit', hotel)} className="text-blue-600 hover:text-blue-900" title="Editar">
                                        <PencilSquareIcon className="h-5 w-5" />
                                    </Link>
                                    <button onClick={() => confirmDeletion(hotel)} className="text-red-600 hover:text-red-900" title="Eliminar">
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Vista de Tarjetas para Móvil */}
                <div className="md:hidden divide-y divide-gray-200">
                    {data.map((hotel) => (
                        <div key={hotel.id} className="p-4">
                            <div className="flex items-center mb-4">
                                <img src={hotel.image_url} alt={hotel.name} className="w-16 h-16 rounded-md object-cover mr-4 flex-shrink-0" />
                                <div>
                                    <p className="font-bold text-smd-dark">{hotel.name}</p>
                                    <p className="text-xs text-gray-500">{hotel.address}</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center"><span className="text-sm font-semibold">Precio:</span><span>{hotel.price_range}</span></div>
                                <div className="flex justify-between items-center"><span className="text-sm font-semibold">Teléfono:</span><span>{hotel.phone}</span></div>
                                <div className="flex justify-between items-center pt-2 border-t mt-2">
                                    <span className="text-sm font-semibold">Acciones:</span>
                                    <div className="flex gap-4">
                                        <Link href={route('admin.hotels.edit', hotel)} className="text-blue-600"><PencilSquareIcon className="h-6 w-6" /></Link>
                                        {JSON.stringify(hotel)}
                                        <button onClick={() => confirmDeletion(hotel)} className="text-red-600"><TrashIcon className="h-6 w-6" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Paginación */}
            <div className="mt-6">
                <Pagination links={meta.links} />
            </div>

            {/* Modal de Confirmación */}
            <Modal show={confirmingDeletion} onClose={closeModal}>
                <form onSubmit={deleteHotel} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">¿Eliminar Hotel?</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Una vez que el hotel sea eliminado, todos sus recursos (imágenes, reseñas, etc.) se borrarán permanentemente.
                        <br />
                        <span className="font-bold">"{hotelToDelete?.name}"</span>
                    </p>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>
                        <DangerButton className="ms-3" disabled={processing}>Eliminar Hotel</DangerButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}

// Asigna el layout persistente del admin a la página
Index.layout = page => <AdminLayout children={page} title="Hoteles" />;
