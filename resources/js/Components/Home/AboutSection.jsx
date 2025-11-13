import { useState } from 'react';
import {PlayIcon, XMarkIcon, ChevronRightIcon, GlobeAmericasIcon, MapIcon} from '@heroicons/react/24/outline';

import imageTopLeft from '../../assets/images/banner/1.webp';
import imageCenter from '../../assets/images/banner/2.webp';
import imageBottomLeft from '../../assets/images/banner/3.webp';
import shapeImage from '../../assets/images/shape.png';

const AboutCard = ({ icon, title, text }) => (
    <div className="flex items-center gap-4 group cursor-pointer">
        <div className="relative w-20 h-20 flex-shrink-0">
            {/* El círculo blanco que contiene el ícono */}
            <div className="w-full h-full flex items-center text-gray-800 justify-center rounded-full bg-white shadow-md z-10 relative">
                {icon}
            </div>
            <div className="absolute inset-0 w-full h-full -left-1 -top-1 rounded-full bg-smd-green transform z-0 transition-transform duration-700 ease-out group-hover:-translate-x-1 group-hover:-top-2"></div>
        </div>
        <div>
            <h4 className="text-xl font-bold text-gray-800">{title}</h4>
            <p className="text-gray-600 mt-1">{text}</p>
        </div>
    </div>
);


// --- Componente del Popup de Video ---
const VideoPopup = ({ videoId, onClose }) => (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm animate-fade-in" onClick={onClose}>
        <div className="relative w-1/2 max-w-3xl aspect-video bg-black rounded-lg shadow-xl" onClick={e => e.stopPropagation()}>
            <button onClick={onClose} className="absolute -top-4 -right-4 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full text-black hover:bg-gray-200">
                <XMarkIcon className="w-6 h-6" />
            </button>
            <iframe
                className="w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title="Video de YouTube"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    </div>
);

// --- Componente Principal "AboutSection" ---
export default function AboutSection() {
    const [videoOpen, setVideoOpen] = useState(false);
    const videoId = 'vV16MkQ-2jk';

    return (
        <>
            {videoOpen && <VideoPopup videoId={videoId} onClose={() => setVideoOpen(false)} />}

            <section className="py-36 bg-white overflow-hidden">
                <div className="container mx-auto px-1 md:px-4 w-full max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 w-full gap-x-2 items-center">

                        <div className="relative h-[500px]">
                            <img src={shapeImage} alt="Decorative shape" className="absolute bottom-0 left-0 w-28 h-auto z-10" />

                            {/* Imagen pequeña inferior (capa superior) */}
                            <div className="absolute bottom-10 md:bottom-0 left-4 lg:left-smd-200 right-4 mx-auto w-[40%] sm:w-[30%] md:w-[25%] lg:w-[50%] xl:w-[28%] h-[100px] sm:h-[120px] md:h-[120px] z-20 rounded-2xl overflow-hidden shadow-2xl">
                                <img src={imageBottomLeft} alt="Paisajes del llano" className="w-full h-full object-cover"/>
                            </div>

                            {/* Imagen principal (central con video) */}
                            <div className="absolute top-24 md:top-20 right-3 sm:right-28 md:right-36 lg:right-4 w-[60%] sm:w-[30%] md:w-[35%] lg:w-[50%] xl:w-[37%] h-[295px] md:h-[350px] z-10 rounded-2xl overflow-hidden shadow-2xl">
                                <img src={imageCenter} alt="Cultura de San Martín" className="w-full h-full object-cover"/>
                                <button onClick={() => setVideoOpen(true)} className="absolute inset-0 flex items-center justify-center group bg-black/20 opacity-70 hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-600 group-hover:scale-110 transition-transform duration-300">
                                        <PlayIcon className="w-10 h-10 text-white"/>
                                    </div>
                                </button>
                            </div>

                            {/* Imagen pequeña superior (capa inferior) */}
                            <div className="absolute top-5 h-[400px] md:h-[360px] left-2 sm:left-28 md:left-36 lg:left-smd-104 xl:left-smd-232 w-2/3 sm:w-[45%] lg:w-[55%] xl:w-[47%] z-0 rounded-2xl overflow-hidden shadow-2xl">
                                <img src={imageTopLeft} alt="Folclor llanero" className="w-full h-full object-cover"/>
                            </div>
                        </div>

                        {/* Columna de Contenido */}
                        <div className="pt-16 px-4 md:pt-0 lg:pl-12">
                            <div className="mb-8" >
                                <span className="text-green-600 text-2xl" style={{ fontFamily: 'Poppins, cursive' }}>
                                    Nuestra Esencia
                                </span>
                                <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800 mt-2 mb-4" style={{ fontFamily: 'Manrope, cursive' }}>
                                    San Martín, un Destino que te Abraza
                                </h2>
                            </div>

                            <div className="flex flex-col gap-8 mb-10" style={{ fontFamily: 'Poppins, cursive' }}>
                                <AboutCard
                                    icon={<GlobeAmericasIcon className="w-12 h-12" />}
                                    title="Un Territorio por Descubrir"
                                    text="Somos la vitrina de la riqueza natural, cultural e histórica de San Martín de los Llanos."
                                />
                                <AboutCard
                                    icon={<MapIcon className="w-12 h-12" />}
                                    title="Guiado por Nuestra Gente"
                                    text="Conectamos a los viajeros con las auténticas experiencias que solo los anfitriones locales pueden ofrecer."
                                />
                            </div>

                            <a href="/nuestra-historia" className="inline-flex items-center gap-2 bg-smd-soft-green text-white font-bold px-8 py-4 rounded-full hover:bg-smd-yellow hover:text-white transition-colors duration-300">
                                Conoce más de nuestra historia
                                <ChevronRightIcon className="w-5 h-5 animate-bounce-horizontal"/>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

