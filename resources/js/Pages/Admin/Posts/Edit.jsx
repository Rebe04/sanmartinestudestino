import React, {useEffect, useState} from 'react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import {Head, useForm, router, Link} from '@inertiajs/react';
import ReactQuill from 'react-quill';
import CreatableSelect from '@/Components/Utils/CreatableSelect';
import 'react-quill/dist/quill.snow.css';
import he from "he";
import DragImage from "@/Components/Admin/DragImage.jsx";

export default function Edit({ post, postCategories }) {
    const postData = post.data;

    // --- LÓGICA DE LA IMAGEN ---
    const [imagePreview, setImagePreview] = useState(postData.image_url);

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

    // --- MANEJO DEL FORMULARIO ---
    const { data, setData, post: postForm, processing, errors, transform } = useForm({
        _method: 'PATCH',
        name: postData.name || '',
        extract: postData.extract || '',
        content: postData.content || '',
        post_category_id: postData.category?.id || '',
        new_category_name: '',
        status: postData.status || '1',
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
    const handleFile = (file) => {
        if (file.type !== 'image/webp') { alert('Por favor, sube solo imágenes en formato WEBP.'); return; }
        if (file.size > 1024 * 1024) { alert('La imagen no puede pesar más de 1MB.'); return; }
        setData('image', file);
        setImagePreview(URL.createObjectURL(file));
    };

    // Abrir el selector de archivos al hacer clic en el botón
    const onButtonClick = () => {
        inputRef.current.click();
    };

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

    // --- FUNCIÓN DE ENVÍO ---
    const submit = (e) => {
        e.preventDefault();
        router.post(route('admin.posts.update', postData), data, {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title={`Editar Post: ${postData.name}`} />
            <h1 className="text-3xl font-bold text-smd-dark">Editar Post</h1>

            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-4">
                            <div>
                                <label>Título</label>
                                <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="mt-1 block w-full rounded-md"/>
                                {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                            </div>
                            <div>
                                <label>Extracto</label>
                                <textarea value={data.extract} onChange={e => setData('extract', e.target.value)} rows="3" className="mt-1 block w-full rounded-md"></textarea>
                                {errors.extract && <p className="text-sm text-red-600">{errors.extract}</p>}
                            </div>
                            <div>
                                <label>Contenido</label>
                                <ReactQuill
                                    theme="snow"
                                    value={data.content}
                                    onChange={content => setData('content', content)}
                                    modules={modules}
                                    className="mt-1 bg-white"
                                />
                                {errors.content && <p className="text-sm text-red-600 mt-1">{errors.content}</p>}
                            </div>
                        </div>

                        {/* Columna Derecha: Metadatos e Imagen */}
                        <div className="lg:col-span-1 space-y-4">
                            <div>
                                <label>Categoría</label>
                                <CreatableSelect
                                    options={postCategories.data}
                                    value={data.post_category_id}
                                    onChange={handleCategoryChange}
                                    placeholder="Selecciona o crea una categoría..."
                                    error={errors.post_category_id || errors.new_category_name}
                                />
                            </div>
                            <DragImage imagePreviewData={imagePreview} errors={errors} setData={setData} />
                            <div>
                                <label>Estado</label>
                                <select value={data.status} onChange={e => setData('status', e.target.value)} className="mt-1 block w-full rounded-md">
                                    <option value="1">Borrador</option>
                                    <option value="2">Publicado</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end items-center gap-smd-16">
                        <Link href={route('admin.posts.index')} className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50">Cancelar</Link>
                        <button type="submit" disabled={processing} className="px-6 py-2 bg-smd-soft-green text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-400">
                            Actualizar Post
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

Edit.layout = page => <AdminLayout children={page} title="Editar Post" />;
