import React from 'react';
import {StarIcon} from "@heroicons/react/16/solid/index.js";
import Rating from "@/Components/Utils/Rating.jsx";

// Recibe una prop 'review' con los datos de una sola reseña
export default function ReviewCard({ review }) {
    // Formateador para mostrar la fecha de forma legible
    const formattedDate = new Date(review.created_at).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="bg-gray-50 p-smd-16 2xl:p-smd-24 rounded-xl border">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                    {/* Placeholder para un avatar de usuario */}
                    <div className="w-10 h-10 rounded-full bg-smd-soft-green flex items-center justify-center text-white font-bold mr-3">
                        {review.user ? review.user.name.charAt(0) : '?'}
                    </div>
                    <div>
                        <p className="font-bold text-smd-dark">{review.user ? review.user.name : 'Anónimo'}</p>
                        <p className="text-xs text-gray-500">{formattedDate}</p>
                    </div>
                </div>
                {/* Mostramos el rating de esta reseña específica */}
                <Rating rating={review.rating} />

            </div>
            <p className="text-gray-600">
                {review.comment}
            </p>
        </div>
    );
}
