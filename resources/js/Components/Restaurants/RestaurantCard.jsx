import React from 'react';
import { Link } from '@inertiajs/react';
import Rating from "@/Components/Utils/Rating.jsx";

export default function RestaurantCard({ restaurant }) {
    const imageUrl = restaurant.image
        ? restaurant.image.url
        : `https://placehold.co/600x400/2E6230/FFFFFF?text=${restaurant.name}`;

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group">
            <div className="overflow-hidden">
                <img src={imageUrl} alt={restaurant.name} className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="flex py-smd-16 flex-col flex-grow">
                <div className="px-smd-16">
                    <p className="text-xs font-semibold text-smd-soft-green uppercase">{restaurant.food_category.name}</p>
                    <h3 className="text-lg 2xl:text-xl font-bold font-second text-smd-dark mt-smd-4">{restaurant.name}</h3>
                    <p className="text-sm text-gray-500 mt-smd-4 flex-grow">{restaurant.address}</p>
                </div>
                <div className="pt-smd-8 border-t border-gray-100 flex justify-between items-center">
                    <div className="flex items-start flex-col">
                        <span className="text-xs pl-smd-16 text-gray-500">({restaurant.reviews_count}) Opiniones</span>
                        <Rating rating={restaurant.reviews_avg_rating} />
                    </div>
                    <Link href={route('restaurants.show', restaurant)} className="text-sm mr-smd-16 font-bold text-white px-smd-8 py-smd-4 2xl:px-smd-16 2xl:py-smd-8 rounded-full hover:bg-smd-yellow bg-smd-soft-green transform duration-300">Ver Más</Link>
                </div>
            </div>
        </div>
    );
}
