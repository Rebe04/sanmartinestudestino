import MainLayout from "@/Layouts/MainLayout.jsx";
import blogImage from "@/assets/images/banner/1.webp";
import {ChevronRightIcon} from "@heroicons/react/24/outline/index.js";
import PriceFilter from "@/Components/Hotels/PriceFilter.jsx";
import HotelCard from "@/Components/Hotels/HotelCard.jsx";
import {Head} from "@inertiajs/react";
import Pagination from "@/Components/Utils/Pagination.jsx";
import React from "react";

export default function Index({ hotels, filters, priceRanges }) {
    return(
        <div>
            <div className="min-h-screen w-full">
                <div className={`flex flex-col relative items-center justify-center pt-smd-104 w-full h-smd-496`} style={{ backgroundImage: `url(${blogImage})`, backgroundSize: 'cover'}}>
                    <div className="absolute top-0 w-full h-smd-496 bg-smd-dark opacity-75"></div>
                    <h1 className="text-smd-light text-3xl text-center md:text-5xl 2xl:text-7xl font-bold font-second z-10">¿Donde Dormir?</h1>
                    <div className="border border-gray-300 flex items-center gap-smd-8 justify-center bg-gray-500/15 mt-smd-16 backdrop-blur-sm text-smd-light md:py-smd-4 px-smd-16 2xl:py-smd-8 rounded-full z-10">
                        <p>Home</p> <ChevronRightIcon className={`h-smd-16 w-smd-16 `}/> <p>¿Donde Dormir?</p>
                    </div>
                </div>


                <div className="sm-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Columna de Filtros */}
                        <aside className="lg:col-span-1">
                            <PriceFilter
                                ranges={priceRanges}
                                activeFilter={filters.price_range}
                            />
                        </aside>
                        <div className="lg:col-span-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {hotels.data.map(hotel => (
                                    <HotelCard rating={hotel.reviews_avg_rating} hotel={hotel} key={hotel.id} />
                                ))}
                            </div>
                            {hotels.data.length === 0 && (
                                <div className="text-center py-10 col-span-full">
                                    <p className="text-gray-500">No se encontraron hoteles con los filtros seleccionados.</p>
                                </div>
                            )}
                            {/* Paginación */}
                            <div className="my-smd-32">
                                <Pagination links={hotels.links} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

Index.layout = page => <MainLayout children={page} title="Donde Dormir" />;
