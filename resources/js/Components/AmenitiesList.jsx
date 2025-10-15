import React from 'react';
import AmenityIcon from './AmenityIcon';

export default function AmenitiesList({ amenities }) {
    if (!amenities || amenities.length === 0) {
        return null;
    }

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold font-second text-smd-dark mb-4">
                Comodidades Incluidas
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {amenities.map(amenity => (
                    <li key={amenity.id} className="flex items-center">
                        <AmenityIcon iconName={amenity.icon} className="h-6 w-6 text-smd-soft-green mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{amenity.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
