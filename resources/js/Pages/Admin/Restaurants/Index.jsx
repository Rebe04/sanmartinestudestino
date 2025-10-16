import React, { useState } from 'react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { Link, Head, useForm, router } from '@inertiajs/react';
import { PencilSquareIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import Pagination from "@/Components/Utils/Pagination.jsx";
import Modal from "@/Components/Utils/Modal.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import Rating from "@/Components/Utils/Rating.jsx";

export default function Index({ restaurants, foodCategories, filters }) {
    const { data, meta } = restaurants;
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [restaurantToDelete, setRestaurantToDelete] = useState(null);
    const { delete: destroy, processing } = useForm();

    const confirmDeletion = (restaurant) => {
        setRestaurantToDelete(restaurant);
        setConfirmingDeletion(true);
    };

    const closeModal = () => setConfirmingDeletion(false);

    const deleteRestaurant = (e) => {
        e.preventDefault();
        destroy(route('admin.restaurants.destroy', restaurantToDelete.slug), {
            onSuccess: () => closeModal(),
        });
    };

    const handleFilterChange = (categoryId) => {
        const currentFilter = filters.food_category;
        const newFilter = currentFilter == categoryId ? {} : { food_category: categoryId };
        router.get(route('admin.restaurants.index'), newFilter, { preserveState: true, replace: true });
    };

    return (
        <>
            <Head title="Gestionar Restaurantes" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold text-smd-dark">Restaurantes</h1>
                <Link href={route('admin.restaurants.create')} className="inline-flex items-center gap-2 bg-smd-soft-green text-white font-bold px-4 py-2 rounded-lg hover:bg-green-700">
                    <PlusIcon className="h-5 w-5" />
                    Crear Restaurante
                </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {foodCategories.data.map(category => (
                    <button
                        key={category.id}
                        onClick={() => handleFilterChange(category.id)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                            filters.food_category == category.id ? 'bg-smd-soft-green text-white' : 'bg-white text-smd-dark hover:bg-gray-200'
                        }`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full hidden md:table">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Nombre</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Categoría</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Rating</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Acciones</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {data.map((restaurant) => (
                        <tr key={restaurant.id} className="hover:bg-gray-50">
                            <td className="p-4 flex items-center">
                                <img src={restaurant.image_url} alt={restaurant.name} className="w-10 h-10 rounded-md object-cover mr-4 flex-shrink-0"/>
                                <div>
                                    <p className="font-bold text-smd-dark">{restaurant.name}</p>
                                    <p className="text-xs text-gray-500">{restaurant.address}</p>
                                </div>
                            </td>
                            <td className="p-4"><span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{restaurant.food_category.name}</span></td>
                            <td className="p-4">
                                <div className="flex items-center gap-1">
                                    <Rating rating={restaurant.reviews_avg_rating} />
                                    <span className="text-xs text-gray-500">({restaurant.reviews_count})</span>
                                </div>
                            </td>
                            <td className="p-4">
                                <div className="flex gap-2">
                                    <Link href={route('admin.restaurants.edit', restaurant.slug)} className="text-blue-600 hover:text-blue-900" title="Editar"><PencilSquareIcon className="h-5 w-5" /></Link>
                                    <button onClick={() => confirmDeletion(restaurant)} className="text-red-600 hover:text-red-900" title="Eliminar"><TrashIcon className="h-5 w-5" /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="md:hidden divide-y divide-gray-200">
                    {/* ... Vista de tarjetas para móvil ... */}
                </div>
            </div>

            <div className="mt-6">
                <Pagination links={meta.links} />
            </div>

            <Modal show={confirmingDeletion} onClose={closeModal}>
                <form onSubmit={deleteRestaurant} className="p-6">
                    <h2 className="text-lg font-medium">¿Eliminar Restaurante?</h2>
                    <p className="mt-1 text-sm text-gray-600">Se eliminará <span className="font-bold">"{restaurantToDelete?.name}"</span> y todos sus platos. Esta acción no se puede deshacer.</p>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>
                        <DangerButton className="ms-3" disabled={processing}>Eliminar</DangerButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}

Index.layout = page => <AdminLayout children={page} title="Restaurantes" />;
