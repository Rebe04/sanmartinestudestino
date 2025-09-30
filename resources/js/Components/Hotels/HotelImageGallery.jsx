import React, {useRef, useState} from 'react';
// Importa los componentes y módulos necesarios de Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper/modules';
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/outline";

export default function HotelImageGallery({ images }) {
    // Estado para mantener la instancia del slider de miniaturas
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const swiperRef = useRef(null);

    if (!images || images.length === 0) {
        return (
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-xl">
                <span className="text-gray-500">No hay imágenes disponibles</span>
            </div>
        );
    }

    return (
        <div className="relative">
            {/* Slider Principal */}
            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                className="md:rounded-2xl shadow-lg"
            >
                {images.map(image => (
                    <SwiperSlide key={`main-${image.id}`}>
                        <img src={image.url} className="w-full h-smd-592 object-cover" alt="Imagen de hotel"/>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* --- BOTONES DE NAVEGACIÓN PERSONALIZADOS --- */}
            {/* Botón Izquierdo (Anterior) */}
            <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-white/70 hover:bg-white rounded-full p-2 transition-colors duration-300"
            >
                {/* Aquí puedes cambiar el color usando text-green-600, text-gray-800, etc. */}
                <ChevronLeftIcon className="h-6 w-6 text-smd-dark" />
            </button>

            {/* Botón Derecho (Siguiente) */}
            <button
                onClick={() => swiperRef.current?.slideNext()}
                className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-white/70 hover:bg-white rounded-full p-2 transition-colors duration-300"
            >
                {/* Cambia el color aquí también si lo deseas */}
                <ChevronRightIcon className="h-6 w-6 text-smd-dark" />
            </button>

            {/* Slider de Miniaturas (Thumbnails) */}
            <Swiper
                // Guarda la instancia de este slider en el estado
                onSwiper={setThumbsSwiper}
                modules={[FreeMode, Navigation, Thumbs]}
                spaceBetween={10}
                slidesPerView={4} // Muestra 4 miniaturas a la vez
                freeMode={true}
                watchSlidesProgress={true}
                className="mt-4"
            >
                {images.map(image => (
                    <SwiperSlide key={`thumb-${image.id}`} className="cursor-pointer rounded-xl overflow-hidden opacity-50 swiper-slide-thumb">
                        <img src={image.url} className="w-full h-24 object-cover" alt="Miniatura de hotel"/>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* CSS para el estilo de la miniatura activa */}
            <style>{`
                .swiper-slide-thumb.swiper-slide-thumb-active {
                    opacity: 1;
                    border: 3px solid #16a34a;
                }
            `}</style>
        </div>
    );
}
