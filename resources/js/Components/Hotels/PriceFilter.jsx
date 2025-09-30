import React from 'react';
import { router } from '@inertiajs/react';

export default function PriceFilter({ ranges, activeFilter }) {

    const handleFilterClick = (range) => {
        // Hacemos una nueva petición GET, añadiendo o cambiando el 'price_range'
        router.get(route('hotels.index'), {
            price_range: range
        }, {
            preserveState: true,
            replace: true,
        });
    };

    // Función para limpiar el filtro
    const clearFilter = () => {
        router.get(route('hotels.index'), {}, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-second font-bold text-smd-dark">
                    Precios
                </h3>
                {/* Mostramos el botón de limpiar solo si hay un filtro activo */}
                {activeFilter && (
                    <button onClick={clearFilter} className="text-sm text-smd-soft-green hover:underline">
                        Limpiar
                    </button>
                )}
            </div>
            <div className="flex flex-wrap gap-2">
                {ranges.map(range => (
                    <button
                        key={range}
                        onClick={() => handleFilterClick(range)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                            activeFilter === range
                                ? 'bg-smd-soft-green text-white'
                                : 'bg-gray-200 text-smd-dark hover:bg-gray-300'
                        }`}
                    >
                        {range}
                    </button>
                ))}
            </div>
        </div>
    );
}
