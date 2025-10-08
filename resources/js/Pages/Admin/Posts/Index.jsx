import AdminLayout from "@/Layouts/Admin/AdminLayout.jsx";
import Pagination from "@/Components/Utils/Pagination.jsx";
import {PencilSquareIcon, PlusIcon, TrashIcon} from "@heroicons/react/24/outline/index.js";
import {Head, Link} from "@inertiajs/react";

export default function Index({ posts }) {
    const { data, meta } = posts;
    return (
        <div>
            <Head title="Gestionar Posts" />

            {/* --- Cabecera de la Página --- */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-smd-dark">Posts del Blog</h1>
                <Link
                    href={route('admin.posts.create')} // Apunta a la ruta para crear un nuevo post
                    className="inline-flex items-center gap-2 bg-smd-soft-green text-white font-bold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                    <PlusIcon className="h-5 w-5" />
                    Crear Post
                </Link>
            </div>

            {/* --- Tabla de Posts --- */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
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
                                        href={route('admin.posts.edit', post)}
                                        className="text-blue-600 hover:text-blue-900"
                                        title="Editar"
                                    >
                                        <PencilSquareIcon className="h-5 w-5" />
                                    </Link>
                                    <Link
                                        href={route('admin.posts.destroy', post)}
                                        method="delete"
                                        as="button"
                                        className="text-red-600 hover:text-red-900"
                                        title="Eliminar"
                                        onBefore={() => confirm('¿Estás seguro de que quieres eliminar este post?')}
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* --- Paginación --- */}
            <div className="mt-6">
                <Pagination links={meta.links} />
            </div>
        </div>
    )
}

Index.layout = page => <AdminLayout children={page} title="Posts" />;
