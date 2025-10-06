import MainLayout from "@/Layouts/MainLayout.jsx";
import {Head, router} from "@inertiajs/react";
import blogImage from "@/assets/images/banner/1.webp";
import {ChevronRightIcon} from "@heroicons/react/24/outline/index.js";
import PlaceCard from "@/Components/Places/Placecard.jsx";
import Pagination from "@/Components/Utils/Pagination.jsx";

export default function Index({places, placeCategories, filters}) {

    const handleFilterChange = (categoryId) => {
        const newFilters = { ...filters, place_category: categoryId };
        if (filters.place_category == categoryId) {
            router.get(route('places.index'), {}, {
                preserveState: true,
                replace: true,
            });
            return;
        }

        router.get(route('places.index'), { place_category: categoryId }, {
            preserveState: true,
            replace: true,
        });
    };
    return(
        <MainLayout>
            <Head title="Lugares" />
            <div className="min-h-screen w-full">
                <div className={`flex flex-col relative items-center justify-center pt-smd-104 w-full h-smd-496`} style={{ backgroundImage: `url(${blogImage})`, backgroundSize: 'cover'}}>
                    <div className="absolute top-0 w-full h-smd-496 bg-smd-dark opacity-75"></div>
                    <h1 className="text-smd-light text-xl text-center md:text-5xl 2xl:text-7xl font bold font-second z-10">Nuestros Atractivos Turísticos</h1>
                    <div className="border border-gray-300 flex items-center gap-smd-8 justify-center bg-gray-400/15 backdrop-blur-sm mt-smd-16 text-smd-light px-smd-16 py-smd-8 rounded-full z-10">
                        <p>Home</p> <ChevronRightIcon className={`h-smd-16 w-smd-16 `}/> <p>Lugares</p>
                    </div>
                </div>
                <div className="sm-container ">
                    <div className="grid mt-smd-64 grid-cols-1 md:grid-cols-3 xl:grid-cols-4 lg:gap-smd-32 lg:px-smd-32 xl:px-smd-0">
                        <aside>
                            <div className="bg-gray-200/80 rounded-xl p-smd-16 mb-smd-32">
                                <h2 className="text-2xl text-center lg:text-left font-second font-bold text-smd-dark mb-smd-16">Filtra por Tipos de Lugares</h2>
                                <ul className="flex flex-col gap-smd-8">
                                    {placeCategories.map(category => (
                                        <button
                                            key={category.id}
                                            onClick={() => handleFilterChange(category.id)}
                                            className={`px-4 py-2 rounded-xl w-full block text-sm text-left font-semibold transition-colors ${
                                                filters.place_category == category.id
                                                    ? 'bg-smd-soft-green text-white'
                                                    : 'bg-white text-smd-dark hover:bg-smd-yellow hover:text-white'
                                            }`}
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </ul>
                            </div>
                            <div className="">

                            </div>
                        </aside>
                        <div className="lg:pr-smd-16 lg:pr-smd-0 md:col-span-2 xl:col-span-3">
                            {places.data.map((place, index) => (
                                <div className="mb-smd-32" key={index}>
                                    <PlaceCard place={place} />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Paginación */}
                    <div className="mt-12">
                        <Pagination links={places.links} />
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
