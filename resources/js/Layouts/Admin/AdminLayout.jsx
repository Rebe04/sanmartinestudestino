import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Head } from '@inertiajs/react';

export default function AdminLayout({ children, title }) {
    // Estado para controlar si el sidebar está plegado o desplegado
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <Head title={title} />

            {/* Pasa el estado y la función para cambiarlo a los componentes hijos */}
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

                {/* Contenido principal con scroll */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
