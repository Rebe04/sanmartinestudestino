import React, {useState} from 'react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { Link, Head, useForm } from '@inertiajs/react';
import { PencilSquareIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import Pagination from "@/Components/Utils/Pagination.jsx";
import Modal from "@/Components/Utils/Modal.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";

export default function Index({ tags }) {

    const { data, meta } = tags;
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [tagToDelete, setTagToDelete] = useState(null);
    const { delete: destroy, processing } = useForm();

    const confirmDeletion = (tag) => {
        setTagToDelete(tag);
        setConfirmingDeletion(true);
    };
    const closeModal = () => setConfirmingDeletion(false);

    const deleteTag = (e) => {
        e.preventDefault();
        destroy(route('admin.tags.destroy', tagToDelete.slug), {
            onSuccess: () => closeModal(),
        });
    };
    return (
        <>
            <Head title="Gestionar Tags" />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-smd-dark">Tags</h1>
                <Link href={route('admin.tags.create')} className="inline-flex items-center gap-2 bg-smd-soft-green text-white font-bold px-4 py-2 rounded-lg hover:bg-green-700">
                    <PlusIcon className="h-5 w-5" />
                    Crear Tag
                </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="p-4 ...">Color</th>
                        <th className="p-4 ...">Nombre</th>
                        <th className="p-4 ...">Slug</th>
                        <th className="p-4 ...">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tags.data.map((tag) => (
                        <tr key={tag.id} className="border-b">
                            <td className="p-4">
                                <div style={{ backgroundColor: tag.color }} className="w-6 h-6 rounded-full border border-gray-300"></div>
                            </td>
                            <td className="p-4 font-bold">{tag.name}</td>
                            <td className="p-4 text-gray-500">{tag.slug}</td>
                            <td className="p-4">
                                <div className="flex gap-2">
                                    <Link href={route('admin.tags.edit', tag.slug)} className="text-blue-600 hover:text-blue-900" title="Editar">
                                        <PencilSquareIcon className="h-5 w-5" />
                                    </Link>
                                    <button onClick={() => confirmDeletion(tag)} className="text-red-600 hover:text-red-900" title="Eliminar">
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Pagination links={tags.meta.links} />
            <Modal show={confirmingDeletion} onClose={closeModal}>
                <form onSubmit={deleteTag} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">¿Eliminar Tag?</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Se eliminará la tag <span className="font-bold">"{tagToDelete?.name}"</span>.
                    </p>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>
                        <DangerButton className="ms-3" disabled={processing}>Eliminar</DangerButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}
Index.layout = page => <AdminLayout children={page} title="Tags" />;
