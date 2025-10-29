import React, { useState } from 'react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { Link, Head, useForm } from '@inertiajs/react';
import { PencilSquareIcon, TrashIcon, PlusIcon, ClipboardDocumentIcon, CheckIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import Pagination from "@/Components/Utils/Pagination.jsx";
import Modal from "@/Components/Utils/Modal.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";

export default function Index({ routes }) {
    const { data, meta } = routes;

    const [copiedRouteId, setCopiedRouteId] = useState(null);
    const handleCopyClick = (routeItem) => {
        const routeUrl = window.route('routes.show', routeItem.slug);

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(routeUrl).then(() => {
                setCopiedRouteId(routeItem.id);
                setTimeout(() => setCopiedRouteId(null), 2000);
            }).catch(err => {
                console.error('Error al copiar la URL (moderno): ', err);
                alert('No se pudo copiar la URL.');
            });
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = routeUrl;
            textArea.style.position = "fixed"; textArea.style.left = "-9999px";
            document.body.appendChild(textArea);
            textArea.focus(); textArea.select();
            try {
                document.execCommand('copy');
                setCopiedRouteId(routeItem.id);
                setTimeout(() => setCopiedRouteId(null), 2000);
            } catch (err) {
                console.error('Error al copiar la URL (antiguo): ', err);
                alert('No se pudo copiar la URL.');
            }
            document.body.removeChild(textArea);
        }
    };

    // --- Lógica para Descargar QR ---
    const handleQrDownload = (routeItem) => {
        const routeUrl = window.route('routes.show', routeItem.slug);
        const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(routeUrl)}`;

        fetch(qrCodeApiUrl)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `qr-${routeItem.slug}.png`);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(url); // Libera memoria
            }).catch(err => {
            console.error('Error al descargar el QR:', err);
            alert('No se pudo descargar el código QR.');
        });
    };

    // --- Lógica para Eliminar ---
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [routeToDelete, setRouteToDelete] = useState(null);
    const { delete: destroy, processing } = useForm();
    const confirmDeletion = (route) => { setRouteToDelete(route); setConfirmingDeletion(true); };
    const closeModal = () => setConfirmingDeletion(false);
    const deleteRoute = (e) => {
        e.preventDefault();
        destroy(route('admin.routes.destroy', routeToDelete.slug), { onSuccess: () => closeModal() });
    };

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-smd-dark">Rutas Turísticas</h1>
                <Link href={route('admin.routes.create')} className="inline-flex items-center gap-2 bg-smd-soft-green text-white font-bold px-4 py-2 rounded-lg hover:bg-green-700">
                    <PlusIcon className="h-5 w-5" />
                    Crear Ruta
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full hidden md:table">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Nombre</th>
                        <th className="p-4 text-center text-sm font-semibold text-gray-600 uppercase">Paradas</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Tiempo Estimado</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Acciones</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {data.map((routeItem) => (
                        <tr key={routeItem.id} className="hover:bg-gray-50">
                            <td className="p-4 flex items-center">
                                <img src={routeItem.image_url} alt={routeItem.name} className="w-10 h-10 rounded-md object-cover mr-4 flex-shrink-0"/>
                                <div>
                                    <p className="font-bold text-smd-dark">{routeItem.name}</p>
                                </div>
                            </td>
                            <td className="p-4 text-center text-gray-700 font-medium">{routeItem.stops_count}</td>
                            <td className="p-4 text-gray-700">{routeItem.time}</td>
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <Link href={route('admin.routes.edit', routeItem.slug)} className="text-blue-600 hover:text-blue-900" title="Editar"><PencilSquareIcon className="h-5 w-5" /></Link>
                                    <button onClick={() => handleCopyClick(routeItem)} className="text-gray-500 hover:text-smd-soft-green relative" title="Copiar URL">
                                        {copiedRouteId === routeItem.id ? <CheckIcon className="h-5 w-5 text-smd-soft-green" /> : <ClipboardDocumentIcon className="h-5 w-5" />}
                                    </button>
                                    <button onClick={() => handleQrDownload(routeItem)} className="text-gray-500 hover:text-purple-600" title="Descargar QR"><QrCodeIcon className="h-5 w-5" /></button>
                                    <button onClick={() => confirmDeletion(routeItem)} className="text-red-600 hover:text-red-900" title="Eliminar"><TrashIcon className="h-5 w-5" /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="md:hidden divide-y divide-gray-200">
                    {data.map((routeItem) => (
                        <div key={routeItem.id} className="p-4">
                            <div className="flex items-start mb-4">
                                <img src={routeItem.image_url} alt={routeItem.name} className="w-16 h-16 rounded-md object-cover mr-4 flex-shrink-0"/>
                                <div className="flex-grow">
                                    <p className="font-bold text-smd-dark">{routeItem.name}</p>
                                    <p className="text-xs text-gray-500">{routeItem.time}</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-semibold text-gray-600">Paradas:</span>
                                    <span>{routeItem.stops_count}</span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t mt-2">
                                    <span className="text-sm font-semibold text-gray-600">Acciones:</span>
                                    <div className="flex gap-4">
                                        <Link href={route('admin.routes.edit', routeItem.slug)} className="text-blue-600"><PencilSquareIcon className="h-6 w-6" /></Link>
                                        <button onClick={() => handleCopyClick(routeItem)} className="text-gray-500 relative">{copiedRouteId === routeItem.id ? <CheckIcon className="h-6 w-6 text-smd-soft-green" /> : <ClipboardDocumentIcon className="h-6 w-6" />}</button>
                                        <button onClick={() => handleQrDownload(routeItem)} className="text-purple-600"><QrCodeIcon className="h-6 w-6" /></button>
                                        <button onClick={() => confirmDeletion(routeItem)} className="text-red-600"><TrashIcon className="h-6 w-6" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {data.length === 0 && (
                <div className="text-center py-10"><p className="text-gray-500">No se encontraron rutas.</p></div>
            )}

            <div className="mt-6">
                <Pagination links={meta.links} />
            </div>

            <Modal show={confirmingDeletion} onClose={closeModal}>
                <form onSubmit={deleteRoute} className="p-6">
                    <h2 className="text-lg font-medium">¿Eliminar Ruta?</h2>
                    <p className="mt-1 text-sm text-gray-600">Se eliminará la ruta <span className="font-bold">"{routeToDelete?.name}"</span> y todas sus paradas asociadas.</p>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>
                        <DangerButton className="ms-3" disabled={processing}>Eliminar Ruta</DangerButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}

Index.layout = page => <AdminLayout children={page} title="Gestionar Rutas" />;
