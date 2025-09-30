import React from 'react';
import ReviewCard from "@/Components/Utils/ReviewCard.jsx";
import Pagination from "@/Components/Utils/Pagination.jsx";

export default function ReviewsList({ reviews }) {
    // Si no hay reseñas, muestra un mensaje amigable
    if (!reviews || reviews.length === 0) {
        return (
            <div className="mt-6 pt-6 border-t border-gray-200">
                <h2 className="text-2xl font-bold font-second text-smd-dark mb-4">
                    Opiniones
                </h2>
                <p className="text-gray-500">Este hotel aún no tiene opiniones. ¡Sé el primero en dejar una!</p>
            </div>
        );
    }

    return (
        <div className="mt-6 pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-bold font-second text-smd-dark mb-4">
                Opiniones ({reviews.total})
            </h2>
            <div className="space-y-6">
                {/* Mapeo sobre 'reviews.data' que contiene los resultados de la página actual */}
                {reviews.data.map(review => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>
            <Pagination links={reviews.links} />
        </div>
    );
}
