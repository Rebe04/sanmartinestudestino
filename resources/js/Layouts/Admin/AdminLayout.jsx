import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Head, usePage  } from '@inertiajs/react';
import Notification from '@/Components/Utils/Notification';

export default function AdminLayout({ children, title }) {
    // Estado para controlar si el sidebar está plegado o desplegado
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);

    const { url } = usePage();
    useEffect(() => {
        if (window.innerWidth < 1024) {
            setIsSidebarOpen(false);
        }
    }, [url]);

    return (
        <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
            <Head title={title} />
            <Sidebar isOpen={isSidebarOpen} />
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-black/60 z-20 lg:hidden"
                    aria-hidden="true"
                />
            )}
            <div className={`relative flex-1 flex flex-col transition-all duration-300 ease-in-out`}>
                <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

                {/* Contenido principal con scroll */}
                <main className="flex-1 overflow-y-auto bg-gray-200 p-8">
                    {children}
                </main>
            </div>
            <Notification />
        </div>
    );
}
