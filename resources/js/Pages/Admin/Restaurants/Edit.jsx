import React, { useState, useRef } from 'react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import Modal from "@/Components/Utils/Modal.jsx";
import { PencilIcon, TrashIcon, PhotoIcon, XCircleIcon } from "@heroicons/react/24/solid";
import DishCard from "@/Components/DishCard.jsx";


// --- Componente Principal ---
export default function Edit({ restaurant, foodCategories }) {
    const restaurantData = restaurant.data;
    const fileInputRef = useRef(null);

    const { data, setData, post, processing, errors, isDirty } = useForm({
        _method: 'PATCH',
        name: restaurantData.name || '',
        address: restaurantData.address || '',
        description: restaurantData.description || '',
        food_category_id: restaurantData.food_category.id || '',
        images: [],
        images_to_delete: [],
        dishes: restaurantData.dishes.map(d => ({ id: d.id, name: d.name, image: d.image_url })),
        dishes_to_delete: [],
    });

    const [imagePreviews, setImagePreviews] = useState([]);
    const galleryInputRef = useRef(null);

    const handleNewGalleryImages = (files) => {
        const newFiles = Array.from(files);
        setData('images', [...data.images, ...newFiles]);
        const newPreviews = newFiles.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...newPreviews]);
    };

    const removeExistingGalleryImage = (imageId) => {
        setData('images_to_delete', [...data.images_to_delete, imageId]);
    };

    // --- Lógica para Platos (Añadir) ---
    const [newDish, setNewDish] = useState({ name: '', image: null });
    const newDishFileInputRef = useRef(null);

    const handleAddDish = () => {
        if (!newDish.name.trim() || !newDish.image) {
            alert('Por favor, completa el nombre y la imagen del plato.');
            return;
        }
        setData('dishes', [...data.dishes, newDish]);
        setNewDish({ name: '', image: null });
        if (newDishFileInputRef.current) newDishFileInputRef.current.value = "";
    };

    // --- Lógica para Platos (Editar en Modal) ---
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingDish, setEditingDish] = useState({ index: null, data: {} });
    const editDishFileInputRef = useRef(null);

    const openEditModal = (dish, index) => {
        setEditingDish({ index, data: { ...dish } });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => setIsEditModalOpen(false);

    const handleUpdateDish = () => {
        const updatedDishes = [...data.dishes];
        updatedDishes[editingDish.index] = { ...editingDish.data, _isDirty: true };
        setData('dishes', updatedDishes);
        closeEditModal();
    };

    // --- Lógica para Platos (Eliminar) ---
    const handleRemoveDish = (indexToRemove) => {
        const dishToRemove = data.dishes[indexToRemove];
        if (dishToRemove.id) {
            setData('dishes_to_delete', [...data.dishes_to_delete, dishToRemove.id]);
        }
        setData('dishes', data.dishes.filter((_, index) => index !== indexToRemove));
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.restaurants.update', restaurantData.slug), {
            forceFormData: true, // Necesario para enviar archivos en una petición PATCH/POST
        });
    };

    return (
        <>
            <Head title={`Editar: ${restaurantData.name}`} />
            <form onSubmit={submit} className="space-y-6">

                {/* --- SECCIÓN DATOS DEL RESTAURANTE --- */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-smd-dark">Información del Restaurante</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <InputLabel htmlFor="name" value="Nombre"/>
                            <TextInput id="name" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full mt-1"/>
                            <InputError message={errors.name} className="mt-2"/>
                        </div>
                        <div>
                            <InputLabel htmlFor="food_category_id" value="Categoría"/>
                            <select id="food_category_id" value={data.food_category_id} onChange={e => setData('food_category_id', e.target.value)} className="w-full mt-1 border-gray-300 rounded-md shadow-sm">
                                {foodCategories.data.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                            </select>
                            <InputError message={errors.food_category_id} className="mt-2"/>
                        </div>
                        <div className="md:col-span-2">
                            <InputLabel htmlFor="address" value="Dirección"/>
                            <TextInput id="address" value={data.address} onChange={e => setData('address', e.target.value)} className="w-full mt-1"/>
                            <InputError message={errors.address} className="mt-2"/>
                        </div>
                        <div className="md:col-span-2">
                            <InputLabel htmlFor="description" value="Descripción"/>
                            <textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} rows="4" className="w-full mt-1 border-gray-300 rounded-md shadow-sm"></textarea>
                            <InputError message={errors.description} className="mt-2"/>
                        </div>
                    </div>
                </div>

                {/* --- SECCIÓN GALERÍA DE IMÁGENES --- */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-smd-dark">Galería de Imágenes</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                        {restaurantData.images.filter(img => !data.images_to_delete.includes(img.id)).map(image => (
                            <div key={image.id} className="relative group">
                                <img src={image.url} className="w-full h-32 object-cover rounded-md" alt={image.name} />
                                <button type="button" onClick={() => removeExistingGalleryImage(image.id)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <XCircleIcon className="h-5 w-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div>
                        <InputLabel htmlFor="gallery_images" value="Añadir nuevas imágenes (WEBP, <1MB)" />
                        <input ref={galleryInputRef} id="gallery_images" type="file" multiple accept="image/webp" onChange={e => handleNewGalleryImages(e.target.files)} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-smd-soft-green/10 file:text-smd-soft-green hover:file:bg-smd-soft-green/20" />
                    </div>
                    <InputError message={errors.images} className="mt-2" />
                </div>

                {/* --- SECCIÓN PLATOS DESTACADOS --- */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-smd-dark">Platos Destacados</h2>
                    <div className="p-4 border-dashed border-2 rounded-md mb-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                            <div>
                                <InputLabel htmlFor="newDishName" value="Nombre del Plato" />
                                <TextInput id="newDishName" type="text" value={newDish.name} onChange={e => setNewDish({...newDish, name: e.target.value})} className="w-full mt-1"/>
                            </div>
                            <div>
                                <InputLabel htmlFor="newDishImage" value="Imagen (WEBP, <1MB)" />
                                <input ref={fileInputRef} id="newDishImage" type="file" accept="image/webp" onChange={e => setNewDish({...newDish, image: e.target.files[0]})} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-smd-soft-green/10 file:text-smd-soft-green hover:file:bg-smd-soft-green/20" />
                            </div>
                        </div>
                        <div className="text-right">
                            <button type="button" onClick={handleAddDish} className="bg-smd-dark text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-gray-700 transition-colors">Añadir Plato</button>
                        </div>
                    </div>

                    <h3 className="text-lg font-medium text-gray-600 mb-4">Platos Actuales: {data.dishes.length}</h3>
                    <div className="space-y-4">
                        {data.dishes.map((dish, index) => (
                            <DishCard
                                key={dish.id || `new-${index}`}
                                dish={dish}
                                onRemove={() => handleRemoveDish(index, dish.id)}
                                onEdit={() => openEditModal(dish, index)}
                            />
                        ))}
                    </div>
                    {Object.keys(errors).filter(key => key.startsWith('dishes.')).map(key => <InputError key={key} message={errors[key]} className="mt-2" />)}
                </div>

                <div className="mt-6 flex justify-end items-center gap-smd-16">
                    <Link href={route('admin.restaurants.index')} className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50">Cancelar</Link>
                    <PrimaryButton className="px-6 py-2 bg-smd-soft-green text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-400" disabled={processing || !isDirty}>Actualizar Restaurante</PrimaryButton>
                </div>
            </form>

            {/* --- Modal para Editar Plato --- */}
            <Modal show={isEditModalOpen} onClose={closeEditModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">Editar Plato</h2>
                    <div className="mt-4 space-y-4">
                        <div>
                            <InputLabel htmlFor="editDishName" value="Nombre del Plato" />
                            <TextInput id="editDishName" value={editingDish.data.name} onChange={e => setEditingDish({ ...editingDish, data: { ...editingDish.data, name: e.target.value }})} className="w-full mt-1"/>
                        </div>
                        <div>
                            <InputLabel htmlFor="editDishImage" value="Cambiar Imagen (Opcional)" />
                            <input ref={editDishFileInputRef} id="editDishImage" type="file" accept="image/webp" onChange={e => setEditingDish({ ...editingDish, data: { ...editingDish.data, image: e.target.files[0] }})} className="mt-1 block w-full text-sm ..."/>
                        </div>
                        <div className="mt-2">
                            <p className="text-sm font-medium">Vista Previa:</p>
                            <img src={typeof editingDish.data.image === 'string' ? editingDish.data.image : editingDish.data.image ? URL.createObjectURL(editingDish.data.image) : ''} className="w-24 h-24 object-cover rounded-md mt-1 border"/>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeEditModal}>Cancelar</SecondaryButton>
                        <PrimaryButton onClick={handleUpdateDish} className="ms-3">Guardar Cambios</PrimaryButton>
                    </div>
                </div>
            </Modal>
        </>
    );
}

Edit.layout = page => <AdminLayout children={page} title="Editar:" />;
