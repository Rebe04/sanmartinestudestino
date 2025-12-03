import React from 'react';
import { Link } from '@inertiajs/react';
import { CameraIcon, MusicalNoteIcon, SparklesIcon } from '@heroicons/react/24/solid';
import logoNavidad from '../../assets/images/logo-navidad.png';

export default function NavidadSection() {
    return (
        <section className="relative w-full py-16 md:py-24 overflow-hidden bg-[#008d4b]">

            {/* --- Fondo Decorativo (Patrón sutil) --- */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="h-full w-full" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="#ffffff" />
                </svg>
            </div>

            {/* --- Destellos Decorativos (Círculos difuminados) --- */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">

                {/* --- Logo de Navidad --- */}
                <div className="mb-6 transform hover:scale-105 transition-transform duration-500">
                    <img
                        src={logoNavidad}
                        alt="San Martín Vive la Navidad"
                        className="h-32 md:h-40 object-contain drop-shadow-xl"
                    />
                </div>

                {/* --- Títulos y Textos --- */}
                <h2 className="text-3xl md:text-5xl font-bold text-white font-second mb-4 tracking-tight drop-shadow-md">
                    ¡Celebremos Juntos la Magia!
                </h2>

                <p className="text-green-50 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-sans font-light">
                    Siente el espíritu navideño de nuestra tierra. Crea tu foto de perfil oficial y ambienta tus fiestas con nuestra selección musical llanera y decembrina.
                </p>

                {/* --- Botones de Acción --- */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">

                    {/* Botón 1: Ir al Marco (Interno) */}
                    <Link
                        href={route('navidad.index')}
                        className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-[#008d4b] bg-white rounded-full shadow-lg hover:bg-yellow-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <CameraIcon className="w-6 h-6 text-yellow-500 group-hover:rotate-12 transition-transform" />
                        <span>Crear mi Foto Navideña</span>
                        <span className="absolute -top-2 -right-2 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-yellow-500"></span>
                        </span>
                    </Link>

                    {/* Botón 2: Playlist (Externo) */}
                    <a
                        href="https://www.youtube.com/watch?v=OpdAmFDydYI&list=PLkfk0PPQToV8CNP_kMlc-pnux1Xsc6eDu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-white border-2 border-white/30 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white hover:text-red-600 hover:border-white shadow-lg transition-all duration-300"
                    >
                        <MusicalNoteIcon className="w-6 h-6 group-hover:animate-bounce" />
                        <span>Escuchar Playlist</span>
                    </a>
                </div>

                <div className="mt-8 text-white/60 text-sm flex items-center gap-1">
                    <SparklesIcon className="w-4 h-4 text-yellow-400" />
                    San Martín es tu Destino
                    <SparklesIcon className="w-4 h-4 text-yellow-400" />
                </div>

            </div>
        </section>
    );
}
