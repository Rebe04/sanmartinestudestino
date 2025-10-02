import MainLayout from "@/Layouts/MainLayout.jsx";
import blogImage from "@/assets/images/banner/1.webp";
import {ChevronRightIcon} from "@heroicons/react/24/outline/index.js";
import RestaurantCard from "@/Components/Restaurants/RestaurantCard.jsx";
import {Head, Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Utils/Pagination.jsx";

export default function Index({restaurants, foodCategories, filters}) {
    const handleFilterChange = (categoryId) => {
        const newFilters = { ...filters, food_category: categoryId };
        if (filters.food_category == categoryId) {
            router.get(route('restaurants.index'), {}, {
                preserveState: true,
                replace: true,
            });
            return;
        }

        router.get(route('restaurants.index'), { food_category: categoryId }, {
            preserveState: true,
            replace: true,
        });
    };
    return(
        <MainLayout>
            <Head title="¿Donde Comer?" />
            <div className="min-h-screen w-full">
                <div className={`flex flex-col relative items-center justify-center pt-smd-104 w-full h-smd-496`} style={{ backgroundImage: `url(${blogImage})`, backgroundSize: 'cover'}}>
                    <div className="absolute top-0 w-full h-smd-496 bg-smd-dark opacity-75"></div>
                    <h1 className="text-smd-light md:text-5xl 2xl:text-7xl font-second z-10">¿Donde Comer?</h1>
                    <div className="border border-gray-300 flex items-center gap-smd-8 justify-center bg-gray-500/15 mt-smd-16 backdrop-blur-sm text-smd-light md:py-smd-4 px-smd-16 2xl:py-smd-8 rounded-full z-10">
                        <p>Home</p> <ChevronRightIcon className={`h-smd-16 w-smd-16 `}/> <p>¿Donde Comer?</p>
                    </div>
                </div>
                <div className="sm-container">
                    {/* Barra de Filtros por Categoría */}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <aside>
                            <div className="bg-gray-200/80 rounded-xl mx-smd-24 lg:mx-0 p-smd-16 2xl:p-smd-32 mb-smd-32">
                                <h2 className="text-xl 2xl:text-2xl text-center lg:text-left font-second font-bold text-smd-dark mb-smd-16">¿Que Tipo de Comida uscabas?</h2>
                                <ul className="flex flex-col gap-smd-8">
                                    {foodCategories.map(category => (
                                        <button
                                            key={category.id}
                                            onClick={() => handleFilterChange(category.id)}
                                            className={`px-4 py-2 rounded-xl w-full block text-sm text-left font-semibold transition-colors ${
                                                filters.food_category == category.id
                                                    ? 'bg-smd-soft-green text-white'
                                                    : 'bg-white text-smd-dark hover:bg-gray-200'
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

                    {/* Grid de Restaurantes */}
                        <div className="grid px-smd-16 md:px-0 grid-cols-1 lg:grid-cols-2 lg:col-span-2 xl:col-span-3 md:pr-smd-16 xl:grid-cols-3 xl:pr-0 gap-6">
                            {restaurants.data.map(restaurant => (
                                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                            ))}
                        </div>
                    </div>

                    {/* Mensaje si no hay resultados */}
                    {restaurants.data.length === 0 && (
                        <div className="text-center py-10 col-span-full">
                            <p className="text-gray-500">No se encontraron restaurantes con los filtros seleccionados.</p>
                        </div>
                    )}

                    {/* Paginación */}
                    <div className="mt-12">
                        <Pagination links={restaurants.links} />
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
