import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import ReactQuill from 'react-quill';
import CreatableSelect from "@/Components/Utils/CreatableSelect.jsx";
import he from 'he';

export default function Create({ postCategories }){
    const [dragActive, setDragActive] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const inputRef = React.useRef(null);

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['code-block'],
            ['clean']
        ],
    };

    const { data, setData, post, processing, errors, transform } = useForm({
        name: '',
        extract: '',
        content: '',
        post_category_id: '',
        new_category_name: '',
        status: '1',
        image: null,
    });

    useEffect(() => {
        transform((data) => ({
            ...data,
            content: he.decode(data.content)
        }));
    }, []);

    // Manejo del evento de arrastrar un archivo sobre el área
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // Manejo del evento de soltar el archivo
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    // Manejo del cambio desde el input de archivo
    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
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

    // Función para manejar el cambio en el CreatableSelect
    const handleCategoryChange = (option) => {
        if (option.isNew) {
            setData({
                ...data,
                post_category_id: '',
                new_category_name: option.value
            });
        } else {
            setData({
                ...data,
                post_category_id: option.value,
                new_category_name: ''
            });
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.posts.store'));
    };

    return (
        <>
            <Head title="Crear Nuevo Post" />
            <h1 className="text-3xl font-bold text-smd-dark">Crear Nuevo Post</h1>

            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                <form onSubmit={submit} onDragEnter={handleDrag}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Columna Izquierda: Datos del Post */}
                        <div className="lg:col-span-2 space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Título del Post</label>
                                <input type="text" id="name" value={data.name} onChange={e => setData('name', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                                {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label htmlFor="extract" className="block text-sm font-medium text-gray-700">Extracto (para SEO y vistas previas)</label>
                                <textarea id="extract" value={data.extract} onChange={e => setData('extract', e.target.value)} rows="3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
                                {errors.extract && <p className="text-sm text-red-600 mt-1">{errors.extract}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Contenido</label>
                                <ReactQuill
                                    theme="snow"
                                    value={data.content}
                                    onChange={content => setData('content', content)}
                                    modules={modules}
                                    className="mt-1 bg-white"/>
                                {errors.content && <p className="text-sm text-red-600 mt-1">{errors.content}</p>}
                            </div>
                        </div>

                        {/* Columna Derecha: Metadatos e Imagen */}
                        <div className="lg:col-span-1 space-y-4">
                            <div>
                                <label htmlFor="post_category_id" className="block text-sm font-medium text-gray-700">Categoría</label>
                                <CreatableSelect
                                    options={postCategories.data}
                                    value={data.post_category_id}
                                    onChange={handleCategoryChange}
                                    placeholder="Selecciona o escribe para crear..."
                                    error={errors.post_category_id || errors.new_category_name}
                                />
                                {errors.post_category_id && <p className="text-sm text-red-600 mt-1">{errors.post_category_id}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Imagen Destacada</label>
                                <div
                                    className={`mt-1 h-64 border-2 border-dashed rounded-md flex flex-col justify-center items-center text-center ${dragActive ? "border-smd-soft-green bg-green-50" : "border-gray-300"}`}
                                    onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
                                >
                                    <input ref={inputRef} type="file" accept="image/webp" className="hidden" onChange={handleChange} />
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Vista previa" className="h-full w-full object-contain p-2"/>
                                    ) : (
                                        <div>
                                            <p className="text-gray-500">Arrastra y suelta tu imagen aquí</p>
                                            <p className="text-sm text-gray-400 my-2">o</p>
                                            <button type="button" onClick={onButtonClick} className="px-4 py-2 bg-gray-200 rounded-md text-sm font-semibold hover:bg-gray-300">
                                                Seleccionar Archivo
                                            </button>
                                            <p className="text-xs text-gray-400 mt-2">WEBP de menos de 1MB</p>
                                        </div>
                                    )}
                                </div>
                                {errors.image && <p className="text-sm text-red-600 mt-1">{errors.image}</p>}
                            </div>
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estado</label>
                                <select id="status" value={data.status} onChange={e => setData('status', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                    <option value="1">Borrador</option>
                                    <option value="2">Publicado</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end items-center gap-smd-16">
                        <Link href={route('admin.posts.index')} className="text-gray-600 hover:underline mr-4">Cancelar</Link>
                        <button type="submit" disabled={processing} className="px-6 py-2 bg-smd-soft-green text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-400">
                            Crear Post
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

Create.layout = page => <AdminLayout children={page} title="Crear Post" />;
