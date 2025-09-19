import React from 'react';
import {Link} from "@inertiajs/react";
import gallery1 from '../assets/images/banner/2.webp'
import gallery2 from '../assets/images/banner/3.webp'
import gallery3 from '../assets/images/banner/4.webp'
import gallery4 from '../assets/images/banner/1.webp'
import gallery5 from '../assets/images/banner/2.webp'
import gallery6 from '../assets/images/banner/3.webp'
import bgImage from '../assets/images/banner/1.webp'
import planeImage from '../assets/images/destination-shape-2.png'
import treeImage from '../assets/images/tree.png'
import logoWhite from '../assets/images/logoWhite.png'
import {EnvelopeIcon, MapPinIcon, PhoneIcon} from "@heroicons/react/16/solid/index.js";



// --- Sub-componentes para un código más limpio ---

const ContactInfoItem = ({ icon, title, lines }) => (
    <div className="flex items-center gap-6">
        <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full bg-white/10 group-hover:bg-green-500 transition-colors duration-300">
            {icon}
        </div>
        <div>
            <h4 className="text-white text-xl font-bold">{title}</h4>
            <div className="text-white/80">
                {lines.map((line, index) => <p key={index} className="mb-0">{line}</p>)}
            </div>
        </div>
    </div>
);

const FooterLink = ({ href, children }) => (
    <li>
        <Link href={href} className="text-white/80 hover:text-green-500 hover:pl-2 transition-all duration-300">
            {children}
        </Link>
    </li>
);

const SocialLink = ({ href, iconClass }) => (
    <a target="_blank" href={href} className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-green-500 hover:border-green-500 transition-colors">
        {iconClass}
    </a>
);

// --- Componente Principal del Footer ---
export default function Footer() {
    const currentYear = new Date().getFullYear();

    const galleryImages = [
        gallery1,
        gallery2,
        gallery3,
        gallery4,
        gallery5,
        gallery6,
    ];

    return (
        <footer className="relative bg-cover bg-center bg-no-repeat text-white" style={{ backgroundImage: `url(${bgImage})` }}>
            {/* Capa oscura superpuesta */}
            <div className="absolute inset-0 bg-gray-900/95"></div>

            {/* Imágenes decorativas */}
            <img className="absolute top-1/2 left-[1%] -translate-y-1/2 opacity-20 hidden lg:block" src={planeImage} alt="" />
            <img className="absolute top-1/2 right-[1%] -translate-y-1/2 opacity-20 hidden lg:block" src={treeImage} alt="" />

            <div className="relative z-10 px-smd-24 md:px-0">
                {/* Sección Superior de Contacto */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                    <div className="flex flex-wrap md:items-center md:justify-center lg:justify-between gap-8">
                        <ContactInfoItem
                            icon={<MapPinIcon className="w-8 h-8"/>}
                            title="Ubicación"
                            lines={['San Martín de los Llanos,', 'Meta, Colombia']}
                        />
                        <div className="vr-line h-20 w-px bg-white/20 hidden md:block"></div>
                        <ContactInfoItem
                            icon={<PhoneIcon className="w-8 h-8"/>}
                            title="Teléfono"
                            lines={['(+57) 300 123 4567']}
                        />
                        <div className="vr-line h-20 w-px bg-white/20 hidden lg:block"></div>
                        <ContactInfoItem
                            icon={<EnvelopeIcon className="w-8 h-8"/>}
                            title="Escríbenos"
                            lines={['info@sanmartindestino.com']}
                        />
                    </div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="border-t border-white/20"></div></div>

                {/* Sección Principal del Footer */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {/* Columna del Logo y Descripción */}
                        <div className="lg:col-span-1">
                            <Link href="/"><img src={logoWhite} alt="Logo San Martín es tu Destino" className="h-24 mb-6" /></Link>
                            <p className="text-white/80 pr-4">
                                Somos la vitrina digital de la riqueza turística, cultural e histórica de San Martín de los Llanos, Meta.
                            </p>
                            <div className="flex items-center gap-2 mt-6">
                                <SocialLink href="https://www.facebook.com/alcaldiasanmartindelosllanos" iconClass={<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-facebook" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" /></svg>} />
                                <SocialLink href="https://x.com/SanMartin_Meta" iconClass={<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-x" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>} />
                                <SocialLink href="https://www.instagram.com/alcaldiasanmartindelosllanos/" iconClass={<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-instagram" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M16.5 7.5l0 .01" /></svg>} />
                                <SocialLink href="https://www.youtube.com/@AlcaldiadeSanMartindeLosLlanos" iconClass={<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-youtube" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z" />
                                    <path d="M10 9l5 3l-5 3z" />
                                </svg>} />
                            </div>
                        </div>

                        {/* Columna de Enlaces Rápidos */}
                        <div>
                            <h5 className="text-xl font-bold text-white mb-6 relative after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-12 after:h-0.5 after:bg-green-500">
                                Enlaces Rápidos
                            </h5>
                            <ul className="space-y-3">
                                <FooterLink href="/">Inicio</FooterLink>
                                <FooterLink href="#">Nuestra Historia</FooterLink>
                                <FooterLink href="#">Las Cuadrillas</FooterLink>
                                <FooterLink href="#">Eventos</FooterLink>
                                <FooterLink href="#">Contacto</FooterLink>
                            </ul>
                        </div>

                        {/* Columna de Explora */}
                        <div>
                            <h5 className="text-xl font-bold text-white mb-6 relative after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-12 after:h-0.5 after:bg-green-500">
                                Explora
                            </h5>
                            <ul className="space-y-3">
                                <FooterLink href="#">Lugares Turísticos</FooterLink>
                                <FooterLink href="#">Rutas y Senderos</FooterLink>
                                <FooterLink href="#">Monumentos</FooterLink>
                                <FooterLink href="#">Dónde Dormir</FooterLink>
                                <FooterLink href="#">Dónde Comer</FooterLink>
                            </ul>
                        </div>

                        {/* Columna de Galería */}
                        <div>
                            <h5 className="text-xl font-bold text-white mb-6 relative after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-12 after:h-0.5 after:bg-green-500">
                                Galería
                            </h5>
                            <div className="grid grid-cols-3 gap-3">
                                {galleryImages.map((img, index) => (
                                    <Link key={index} href="#" className="block rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                                        <img src={img} alt={`Galería ${index + 1}`} className="w-full h-full object-cover" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="border-t border-white/20"></div></div>

                {/* Copyright */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
                        <p className="text-white/70">
                            &copy; {currentYear} San Martín Es Tu Destino. Todos los derechos reservados.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link href="#" className="text-white/70 hover:text-white text-sm">Política de Privacidad</Link>
                            <Link href="#" className="text-white/70 hover:text-white text-sm">Términos de Servicio</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

