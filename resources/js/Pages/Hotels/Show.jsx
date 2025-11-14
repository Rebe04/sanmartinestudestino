import MainLayout from "@/Layouts/MainLayout.jsx";
import blogImage from "@/assets/images/banner/1.webp";
import {ChevronRightIcon} from "@heroicons/react/24/outline/index.js";
import {MapPinIcon, StarIcon} from "@heroicons/react/16/solid/index.js";
import HotelImageGallery from "@/Components/Hotels/HotelImageGallery.jsx";
import AmenitiesList from "@/Components/AmenitiesList.jsx";
import HotelMap from "@/Components/Hotels/HotelMap.jsx";
import SocialIcon from "@/Components/Utils/SocialIcon.jsx";
import ReviewsList from "@/Components/Utils/ReviewsList.jsx";
import React from "react";
import {Head} from "@inertiajs/react";

export default function Show({hotel, reviews}) {
    const totalStars = 5;
    const fullStars = Math.round(hotel.reviews_avg_rating || 0);
    return(
        <>
            <Head title={`${hotel.name}`} />
            <div>
                <div className={`flex flex-col relative items-center justify-center pt-smd-104 w-full h-smd-496`} style={{ backgroundImage: `url(${blogImage})`, backgroundSize: 'cover'}}>
                    <div className="absolute top-0 w-full h-smd-496 bg-smd-dark opacity-75"></div>
                    <h1 className="text-smd-light text-3xl text-center md:text-5xl 2xl:text-7xl font-bold font-second z-10">{hotel.name}</h1>
                    <div className="border border-gray-300 flex items-center gap-smd-8 justify-center bg-gray-500/15 mt-smd-16 backdrop-blur-sm text-smd-light md:py-smd-4 px-smd-16 2xl:py-smd-8 rounded-full z-10">
                        <p>Home</p> <ChevronRightIcon className={`h-smd-16 w-smd-16 `}/> <p>Detalles del Hotel</p>
                    </div>
                </div>
                <div className="sm-container">
                    <div className="flex flex-col md:flex-row md:justify-between bg-gray-200 p-smd-16 2xl:p-smd-32 rounded-2xl mt-smd-16 2xl:mt-0 items-center w-full">
                        <div className="flex flex-col md:flex-row items-center text-smd-gray-text">
                            <p className="mr-smd-8">
                                ({hotel.reviews_count} Opiniones)
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
                                <p className="text-smd-gray-text">{hotel.address}</p>
                            </div>
                        </div>
                        <p className="text-smd-dark font-second font-bold text-4xl">
                            {hotel.price_range}
                        </p>
                    </div>
                    <div className="w-full my-smd-16">
                        <HotelImageGallery images={hotel.images} />
                    </div>
                    <div className="grid lg:grid-cols-3 gap-smd-16 px-smd-16 md:px-0 pb-smd-32">
                        <div className="col-span-2">
                            <div className="text-smd-gray-text">
                                {hotel.description}
                            </div>
                            <AmenitiesList amenities={hotel.amenities} />
                            <ReviewsList reviews={reviews} />
                        </div>
                        <div className="2xl:min-h-smd-592">
                            <HotelMap address={hotel.address} name={hotel.name} />
                            <div className="bg-gray-200/80 rounded-xl mx-smd-24 lg:mx-0 p-smd-16 2xl:p-smd-32">
                                <h2 className="text-2xl text-center lg:text-left font-second font-bold text-smd-dark mb-smd-16">Síguenos</h2>
                                <div className="flex justify-start  items-center gap-smd-16">
                                    <SocialIcon className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white border-2 border-green-500 transition-colors duration-300 hover:bg-green-500`} href="https://www.facebook.com/alcaldiasanmartindelosllanos">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-facebook" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" /></svg>
                                    </SocialIcon>
                                    <SocialIcon className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white border-2 border-green-500 transition-colors duration-300 hover:bg-green-500`} href="https://x.com/SanMartin_Meta">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-x" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
                                    </SocialIcon>
                                    <SocialIcon className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white border-2 border-green-500 transition-colors duration-300 hover:bg-green-500`} href="https://www.instagram.com/alcaldiasanmartindelosllanos/">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-instagram" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M16.5 7.5l0 .01" /></svg>
                                    </SocialIcon>
                                    <SocialIcon className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white border-2 border-green-500 transition-colors duration-300 hover:bg-green-500`} href="https://www.youtube.com/@AlcaldiadeSanMartindeLosLlanos">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-youtube" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                            <path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z" />
                                            <path d="M10 9l5 3l-5 3z" />
                                        </svg>
                                    </SocialIcon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

Show.layout = page => <MainLayout children={page} title="Hotel:" />;
