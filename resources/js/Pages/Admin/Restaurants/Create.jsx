import React, { useState, useRef } from 'react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import { PhotoIcon, TrashIcon, XCircleIcon } from "@heroicons/react/24/solid";
import DishCard from "@/Components/DishCard.jsx";
import Modal from "@/Components/Utils/Modal.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";


// --- Componente Principal ---
export default function Create({ foodCategories }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        address: '',
        description: '',
        food_category_id: '',
        images: [], // Galería del Restaurante
        dishes: [], // Platos Destacados
    });

    // --- Lógica para Galería de Imágenes ---
    const [galleryDragActive, setGalleryDragActive] = useState(false);
    const galleryInputRef = useRef(null);

    const handleGalleryFiles = (files) => {
        const newFiles = Array.from(files).filter(file => {
            if (file.type !== 'image/webp') { alert(`El archivo '${file.name}' no es WEBP.`); return false; }
            if (file.size > 1024 * 1024) { alert(`El archivo '${file.name}' pesa más de 1MB.`); return false; }
            return true;
        });
        setData('images', [...data.images, ...newFiles]);
    };

    const handleGalleryDrag = (e) => { e.preventDefault(); e.stopPropagation(); setGalleryDragActive(e.type === "dragenter" || e.type === "dragover"); };
    const handleGalleryDrop = (e) => { e.preventDefault(); e.stopPropagation(); setGalleryDragActive(false); if (e.dataTransfer.files) handleGalleryFiles(e.dataTransfer.files); };
    const handleGalleryChange = (e) => { e.preventDefault(); if (e.target.files) handleGalleryFiles(e.target.files); };
    const onGalleryButtonClick = () => { galleryInputRef.current.click(); };
    const removeGalleryImage = (indexToRemove) => {
        setData('images', data.images.filter((_, index) => index !== indexToRemove));
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

    // --- Lógica para Editar Platos en un Modal ---
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
        updatedDishes[editingDish.index] = editingDish.data;
        setData('dishes', updatedDishes);
        closeEditModal();
    };

    const handleRemoveDish = (indexToRemove) => {
        setData('dishes', data.dishes.filter((_, index) => index !== indexToRemove));
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.restaurants.store'), {
            forceFormData: true,
        });
    };

    return (
        <>
            <h1 className="text-3xl font-bold text-smd-dark mb-6">Crear Nuevo Restaurante</h1>

            <form onSubmit={submit} className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-smd-dark">Información del Restaurante</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <InputLabel htmlFor="name" value="Nombre del Restaurante" />
                            <TextInput id="name" value={data.name} onChange={e => setData('name', e.target.value)} className="mt-1 block w-full" isFocused={true}/>
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="food_category_id" value="Categoría" />
                            <select id="food_category_id" value={data.food_category_id} onChange={e => setData('food_category_id', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                <option value="">Selecciona una categoría</option>
                                {foodCategories.data.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                            </select>
                            <InputError message={errors.food_category_id} className="mt-2" />
                        </div>
                        <div className="md:col-span-2">
                            <InputLabel htmlFor="address" value="Dirección" />
                            <TextInput id="address" value={data.address} onChange={e => setData('address', e.target.value)} className="mt-1 block w-full"/>
                            <InputError message={errors.address} className="mt-2" />
                        </div>
                        <div className="md:col-span-2">
                            <InputLabel htmlFor="description" value="Descripción" />
                            <textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} rows="4" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
                            <InputError message={errors.description} className="mt-2" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-smd-dark">Galería de Imágenes</h2>
                    <div onDragEnter={handleGalleryDrag} onDragLeave={handleGalleryDrag} onDragOver={handleGalleryDrag} onDrop={handleGalleryDrop} className={`p-6 border-2 border-dashed rounded-md flex flex-col items-center justify-center text-center ${galleryDragActive ? 'border-smd-soft-green bg-green-50' : 'border-gray-300'}`}>
                        <input ref={galleryInputRef} type="file" multiple accept="image/webp" className="hidden" onChange={handleGalleryChange} />
                        <PhotoIcon className="h-12 w-12 text-gray-400"/>
                        <p className="text-gray-500 mt-2">Arrastra y suelta tus imágenes aquí</p>
                        <p className="text-sm text-gray-400 my-2">o</p>
                        <button type="button" onClick={onGalleryButtonClick} className="px-4 py-2 bg-gray-200 rounded-md text-sm font-semibold hover:bg-gray-300">Seleccionar Archivos</button>
                        <p className="text-xs text-gray-400 mt-2">WEBP de menos de 1MB cada una.</p>
                    </div>
                    {data.images.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {data.images.map((file, index) => (
                                <div key={index} className="relative">
                                    <img src={URL.createObjectURL(file)} alt={`preview ${index}`} className="w-full h-24 object-cover rounded-md"/>
                                    <button type="button" onClick={() => removeGalleryImage(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5"><XCircleIcon className="h-5 w-5"/></button>
                                </div>
                            ))}
                        </div>
                    )}
                    <InputError message={errors.images} className="mt-2" />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-smd-dark">Platos Destacados</h2>
                    <div className="p-4 border-dashed border-2 rounded-md mb-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                            <div>
                                <InputLabel htmlFor="newDishName" value="Nombre del Plato" />
                                <TextInput id="newDishName" value={newDish.name} onChange={e => setNewDish({...newDish, name: e.target.value})} className="w-full mt-1"/>
                            </div>
                            <div>
                                <InputLabel htmlFor="newDishImage" value="Imagen (WEBP, <1MB)" />
                                <input ref={newDishFileInputRef} id="newDishImage" type="file" accept="image/webp" onChange={e => setNewDish({...newDish, image: e.target.files[0]})} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-smd-soft-green/10 file:text-smd-soft-green hover:file:bg-smd-soft-green/20" />
                            </div>
                        </div>
                        <div className="text-right">
                            <button type="button" onClick={handleAddDish} className="bg-smd-dark text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-gray-700 transition-colors">Añadir Plato</button>
                        </div>
                    </div>

                    <h3 className="text-lg font-medium text-gray-600 mb-4">Platos a Añadir: {data.dishes.length}</h3>
                    <div className="space-y-4">
                        {data.dishes.map((dish, index) => <DishCard key={index} dish={dish} onRemove={() => handleRemoveDish(index)} onEdit={() => openEditModal(dish, index)} />)}
                    </div>
                    {Object.keys(errors).filter(key => key.startsWith('dishes.')).map(key => <InputError key={key} message={errors[key]} className="mt-2" />)}
                </div>

                <div className="mt-6 flex justify-end items-center gap-smd-16">
                    <Link href={route('admin.restaurants.index')} className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50">Cancelar</Link>
                    <PrimaryButton className="px-6 py-2 bg-smd-soft-green text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-400" disabled={processing}>Guardar Restaurante</PrimaryButton>
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
                    <div className="mt-6 flex justify-end items-center gap-smd-16">
                        <SecondaryButton className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50" onClick={closeEditModal}>Cancelar</SecondaryButton>
                        <PrimaryButton onClick={handleUpdateDish} className="px-6 py-2 bg-smd-soft-green text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-400">Guardar Cambios</PrimaryButton>
                    </div>
                </div>
            </Modal>
        </>
    );
}

Create.layout = page => <AdminLayout children={page} title="Crear un Restaurante" />;
