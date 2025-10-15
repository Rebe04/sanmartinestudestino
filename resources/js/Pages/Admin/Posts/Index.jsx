import React, { useState } from 'react';
import AdminLayout from "@/Layouts/Admin/AdminLayout.jsx";
import Pagination from "@/Components/Utils/Pagination.jsx";
import {EyeIcon, PencilSquareIcon, PlusIcon, TrashIcon} from "@heroicons/react/24/outline/index.js";
import {Head, Link, useForm} from "@inertiajs/react";
import Modal from "@/Components/Utils/Modal.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";

export default function Index({ posts }) {
    const { data, meta } = posts;
    const [confirmingPostDeletion, setConfirmingPostDeletion] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);

    const { delete: destroy, processing } = useForm();

    const confirmDeletion = (post) => {
        setPostToDelete(post);
        setConfirmingPostDeletion(true);
    };

    const closeModal = () => {
        setConfirmingPostDeletion(false);
        setPostToDelete(null);
    };

    const deletePost = (e) => {
        e.preventDefault();
        destroy(route('admin.posts.destroy', postToDelete), {
            onSuccess: () => closeModal(),
        });
    };

    return (
        <div>
            <Head title="Gestionar Posts" />

            {/* --- Cabecera de la Página --- */}
            <div className="flex justify-between items-center mb-6 gap-smd-16">
                <h1 className="text-3xl font-bold text-smd-dark">Posts del Blog</h1>
                <Link
                    href={route('admin.posts.create')} // Apunta a la ruta para crear un nuevo post
                    className="inline-flex items-center gap-2 text-sm md:text-smd-16 bg-smd-soft-green text-white font-bold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                    <PlusIcon className="h-5 w-5" />
                    Crear Post
                </Link>
            </div>

            {/* --- Tabla de Posts --- */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full hidden md:table">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Título</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Categoría</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Estado</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((post) => (
                        <tr key={post.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="p-4 flex items-center">
                                <img
                                    src={post.image_url}
                                    alt={post.name}
                                    className="w-10 h-10 rounded-md object-cover mr-4"
                                />
                                <div>
                                    <p className="font-bold text-smd-dark">{post.name}</p>
                                    <p className="text-xs text-gray-500">Por: {post.user.name}</p>
                                </div>
                            </td>
                            <td className="p-4 text-gray-700">
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                        {post.category.name}
                                    </span>
                            </td>
                            <td className="p-4">
                                {post.status == 2 ? (
                                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                            Publicado
                                        </span>
                                ) : (
                                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                            Borrador
                                        </span>
                                )}
                            </td>
                            <td className="p-4">
                                <div className="flex gap-2">
                                    <Link
                                        target="_blank"
                                        href={route('posts.show', post)}
                                        className="text-blue-600 hover:text-blue-900"
                                        title="Editar"
                                    >
                                        <EyeIcon className="h-5 w-5" />
                                    </Link>
                                    <Link
                                        href={route('admin.posts.edit', post)}
                                        className="text-orange-400 hover:text-orange-900"
                                        title="Editar"
                                    >
                                        <PencilSquareIcon className="h-5 w-5" />
                                    </Link>
                                    <button
                                        onClick={() => confirmDeletion(post)}
                                        className="text-red-600 hover:text-red-900"
                                        title="Eliminar"
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="md:hidden divide-y divide-gray-200">
                    {data.map((post) => (
                        <div key={post.id} className="p-4">
                            <div className="flex items-center mb-4">
                                <img
                                    src={post.image_url}
                                    alt={post.name}
                                    className="w-16 h-16 rounded-md object-cover mr-4 flex-shrink-0"
                                />
                                <div>
                                    <p className="font-bold text-smd-dark">{post.name}</p>
                                    <p className="text-xs text-gray-500">Por: {post.user.name}</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-semibold text-gray-600">Categoría:</span>
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                    {post.category.name}
                                </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-semibold text-gray-600">Estado:</span>
                                    {post.status == 2 ? (
                                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Publicado</span>
                                    ) : (
                                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Borrador</span>
                                    )}
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t mt-2">
                                    <span className="text-sm font-semibold text-gray-600">Acciones:</span>
                                    <div className="flex gap-4">
                                        <Link
                                            href={route('admin.posts.edit', post.id)} // Corregido: pasar post.id
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            <PencilSquareIcon className="h-6 w-6" />
                                        </Link>
                                        <button
                                            onClick={() => confirmDeletion(post)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <TrashIcon className="h-6 w-6" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Paginación --- */}
            <div className="mt-6">
                <Pagination links={meta.links} />
            </div>

            <Modal show={confirmingPostDeletion} onClose={closeModal}>
                <form onSubmit={deletePost} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        ¿Estás seguro de que quieres eliminar este post?
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Una vez que el post sea eliminado, todos sus recursos y datos se borrarán permanentemente.
                        <br/>
                        <span className="font-bold">"{postToDelete?.name}"</span>
                    </p>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>
                        <DangerButton className="ms-3" disabled={processing}>
                            Eliminar Post
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

Index.layout = page => <AdminLayout children={page} title="Posts" />;
