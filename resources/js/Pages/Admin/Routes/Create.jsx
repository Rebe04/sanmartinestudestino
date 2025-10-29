import React, { useState, useRef } from 'react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Select from 'react-select';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import StopCard from "@/Components/Utils/StopCard.jsx";
import {PhotoIcon} from "@heroicons/react/24/outline";
import {XCircleIcon} from "@heroicons/react/24/solid";



export default function Create({ routableOptions }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '', time: '', description: '',
        image: null, // Imagen principal de la ruta
        stops: [], // Aquí se guarda las paradas [{value, label, type, description}]
    });

    // --- Lógica Imagen Principal ---
    const [dragActive, setDragActive] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const imageInputRef = useRef(null);

    const handleDrag = (e) => { e.preventDefault(); e.stopPropagation(); setDragActive(e.type === "dragenter" || e.type === "dragover"); };
    const handleDrop = (e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); if (e.dataTransfer.files && e.dataTransfer.files[0]) handleMainImageFile(e.dataTransfer.files[0]); };
    const handleChange = (e) => { e.preventDefault(); if (e.target.files && e.target.files[0]) handleMainImageFile(e.target.files[0]); };
    const onButtonClick = () => { imageInputRef.current.click(); };

    const handleMainImageFile = (file) => {
        if (!file) return;
        if (file.type !== 'image/webp') { alert('La imagen principal debe ser WEBP.'); return; }
        if (file.size > 1024 * 1024) { alert('La imagen principal no puede pesar más de 1MB.'); return; }
        setData('image', file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleMainImage = (file) => {
        if (!file) return;
        if (file.type !== 'image/webp' || file.size > 1024 * 1024) {
            alert('La imagen principal debe ser WEBP y pesar menos de 1MB.');
            return;
        }
        setData('image', file);
        setImagePreview(URL.createObjectURL(file));
    };

    // --- Lógica Paradas ---
    const [selectedStopToAdd, setSelectedStopToAdd] = useState(null);

    const handleAddStop = () => {
        if (!selectedStopToAdd) return;
        // Evita añadir la misma parada dos veces
        if (data.stops.some(stop => stop.value === selectedStopToAdd.value && stop.type === selectedStopToAdd.type)) {
            alert(`${selectedStopToAdd.label} ya está en la ruta.`);
            return;
        }
        setData('stops', [...data.stops, { ...selectedStopToAdd, description: '' }]);
        setSelectedStopToAdd(null); // Resetea el selector
    };

    const handleDescriptionChange = (description, index) => {
        setData('stops', data.stops.map((stop, i) => i === index ? { ...stop, description } : stop));
    };

    const handleRemoveStop = (indexToRemove) => {
        setData('stops', data.stops.filter((_, index) => index !== indexToRemove));
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(data.stops);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setData('stops', items);
    };

    // --- Envío ---
    const submit = (e) => {
        e.preventDefault();
        // Mapea las paradas al formato final que el backend espera
        const stopsToSubmit = data.stops.map((stop, index) => ({
            value: stop.value, // ID
            label: stop.label, // Nombre
            type: stop.type,   // Clase del Modelo
            description: stop.description,
        }));

        // Usar 'post' y forceFormData para manejar el archivo de imagen
        post(route('admin.routes.store'), {
            data: { ...data, stops: stopsToSubmit },
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Crear Ruta Turística" />
            <h1 className="text-3xl font-bold text-smd-dark mb-6">Crear Nueva Ruta Turística</h1>

            <form onSubmit={submit} className="space-y-6">
                {/* --- SECCIÓN DATOS DE LA RUTA --- */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-smd-dark">Información de la Ruta</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <InputLabel htmlFor="name" value="Nombre de la Ruta" />
                            <TextInput id="name" value={data.name} onChange={e => setData('name', e.target.value)} className="mt-1 w-full" isFocused={true}/>
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="time" value="Tiempo Estimado (ej. 4 Horas)" />
                            <TextInput id="time" value={data.time} onChange={e => setData('time', e.target.value)} className="mt-1 w-full"/>
                            <InputError message={errors.time} className="mt-2" />
                        </div>
                        <div className="md:col-span-2">
                            <InputLabel htmlFor="description" value="Descripción General" />
                            <textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} rows="4" className="mt-1 w-full border-gray-300 rounded-md"></textarea>
                            <InputError message={errors.description} className="mt-2" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Imagen Principal (Opcional)</label>
                            <div
                                className={`mt-1 h-64 border-2 border-dashed rounded-md flex flex-col justify-center items-center text-center transition-colors ${dragActive ? "border-smd-soft-green bg-green-50" : "border-gray-300"}`}
                                onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
                            >
                                <input ref={imageInputRef} type="file" accept="image/webp" className="hidden" onChange={handleChange} />
                                {imagePreview ? (
                                    <div className="relative group w-full h-full p-2">
                                        <img src={imagePreview} alt="Vista previa" className="h-full w-full object-contain"/>
                                        <button type="button" onClick={() => {setImagePreview(null); setData('image', null); imageInputRef.current.value = "";}} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <XCircleIcon className="h-5 w-5"/>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="p-4">
                                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-400"/>
                                        <p className="text-gray-500 mt-2">Arrastra y suelta tu imagen aquí</p>
                                        <p className="text-sm text-gray-400 my-2">o</p>
                                        <button type="button" onClick={onButtonClick} className="px-4 py-2 bg-gray-200 rounded-md text-sm font-semibold hover:bg-gray-300">
                                            Seleccionar Archivo
                                        </button>
                                        <p className="text-xs text-gray-400 mt-2">WEBP de menos de 1MB</p>
                                    </div>
                                )}
                            </div>
                            <InputError message={errors.image} className="mt-2" />
                        </div>
                    </div>
                </div>

                {/* --- SECCIÓN LÍNEA DE TIEMPO / PARADAS --- */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-smd-dark">Paradas de la Ruta</h2>
                    <div className="flex items-end gap-4 mb-6">
                        <div className="flex-grow">
                            <InputLabel htmlFor="add_stop" value="Añadir Parada" />
                            <Select
                                id="add_stop"
                                options={routableOptions}
                                value={selectedStopToAdd}
                                onChange={setSelectedStopToAdd}
                                placeholder="Busca un lugar, restaurante u hotel..."
                                className="mt-1"
                                classNamePrefix="select"
                            />
                        </div>
                        <button type="button" onClick={handleAddStop} className="bg-smd-dark text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-gray-700" disabled={!selectedStopToAdd}>Añadir</button>
                    </div>

                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="stopsList">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {data.stops.length > 0 ? data.stops.map((stop, index) => (
                                        <StopCard
                                            key={`${stop.value}-${stop.type}`} // Clave única
                                            stop={stop}
                                            index={index}
                                            onDescriptionChange={handleDescriptionChange}
                                            onRemove={() => handleRemoveStop(index)}
                                        />
                                    )) : (
                                        <p className="text-center text-gray-500 py-4">Añade paradas usando el buscador de arriba.</p>
                                    )}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <InputError message={errors.stops} className="mt-2" />
                </div>

                <div className="flex justify-end gap-4 py-4">
                    <Link href={route('admin.routes.index')} className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50">Cancelar</Link>
                    <PrimaryButton className="px-6 py-2 bg-smd-soft-green text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-400" disabled={processing}>Guardar Ruta</PrimaryButton>
                </div>
            </form>
        </>
    );
}

// Asigna el layout
Create.layout = page => <AdminLayout children={page} title="Crear Ruta" />;
