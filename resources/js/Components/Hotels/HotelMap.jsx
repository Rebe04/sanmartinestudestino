import React from 'react';
import { MapPinIcon } from '@heroicons/react/24/solid';

export default function HotelMap({ address, name }) {
    // Construir la URL para el iframe de Google Maps.
    // Uso de encodeURIComponent para asegurar que la dirección se formatee correctamente para la URL.
    const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

    return (
        <aside className="mb-smd-16"> {/* Hacemos el aside "pegajoso" en pantallas grandes */}
            <div className="bg-white rounded-xl p-smd-16 2xl:p-smd-24 border border-gray-200">
                <h3 className="text-xl font-second font-bold text-smd-dark mb-4 flex items-center">
                    <MapPinIcon className="h-6 w-6 mr-2 text-smd-soft-green" />
                    Ubicación
                </h3>

                {/* Contenedor del mapa con un aspect-ratio para que sea responsive */}
                <div className="aspect-w-16 h-smd-496 rounded-lg overflow-hidden border">
                    {address ? (
                        <iframe
                            src={mapSrc}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title={`Mapa de ${name}`}
                        ></iframe>
                    ) : (
                        <div className="bg-gray-200 flex items-center justify-center">
                            <p className="text-gray-500">Dirección no disponible</p>
                        </div>
                    )}
                </div>
                <p className="text-gray-600 mt-4 text-center">
                    {address}
                </p>
            </div>
        </aside>
    );
}
