import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import ReactQuill from 'react-quill';
import CreatableSelect from "@/Components/Utils/CreatableSelect.jsx";
import he from 'he';
import DragImage from "@/Components/Admin/DragImage.jsx";

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
                            <DragImage setData={setData} errors={errors} />
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
                        <Link href={route('admin.posts.index')} className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50">Cancelar</Link>
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
