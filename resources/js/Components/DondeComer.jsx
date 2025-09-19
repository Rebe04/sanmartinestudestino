import bgShape from "../assets/shape3.png"
import carne_P from "../assets/images/food/carne_P.jpeg"
import cubas from "../assets/images/food/cubas.jpeg"
import gacho from "../assets/images/food/gacho.jpg"
import tungos from "../assets/images/food/tungos.jpeg"
import {Autoplay, EffectFade, Navigation, EffectFlip, EffectCards} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import {useState} from "react";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/outline";
import GastronomiaCard from "@/Components/GastronomiaCard.jsx";
export default function () {

    const [activeIndex, setActiveIndex] = useState(0);

    const gastronomiaSanmartinera = [
        {
            nombre: "Asadero El Caporal",
            descripcion: "El lugar por excelencia para disfrutar de la auténtica mamona (carne a la llanera), preparada en chuzos de madera y al calor de la brasa. Un ambiente familiar y campestre.",
            direccion: "Km 3 Vía a Granada, San Martín, Meta",
            imagen: carne_P,
            categoria: "Típica Llanera",
            rate: 5
        },
        {
            nombre: "Hayacas Doña Cecilia",
            descripcion: "La receta tradicional que ha pasado de generación en generación. Hayacas de puro maíz con guiso de carne y pollo, envueltas en hoja de plátano. ¡El verdadero sabor del llano!",
            direccion: "Calle 8 # 5-23, Barrio Centro, San Martín, Meta",
            imagen: cubas,
            categoria: "Típica Llanera",
            rate: 4
        },
        {
            nombre: "Parrilla del Llano Adentro",
            descripcion: "Especialistas en carnes a la parrilla. Ofrecemos jugosos churrascos, puntas de anca y la famosa hamburguesa llanera con carne oreada.",
            direccion: "Carrera 7 # 10-05, San Martín, Meta",
            imagen: gacho,
            categoria: "Parrilla",
            rate: 4
        },
        {
            nombre: "Delicias del Ariari",
            descripcion: "El punto ideal para probar los amasijos de la región. Pan de arroz fresco, tungos, y envueltos de mazorca acompañados de un delicioso masato de arroz.",
            direccion: "Plaza Principal, San Martín, Meta",
            imagen: tungos,
            categoria: "Amasijos y Postres",
            rate: 5
        },
        {
            nombre: "El Rápido del Llano",
            descripcion: "Comidas rápidas con el toque de la tierra. Prueba nuestras picadas con yuca frita, longaniza y chorizo, perfectas para compartir.",
            direccion: "Avenida de los Fundadores # 12-01, San Martín, Meta",
            imagen: carne_P,
            categoria: "Comida Rápida",
            rate: 3
        },
        {
            nombre: "Sorbete de Cucharita",
            descripcion: "Refrescantes y cremosos sorbetes artesanales de frutas locales como el arazá, copoazú y maracuyá. El postre perfecto para un día caluroso.",
            direccion: "Parque Principal, San Martín, Meta",
            imagen: cubas,
            categoria: "Amasijos y Postres",
            rate: 4
        }
    ];

    return(
        <>
            <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 " style={{ backgroundImage: `url(${bgShape})`, backgroundSize: 'cover' }}>
                <div className="bg-smd-soft-green flex flex-col text-center md:text-left justify-center w-full px-smd-40 items-start gap-smd-8 py-smd-32">
                    <hr className="border-8 rounded-full mx-auto md:mx-0 animate-bounce-horizontal my-smd-8 w-2/12 border-smd-yellow"/>
                        <p className="text-smd-light mx-auto md:mx-0 text-2xl font-semibold italic">
                        ¿Donde Comer?
                        </p>
                    <hr className="border-1 mx-auto md:mx-0 my-smd-8 w-5/6 border-smd-green"/>
                    <h3 className="text-4xl md:text-5xl lg:text-3xl xl:text-5xl 2xl:text-6xl text-white font-bold">
                        Deléitate con lo mejor de nuestra gastronomía.
                    </h3>
                </div>
                <div className="lg:col-span-2 relative sm:p-smd-40 h-auto">
                    <div className="flex flex-wrap justify-between px-smd-40 pt-smd-16 sm:p-0 text-center md:text-left items-center gap-4 mb-8">
                        <div>
                            <h3 className="text-smd-soft-green text-2xl" >
                                Sabores que Cuentan Historias
                            </h3>
                            <h2 className="text-4xl md:text-4xl lg:text-5xl font-extrabold text-white mt-1">
                                Delicias Sanmartineras
                            </h2>
                        </div>
                        {/* Contenedor para las flechas de navegación */}
                        <div className="flex mx-auto md:mx-0 items-center gap-3">
                            <button className="gastronomia-prev-arrow p-3 rounded-full bg-gray-700 hover:bg-green-600 transition-colors disabled:opacity-50">
                                <ChevronLeftIcon className="w-6 h-6 text-white" />
                            </button>
                            <button className="gastronomia-next-arrow p-3 rounded-full bg-gray-700 hover:bg-green-600 transition-colors disabled:opacity-50">
                                <ChevronRightIcon className="w-6 h-6 text-white" />
                            </button>
                        </div>
                    </div>
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        navigation={{
                            prevEl: '.gastronomia-prev-arrow',
                            nextEl: '.gastronomia-next-arrow',
                        }}
                        fadeEffect={{ crossFade: true }}
                        loop={true}
                        spaceBetween={30}
                        // Configuración responsiva
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            496: { slidesPerView: 1.3 },
                            640: { slidesPerView: 1.8 },
                            768: { slidesPerView: 1 },
                            904: { slidesPerView: 1.2 },
                            1024: { slidesPerView: 1.8 },
                            1074: { slidesPerView: 2 },
                            1280: { slidesPerView: 2.5 },
                            1474: { slidesPerView: 2.8 },
                            1536: { slidesPerView: 3 },
                            1770: { slidesPerView: 3.5 },
                        }}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        className="!py-smd-24 !hidden sm:!block" // Añade un poco de padding inferior por si las sombras se cortan
                    >
                        {gastronomiaSanmartinera.map((item, index) => (
                            <SwiperSlide key={index} className="h-auto">
                                <GastronomiaCard item={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <Swiper
                        modules={[Navigation, EffectCards]}
                        navigation={{
                            prevEl: '.gastronomia-prev-arrow',
                            nextEl: '.gastronomia-next-arrow',
                        }}
                        fadeEffect={{ crossFade: true }}
                        loop={true}
                        spaceBetween={30}
                        effect={"cards"}
                        // Configuración responsiva

                        className="!py-smd-24 !px-smd-40 !block sm:!hidden"
                    >
                        {gastronomiaSanmartinera.map((item, index) => (
                            <SwiperSlide key={index} className="h-auto">
                                <GastronomiaCard item={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                <div className="w-full flex justify-center md:justify-end mb-smd-32 mt-smd-24">
                    <a href="#" className="inline-flex items-center gap-2 bg-smd-soft-green text-white font-bold px-8 py-4 rounded-full hover:bg-smd-yellow hover:text-white transition-colors duration-300">
                        Más de nuestra gastronomía
                        <ChevronRightIcon className="w-5 h-5 animate-bounce-horizontal"/>
                    </a>
                </div>
                </div>

            </section>
        </>
    )
}
