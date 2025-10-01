import MainLayout from "@/Layouts/MainLayout.jsx";
import blogImage from "@/assets/images/banner/1.webp";
import {ChevronRightIcon} from "@heroicons/react/24/outline/index.js";
import RestaurantImageGallery from "@/Components/Restaurants/RestaurantImageGallery.jsx";
import {MapPinIcon, StarIcon} from "@heroicons/react/16/solid/index.js";
import DishCard from "@/Components/Restaurants/DishCard.jsx";
import ReviewsList from "@/Components/Utils/ReviewsList.jsx";

export default function Index({restaurant, reviews}) {
    const totalStars = 5;
    const fullStars = Math.round(restaurant.reviews_avg_rating || 0);
    const dishes = restaurant.dishes
    return(
        <MainLayout>
            <div className="min-h-screen w-full">
                <div className={`flex flex-col relative items-center justify-center pt-smd-104 w-full h-smd-496`} style={{ backgroundImage: `url(${blogImage})`, backgroundSize: 'cover'}}>
                    <div className="absolute top-0 w-full h-smd-496 bg-smd-dark opacity-75"></div>
                    <h1 className="text-smd-light text-center text-4xl lg:text-7xl font-second z-10">{restaurant.name}</h1>
                    <div className="border border-gray-300 flex items-center gap-smd-8 justify-center bg-gray-400/15 backdrop-blur-sm mt-smd-16 text-smd-light px-smd-16 py-smd-8 rounded-full z-10">
                        <p>Home</p> <ChevronRightIcon className={`h-smd-16 w-smd-16 `}/> <p>¿Detalles del restaurante</p>
                    </div>
                </div>
                <div className="sm-container">
                    <div className="flex flex-col mb-smd-32 rounded-2xl bg-gray-200 px-smd-24 py-smd-32 md:flex-row md:justify-between items-center w-full">
                        <div>
                            <h1 className="text-2xl font-second text-dark font-bold">
                                {restaurant.name}
                            </h1>
                            <p className="text-sm text-gray-500">
                                <span className="font-semibold">Tipo:</span> {restaurant.food_category.name}
                            </p>
                        </div>
                        <div className="flex flex-col md:flex-row items-center text-gray-500">
                            <p className="mr-smd-8">
                                ({restaurant.reviews_count} Opiniones)
                            </p>
                            <div className="flex">
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
                            </div>
                            <div className="flex ml-smd-8">
                                <MapPinIcon className="w-5 h-5 text-smd-soft-green text-lg" />
                                <p>{restaurant.address}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-smd-16">
                        <RestaurantImageGallery images={restaurant.images} />
                        <article>
                            {restaurant.description}
                        </article>
                    </div>
                    <hr className="border-gray-200 my-smd-24"/>
                    <div className="rounded-xl bg-gray-200 p-smd-16 my-smd-24">
                        <h2 className="text-center mb-smd-16 text-3xl text-smd-soft-green font-bold">
                            Platos Destacados
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {dishes.map((dish, index) => (
                                <DishCard dish={dish} />
                            ))}
                        </div>
                    </div>
                    <ReviewsList reviews={reviews} />
                </div>
            </div>
        </MainLayout>
    )
}
