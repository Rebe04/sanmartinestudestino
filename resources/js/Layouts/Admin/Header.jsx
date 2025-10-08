import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import { Bars3Icon, BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Dropdown from "@/Components/Dropdown.jsx";

// Recibe la función para controlar el estado del sidebar
export default function Header({ setIsOpen, isOpen }) {
    const { auth } = usePage().props;

    return (
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
            {/* Botón Hamburguesa para el Sidebar */}
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 hover:text-gray-800">
                <Bars3Icon className="h-6 w-6" />
            </button>

            {/* Lado Derecho: Notificaciones y Perfil de Usuario */}
            <div className="flex items-center space-x-4">
                <button className="relative text-gray-500 hover:text-gray-800">
                    <BellIcon className="h-6 w-6" />
                    {/* Punto de notificación (opcional) */}
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Dropdown de Usuario */}
                <Dropdown>
                    <Dropdown.Trigger>
                        <button className="flex items-center space-x-2">
                            <UserCircleIcon className="h-8 w-8 text-gray-400" />
                            <span className="hidden md:inline text-smd-dark font-medium">{auth.user.name}</span>
                        </button>
                    </Dropdown.Trigger>

                    <Dropdown.Content>
                        <Dropdown.Link href={route('profile.edit')}>Perfil</Dropdown.Link>
                        <Dropdown.Link href={route('logout')} method="post" as="button">
                            Cerrar Sesión
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </header>
    );
}
