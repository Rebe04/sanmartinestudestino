import React, { useState } from 'react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { Link, Head, useForm } from '@inertiajs/react';
import { PencilSquareIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import Pagination from "@/Components/Utils/Pagination.jsx";
import Modal from "@/Components/Utils/Modal.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";

export default function Index({ events }) {
    const { data, meta } = events;
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);
    const { delete: destroy, processing } = useForm();

    const confirmDeletion = (event) => {
        setEventToDelete(event);
        setConfirmingDeletion(true);
    };

    const closeModal = () => setConfirmingDeletion(false);

    const deleteEvent = (e) => {
        e.preventDefault();
        destroy(route('admin.events.destroy', eventToDelete.slug), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    return (
        <>
            <Head title="Gestionar Eventos" />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-smd-dark">Eventos</h1>
                <Link href={route('admin.events.create')} className="inline-flex items-center gap-2 bg-smd-soft-green text-white font-bold px-4 py-2 rounded-lg hover:bg-green-700">
                    <PlusIcon className="h-5 w-5" />
                    Crear Evento
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full hidden md:table">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="p-4 ...">Nombre del Evento</th>
                        <th className="p-4 ...">Categoría</th>
                        <th className="p-4 ...">Fechas</th>
                        <th className="p-4 ...">Acciones</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {data.map((event) => (
                        <tr key={event.id} className="hover:bg-gray-50">
                            <td className="p-4 flex items-center">
                                <img src={event.image_url} alt={event.name} className="w-10 h-10 rounded-md object-cover mr-4 flex-shrink-0"/>
                                <div>
                                    <p className="font-bold text-smd-dark">{event.name}</p>
                                </div>
                            </td>
                            <td className="p-4"><span className="bg-blue-100 ...">{event.event_category.name}</span></td>
                            <td className="p-4 text-sm text-gray-700">{event.starts_at} al {event.finishes_at}</td>
                            <td className="p-4">
                                <div className="flex gap-2">
                                    <Link href={route('admin.events.edit', event.slug)} className="text-blue-600"><PencilSquareIcon className="h-5 w-5" /></Link>
                                    <button onClick={() => confirmDeletion(event)} className="text-red-600"><TrashIcon className="h-5 w-5" /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {/* ... (Vista móvil/tarjetas) ... */}
            </div>

            <div className="mt-6">
                <Pagination links={meta.links} />
            </div>

            <Modal show={confirmingDeletion} onClose={closeModal}>
                <form onSubmit={deleteEvent} className="p-6">
                    <h2 className="text-lg font-medium">¿Eliminar Evento?</h2>
                    <p className="mt-1 text-sm text-gray-600">Se eliminará "{eventToDelete?.name}" y todos sus subeventos. Esta acción no se puede deshacer.</p>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>
                        <DangerButton className="ms-3" disabled={processing}>Eliminar</DangerButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}
Index.layout = page => <AdminLayout children={page} title="Eventos" />;
