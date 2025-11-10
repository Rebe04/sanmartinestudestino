import React, { useState } from 'react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { Link, Head, useForm, router } from '@inertiajs/react';
import { PencilSquareIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import Pagination from "@/Components/Utils/Pagination.jsx";
import Modal from "@/Components/Utils/Modal.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";

export default function Index({ places, placeCategories, filters }) {
    const { data, meta } = places;
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [placeToDelete, setPlaceToDelete] = useState(null);
    const { delete: destroy, processing } = useForm();

    const confirmDeletion = (place) => {
        setPlaceToDelete(place);
        setConfirmingDeletion(true);
    };

    const closeModal = () => setConfirmingDeletion(false);

    const deletePlace = (e) => {
        e.preventDefault();
        destroy(route('admin.places.destroy', placeToDelete.slug), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    const handleFilterChange = (categoryId) => {
        const newFilters = categoryId ? { place_category_id: categoryId } : {};
        router.get(route('admin.places.index'), newFilters, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <>
            <Head title="Gestionar Lugares" />
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold text-smd-dark">Lugares</h1>
                <Link href={route('admin.places.create')} className="inline-flex items-center gap-2 bg-smd-soft-green text-white font-bold px-4 py-2 rounded-lg hover:bg-green-700">
                    <PlusIcon className="h-5 w-5" />
                    Crear Lugar
                </Link>
            </div>

            <div className="mb-4">
                <label htmlFor="category_filter" className="sr-only">Filtrar por categoría</label>
                <select
                    id="category_filter"
                    onChange={(e) => handleFilterChange(e.target.value)}
                    value={filters.place_category_id || ''}
                    className="w-full md:w-1/3 rounded-md border-gray-300 shadow-sm"
                >
                    <option value="">Todas las categorías</option>
                    {placeCategories.data.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full hidden md:table">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Nombre</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Categoría</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Precio</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Acciones</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {data.map((place) => (
                        <tr key={place.id} className="hover:bg-gray-50">
                            <td className="p-4 flex items-center">
                                <img src={place.image_url} alt={place.name} className="w-10 h-10 rounded-md object-cover mr-4 flex-shrink-0"/>
                                <div>
                                    <p className="font-bold text-smd-dark">{place.name}</p>
                                    <p className="text-xs text-gray-500">{place.address}</p>
                                </div>
                            </td>
                            <td className="p-4"><span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{place.place_category.name}</span></td>
                            <td className="p-4 text-gray-700">{place.price}</td>
                            <td className="p-4">
                                <div className="flex gap-2">
                                    <Link href={route('admin.places.edit', place.slug)} className="text-blue-600 hover:text-blue-900" title="Editar"><PencilSquareIcon className="h-5 w-5" /></Link>
                                    <button onClick={() => confirmDeletion(place)} className="text-red-600 hover:text-red-900" title="Eliminar"><TrashIcon className="h-5 w-5" /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="md:hidden divide-y divide-gray-200">
                    {/* Vista de Tarjetas para Móvil */}
                </div>
            </div>

            <div className="mt-6">
                <Pagination links={meta.links} />
            </div>

            <Modal show={confirmingDeletion} onClose={closeModal}>
                <form onSubmit={deletePlace} className="p-6">
                    <h2 className="text-lg font-medium">¿Eliminar Lugar?</h2>
                    <p className="mt-1 text-sm text-gray-600">Se eliminará <span className="font-bold">"{placeToDelete?.name}"</span>. Esta acción no se puede deshacer.</p>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>
                        <DangerButton className="ms-3" disabled={processing}>Eliminar Lugar</DangerButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}

Index.layout = page => <AdminLayout children={page} title="Lugares" />;
