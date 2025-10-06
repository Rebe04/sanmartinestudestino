import MainLayout from "@/Layouts/MainLayout.jsx";
import {Head} from "@inertiajs/react";
import blogImage from "@/assets/images/banner/1.webp";
import {ChevronRightIcon} from "@heroicons/react/24/outline/index.js";
import {MapPinIcon, StarIcon} from "@heroicons/react/16/solid/index.js";
import PlaceSideBar from "@/Components/Places/PlaceSideBar.jsx";
import PlaceImageGallery from "@/Components/Places/PLaceImageGallery.jsx";

export default function Index({place, placeCategories, places}) {
    return(
        <MainLayout>
            <Head title={place.name} />
            <div className="min-h-screen w-full">
                <div className={`flex flex-col relative items-center justify-center pt-smd-104 w-full h-smd-496`} style={{ backgroundImage: `url(${blogImage})`, backgroundSize: 'cover'}}>
                    <div className="absolute top-0 w-full h-smd-496 bg-smd-dark opacity-75"></div>
                    <h1 className="text-smd-light text-xl text-center md:text-5xl 2xl:text-7xl font bold font-second z-10">{place.name}</h1>
                    <div className="border border-gray-300 flex items-center gap-smd-8 justify-center bg-gray-400/15 backdrop-blur-sm mt-smd-16 text-smd-light px-smd-16 py-smd-8 rounded-full z-10">
                        <p>Home</p> <ChevronRightIcon className={`h-smd-16 w-smd-16 `}/> <p>Lugares</p>
                    </div>
                </div>
                <div className="w-full">
                    <div className="sm-container">
                            <div className="flex flex-col md:flex-row md:justify-between items-center w-full bg-gray-200 p-smd-32 rounded-2xl">
                                <div className="flex flex-col md:flex-row items-center text-gray-500">
                                    <div className="flex gap-smd-8">
                                        <MapPinIcon className="w-5 h-5 text-smd-soft-green text-lg" />
                                        <p className="text-gray-500">{place.address}</p>
                                    </div>
                                </div>
                                <p className="text-smd-dark font-second font-bold text-4xl">
                                    {place.price}
                                </p>
                            </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-x-smd-16">
                            <div className="w-full my-smd-16 lg:col-span-2 xl:col-span-3">
                                <PlaceImageGallery images={place.images} />
                                <div className="prose lg:prose-xl mb-smd-40 mt-smd-32 px-smd-16 text-justify w-full mx-auto xl:mx-0 2xl:px-0" dangerouslySetInnerHTML={{ __html: place.description }}>
                                </div>
                            </div>
                            <PlaceSideBar place={place} places={places} />
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
