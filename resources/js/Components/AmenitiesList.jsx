import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid'; // Usaremos un ícono para cada amenity

export default function AmenitiesList({ amenities }) {

    // Si no hay amenities o el array está vacío, no renderizamos nada.
    if (!amenities || amenities.length === 0) {
        return null;
    }

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold font-second text-smd-dark mb-4">
                Comodidades Incluidas
            </h2>
            {/* Usamos un grid para mostrar las amenities en dos columnas */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {amenities.map(amenity => (
                    <li key={amenity.id} className="flex items-center">
                        <CheckCircleIcon className="h-5 w-5 text-smd-soft-green mr-3 flex-shrink-0" />
                        <span className="text-smd-gray-text">{amenity.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
