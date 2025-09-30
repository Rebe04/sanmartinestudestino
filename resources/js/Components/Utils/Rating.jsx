import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

// Recibe una prop 'rating' con el valor numérico
export default function Rating({ hotel = null, rating = 0 }) {
    const totalStars = 5;
    const fullStars = Math.round(rating || 0); // Redondea el rating al entero más cercano

    return (
        <div className="flex px-smd-16 pt-smd-16 items-center">
            {[...Array(totalStars)].map((_, index) => {
                const starNumber = index + 1;
                return (
                    <StarIcon
                        key={starNumber}
                        className={`w-5 h-5 ${
                            starNumber <= fullStars ? 'text-smd-soft-green' : 'text-gray-300'
                        }`}
                    />
                );
            })}
            {
                hotel && <span className="text-xs ml-smd-8 text-gray-500">
                ({hotel.reviews_count} {hotel.reviews_count === 1 ? 'opinión' : 'opiniones'})
                </span>
            }
        </div>
    );
}
