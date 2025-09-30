import {ArrowRightIcon, MapPinIcon, StarIcon} from "@heroicons/react/16/solid/index.js";
import {Link} from "@inertiajs/react";

export default function HotelCard({hotel, rating}) {
    const totalStars = 5;
    const fullStars = Math.round(rating || 0);
    return (
        <div className="border rounded-2xl overflow-hidden shadow-lg">
            {/* Ahora usamos hotel.image, que es un solo objeto */}
            <img
                src={hotel.image ? hotel.image.url : 'https://placehold.co/600x400/2E6230/FFFFFF?text=Hotel'}
                alt={hotel.name}
                className="w-full h-48 object-cover min-h-smd-232"
            />
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
                <span className="text-xs ml-smd-8 text-gray-500">
                    ({hotel.reviews_count} {hotel.reviews_count === 1 ? 'opinión' : 'opiniones'})
                </span>
            </div>
            <div className="p-smd-16">
                <div className="flex justify-between items-center">
                    <h3 className="font-second font-bold text-smd-dark text-xl">{hotel.name}</h3>
                    <span className="font-semibold text-smd-soft-green">{hotel.price_range}</span>
                </div>
                <div className="flex gap-smd-8 items-center py-smd-8">
                    <span>
                    <MapPinIcon className="w-5 h-5 text-smd-dark text-lg" />
                </span>
                    <p className="text-gray-600 text-sm mt-1">{hotel.address}</p>
                </div>
                <Link className="block py-smd-8 text-center mt-smd-8 bg-smd-soft-green text-smd-light transform duration-300 hover:bg-smd-yellow rounded-full font-semibold" href={route('hotels.show', hotel)}>
                    <span className="flex gap-smd-16 justify-center w-full">
                        Ver más <ArrowRightIcon className="w-5 h-5 text-lg" />
                    </span>
                </Link>
            </div>
        </div>
    )
}
