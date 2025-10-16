import React, { useState } from 'react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { Link, Head, useForm } from '@inertiajs/react';
import { PencilSquareIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import Pagination from "@/Components/Utils/Pagination.jsx";
import Modal from "@/Components/Utils/Modal.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";

export default function Index({ foodCategories }) {
    const { data, meta } = foodCategories;
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const { delete: destroy, processing } = useForm();

    const confirmDeletion = (food_category) => {
        setCategoryToDelete(food_category);
        setConfirmingDeletion(true);
    };

    const closeModal = () => {
        setConfirmingDeletion(false);
        setCategoryToDelete(null);
    };

    const deleteCategory = (e) => {
        e.preventDefault();
        destroy(route('admin.food-categories.destroy', categoryToDelete.slug), {
            onSuccess: () => closeModal(),
        });
    };

    return (
        <>
            <Head title="Categorías de Restaurante" />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-smd-dark">Categorías de Restaurante</h1>
                <Link
                    href={route('admin.food-categories.create')}
                    className="inline-flex items-center gap-2 bg-smd-soft-green text-white font-bold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                    <PlusIcon className="h-5 w-5" />
                    Crear Categoría
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Nombre</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Slug</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((food_category) => (
                        <tr key={food_category.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="p-4 font-bold text-smd-dark">{food_category.name}</td>
                            <td className="p-4 text-gray-500">{food_category.slug}</td>
                            <td className="p-4">
                                <div className="flex gap-2">
                                    <Link href={route('admin.food-categories.edit', food_category.slug)} className="text-blue-600 hover:text-blue-900" title="Editar">
                                        <PencilSquareIcon className="h-5 w-5" />
                                    </Link>
                                    <button onClick={() => confirmDeletion(food_category)} className="text-red-600 hover:text-red-900" title="Eliminar">
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
                <form onSubmit={deleteCategory} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">¿Eliminar Categoría?</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Se eliminará la categoría <span className="font-bold">"{categoryToDelete?.name}"</span>. Esta acción no se puede deshacer.
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

Index.layout = page => <AdminLayout children={page} title="Categorías de Posts" />;
