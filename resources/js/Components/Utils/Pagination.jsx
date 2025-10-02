import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export default function Pagination({ links = [] }) {
    // No se renderiza nada si la paginación no es necesaria
    if (links.length <= 3) {
        return null;
    }

    return (
        <nav className="flex items-center justify-center mt-8">
            {links.map((link, index) => {
                const isFirst = index === 0;
                const isLast = index === links.length - 1;

                // Determina qué mostrar: un ícono para el primero/último, o el número para los demás.
                // Se usa 'dangerouslySetInnerHTML' para los labels que vienen de Laravel como "Previous" o "Next"
                let label;
                if (isFirst) {
                    label = <ChevronLeftIcon className="h-5 w-5" />;
                } else if (isLast) {
                    label = <ChevronRightIcon className="h-5 w-5" />;
                } else {
                    label = link.label;
                }

                // Para links deshabilitados (página actual, "...")
                if (!link.url) {
                    return (
                        <div
                            key={index}
                            className={`px-3 py-2 mx-1 text-sm text-gray-400 bg-white border rounded-md cursor-default ${link.active ? 'font-bold' : ''}`}
                        >
                            {label}
                        </div>
                    );
                }

                // Para links habilitados, se usa el componente <Link> de Inertia
                return (
                    <Link
                        key={index}
                        href={link.url}
                        preserveState
                        preserveScroll
                        className={`flex items-center justify-center px-3 py-2 mx-1 text-sm transition-colors duration-300 border rounded-md hover:bg-smd-soft-green hover:text-white ${
                            link.active ? 'bg-smd-soft-green text-white' : 'bg-white text-gray-700'
                        }`}
                    >
                        {label}
                    </Link>
                );
            })}
        </nav>
    );
}
