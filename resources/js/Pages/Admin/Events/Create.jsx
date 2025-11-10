import React, { useState, useMemo, useRef, useEffect } from 'react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { PhotoIcon, XCircleIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import Modal from "@/Components/Utils/Modal.jsx";
import SubeventCard from "@/Components/Admin/SubeventCard.jsx";
import DragImage from "@/Components/Admin/DragImage.jsx";


export default function Create({ eventCategories, tags }) {
    const { data, setData, post, processing, errors, transform } = useForm({
        name: '', description: '', starts_at: '', finishes_at: '', event_category_id: '',
        image: null,
        subevents: [],
    });

    const [isSubEventModalOpen, setIsSubEventModalOpen] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const inputRef = React.useRef(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [editingSubEventIndex, setEditingSubEventIndex] = useState(null);
    const [subEventData, setSubEventData] = useState({ name: '', description: '', date: '', duration: '', image: null, tags: [] });
    const subEventImageRef = useRef(null);

    const categoryOptions = eventCategories.data.map(cat => ({ value: cat.id, label: cat.name }));
    const tagOptions = tags.data.map(tag => ({ value: tag.id, label: tag.name, color: tag.color }));

    useEffect(() => {
        transform((data) => ({
            ...data,
            subevents: data.subevents.map(sub => ({
                ...sub,
                tags: sub.tags.map(tag => tag.value || tag)
            }))
        }));
    }, [data.subevents]);

    const sortedSubevents = useMemo(() => {
        return [...data.subevents].sort((a, b) => new Date(a.date) - new Date(b.date));
    }, [data.subevents]);

    const openNewSubEventModal = () => {
        setEditingSubEventIndex(null);
        setSubEventData({ name: '', description: '', date: '', duration: '', image: null, tags: [] });
        setIsSubEventModalOpen(true);
    };

    const openEditSubEventModal = (index) => {
        setEditingSubEventIndex(index);
        setSubEventData(data.subevents[index]);
        setIsSubEventModalOpen(true);
    };

    const closeSubEventModal = () => setIsSubEventModalOpen(false);

    const handleSaveSubevent = () => {
        if (editingSubEventIndex !== null) {
            const updatedSubevents = [...data.subevents];
            updatedSubevents[editingSubEventIndex] = subEventData;
            setData('subevents', updatedSubevents);
        } else {
            setData('subevents', [...data.subevents, subEventData]);
        }
        closeSubEventModal();
    };

    const handleRemoveSubevent = (indexToRemove) => {
        if (confirm('¿Estás seguro de que quieres eliminar este subevento?')) {
            setData('subevents', data.subevents.filter((_, index) => index !== indexToRemove));
        }
    };


    // Función central para procesar el archivo
    const handleFile = (file) => {
        // Validación simple en el frontend
        if (file.type !== 'image/webp') {
            alert('Por favor, sube solo imágenes en formato WEBP.');
            return;
        }
        if (file.size > 1024 * 1024) { // 1MB
            alert('La imagen no puede pesar más de 1MB.');
            return;
        }
        setData('image', file);
        setImagePreview(URL.createObjectURL(file));
    };

    // Abrir el selector de archivos al hacer clic en el botón
    const onButtonClick = () => {
        inputRef.current.click();
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.events.store'), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Crear Evento" />
            <form onSubmit={submit} className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-smd-dark">Información del Evento</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <InputLabel htmlFor="name" value="Nombre del Evento" />
                            <TextInput id="name" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full mt-1" />
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="starts_at" value="Fecha de Inicio" />
                            <TextInput id="starts_at" type="date" value={data.starts_at} onChange={e => setData('starts_at', e.target.value)} className="w-full mt-1" />
                            <InputError message={errors.starts_at} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="finishes_at" value="Fecha de Fin" />
                            <TextInput id="finishes_at" type="date" value={data.finishes_at} onChange={e => setData('finishes_at', e.target.value)} className="w-full mt-1" />
                            <InputError message={errors.finishes_at} className="mt-2" />
                        </div>
                        <div className="md:col-span-2">
                            <InputLabel htmlFor="description" value="Descripción" />
                            <textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} rows="4" className="w-full mt-1 border-gray-300 rounded-md"></textarea>
                            <InputError message={errors.description} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="event_category_id" value="Categoría del Evento" />
                            <Select id="event_category_id" options={categoryOptions} onChange={option => setData('event_category_id', option.value)} className="mt-1" />
                            <InputError message={errors.event_category_id} className="mt-2" />
                        </div>
                        <DragImage setData={setData} errors={errors} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-smd-dark">Subeventos (Línea de Tiempo)</h2>
                        <button type="button" onClick={openNewSubEventModal} className="bg-smd-dark text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-gray-700">Añadir Subevento</button>
                    </div>

                    <div className="space-y-4">
                        {sortedSubevents.map((subevent, index) => (
                            <SubeventCard key={index} subevent={subevent} onRemove={() => handleRemoveSubevent(index)} onEdit={() => openEditSubEventModal(index)} />
                        ))}
                    </div>
                    {data.subevents.length === 0 && <p className="text-center text-gray-500 py-4 border-dashed border-2 rounded-md">Aún no hay subeventos añadidos.</p>}
                    {Object.keys(errors).filter(key => key.startsWith('subevents.')).map(key => <InputError key={key} message={errors[key]} className="mt-2" />)}
                </div>

                <div className="flex justify-end gap-4"><PrimaryButton disabled={processing}>Guardar Evento</PrimaryButton></div>
            </form>

            <Modal show={isSubEventModalOpen} onClose={closeSubEventModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">{editingSubEventIndex !== null ? 'Editar' : 'Crear'} Subevento</h2>
                    <div className="mt-4 space-y-4">
                        <InputLabel htmlFor="sub_name" value="Nombre" />
                        <TextInput id="sub_name" value={subEventData.name} onChange={e => setSubEventData({...subEventData, name: e.target.value})} className="w-full" />

                        <InputLabel htmlFor="sub_date" value="Fecha" />
                        <TextInput id="sub_date" type="date" value={subEventData.date} onChange={e => setSubEventData({...subEventData, date: e.target.value})} className="w-full" />

                        <InputLabel htmlFor="sub_duration" value="Duración (ej. 2 horas, 8:00 PM)" />
                        <TextInput id="sub_duration" value={subEventData.duration} onChange={e => setSubEventData({...subEventData, duration: e.target.value})} className="w-full" />

                        <InputLabel htmlFor="sub_description" value="Descripción" />
                        <textarea id="sub_description" value={subEventData.description} onChange={e => setSubEventData({...subEventData, description: e.target.value})} rows="3" className="w-full mt-1 border-gray-300 rounded-md"></textarea>

                        <InputLabel htmlFor="sub_image" value="Imagen (WEBP, <1MB)" />
                        <input id="sub_image" type="file" accept="image/webp" ref={subEventImageRef} onChange={e => setSubEventData({...subEventData, image: e.target.files[0]})} className="mt-1 block w-full text-sm ... file:..." />

                        <InputLabel htmlFor="sub_tags" value="Tags" />
                        <CreatableSelect
                            isMulti
                            options={tagOptions}
                            defaultValue={subEventData.tags.map(tag => typeof tag === 'object' ? tag : tagOptions.find(t => t.value === tag) || { value: tag, label: tag, __isNew__: true })}
                            onChange={options => setSubEventData({...subEventData, tags: options || []})}
                            formatCreateLabel={inputValue => `Añadir tag "${inputValue}"`}
                        />
                    </div>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeSubEventModal}>Cancelar</SecondaryButton>
                        <PrimaryButton onClick={handleSaveSubevent} className="ms-3">Guardar Subevento</PrimaryButton>
                    </div>
                </div>
            </Modal>
        </>
    );
}

Create.layout = page => <AdminLayout children={page} title="Crear Evento" />;
