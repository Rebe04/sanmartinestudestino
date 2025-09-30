import wallpaper from "../../assets/images/wallpaper-01.png"
import cascada from "../../assets/images/routes/cascada.webp"
import espanto from "../../assets/images/routes/Espanto.webp"
import iglesia from "../../assets/images/routes/Iglesia.webp"
import monumento from "../../assets/images/routes/monumento.webp"
import {Link} from "@inertiajs/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline/index.js";
export default function RoutesSection() {
    const routes = [
        {
            name: "Ruta del Folclor y Cuadrillas",
            description: "Recorre la historia, vestimenta, espacio, personajes, clave de las Cuadrillas",
            keyActivities: [
                "Casa dela Cultura",
                "Plaza Gabino de Balboa",
                "Iglesia",
                "Encuentro con Cuadrilleros",
                "Talleres de Joropo"
            ],
            image: monumento,
        },
        {
            name: "Ruta del Caño Camoa",
            description: "Experiencia fluvial de naturaleza en zonas cercanas al casco urbano",
            keyActivities: [
                "Baños naturales",
                "Observación de aves",
                "Caminatas guiadas",
                "Muestra de gastronocía sanmartinera",
            ],
            image: cascada
        },
        {
            name: "Ruta Histórica, Urbana y Patrimonial",
            description: "Conecta los principales bienes históricos y arquitectónicos",
            keyActivities: [
                "Iglesia",
                "Biblioteca",
                "Parques",
                "Esculturas",
                "Narración oral guiada",
            ],
            image: iglesia
        },
    ]

    return (
        <>
        <section className="bg-gray-50 py-smd-96 w-full" style={{ backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover' }}>
            <div className="mx-auto px-1 md:px-4 w-full max-w-smd-max">
                <div className="w-full flex flex-col px-smd-24 md:flex-row md:content-center justify-between md:items-center">
                    <div className="mb-8 lg:w-1/2 md:pr-smd-24">
                        <span className="text-smd-soft-green text-2xl">
                            Caminos por Descubrir
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-smd-dark mt-2 mb-4" style={{ fontFamily: 'Manrope, cursive' }}>
                            Nuestras Rutas Destacadas
                        </h2>
                    </div>
                    <div className="mb-8 md:w-1/2 lg:w-1/3">
                        <p className="text-smd-gray-text">
                            Cada ruta es una invitación a vivir el llano de una forma única. Sigue los senderos que te llevan a través de paisajes impresionantes, historias cautivadoras y la auténtica cultura sanmartinera. <span className="font-semibold">¿Cuál será tu próxima aventura?</span><span/>
                        </p>
                    </div>
                </div>
                <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-smd-24 py-smd-24">
                    {routes.map((route, index) => (
                        <div key={index} className={`rounded-xl overflow-hidden h-[445px] relative group`} style={{ marginTop: `${index * 60}px`}}>
                            <img className="object-cover w-full h-full transform transition-transform duration-300 ease-in-out group-hover:scale-110" src={route.image} alt={route.name}/>
                            <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-smd-dark to-transparent"></div>
                            <div className="absolute bottom-0 py-smd-16 px-smd-16 flex justify-between w-full">
                                <h3 className="text-lg font-bold text-smd-light w-2/3">
                                    {route.name}
                                </h3>
                                <Link href="#" className="bg-smd-soft-green transition duration-300 my-auto ease-in-out rounded-full hover:bg-smd-yellow py-smd-4 px-smd-8 text-white">
                                    Ver Ruta
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="lg:hidden py-smd-24 px-smd-24">
                    {routes.map((route, index) => (
                        <div key={index} className={`rounded-xl overflow-hidden h-[445px] relative group mb-smd-24`}>
                            <img className="object-cover w-full h-full transform transition-transform duration-300 ease-in-out group-hover:scale-110" src={route.image} alt={route.name}/>
                            <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-smd-dark to-transparent"></div>
                            <div className="absolute bottom-0 py-smd-16 px-smd-16 flex justify-between w-full">
                                <h3 className="text-lg font-bold text-smd-light w-2/3">
                                    {route.name}
                                </h3>
                                <Link href="#" className="bg-smd-soft-green transition duration-300 my-auto ease-in-out rounded-full hover:bg-smd-yellow py-smd-4 px-smd-8 text-white">
                                    Ver Ruta
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center lg:justify-end w-full mt-smd-64">
                    <Link href={route('routes.index')} className="inline-flex items-center gap-2 bg-smd-soft-green text-white font-bold px-8 py-4 rounded-full hover:bg-smd-yellow hover:text-white transition-colors duration-300">
                        Explora todas nuestras rutas
                        <ChevronRightIcon className="w-5 h-5 animate-bounce-horizontal" />
                    </Link>
                </div>
            </div>

        </section>
        </>
    )
}
