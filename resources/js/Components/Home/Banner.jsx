import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

// Iconos
import {ArrowLongLeftIcon, ArrowLongRightIcon, ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/24/outline';

import slide1 from '../../assets/images/banner/1.webp';
import slide2 from '../../assets/images/banner/2.webp';
import slide3 from '../../assets/images/banner/3.webp';
import slide4 from '../../assets/images/banner/4.webp';
import cloudImg from '../../assets/images/cloud.png';
import DropdownSm from "@/Components/Utils/DropdownSm.jsx";
import SocialIcon from "@/Components/Utils/SocialIcon.jsx";

const slidesData = [

    { image: slide1, pretitle: 'Vive la Tradición Llanera', title: 'San Martín es Tu Destino', subtitle: 'Quien llega a San Martín, siempre encuentra razones para volver.' },

    { image: slide2, pretitle: 'Naturaleza Pura', title: 'Explora Paisajes Inolvidables', subtitle: 'Descubre cascadas, ríos cristalinos y la inmensidad de la sabana.' },

    { image: slide3, pretitle: 'Cultura que Enamora', title: 'El Alma de Nuestra Tierra', subtitle: 'Sumérgete en la música, la gastronomía y la calidez de nuestra gente.' },

    { image: slide4, pretitle: 'Aventura sin Límites', title: 'Un Destino por Descubrir', subtitle: 'Senderismo, cabalgatas y experiencias que te conectarán con el llano.' }

];

export default function Banner() {
    const [activeIndex, setActiveIndex] = useState(0);



    return (
        <section className="relative h-screen w-full flex items-center overflow-hidden bg-gray-900">
            <Swiper
                modules={[Autoplay, Navigation, EffectFade]}
                effect={'fade'}
                fadeEffect={{ crossFade: true }}
                loop={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                navigation={{ prevEl: '.banner-prev-arrow', nextEl: '.banner-next-arrow' }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="absolute inset-0 w-full h-full"
            >
                {slidesData.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="absolute inset-0 bg-cover right-0 top-0 left-200 bg-center" style={{ backgroundImage: `url(${slide.image})` }}></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 z-20 to-transparent"></div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div
                className="absolute bottom-[-100px] left-0 right-0 w-full h-[300px] bg-bottom bg-no-repeat z-10 pointer-events-none"
                style={{ backgroundImage: `url(${cloudImg})`, backgroundSize: 'cover' }}
            ></div>

            <div className="hidden sm:flex flex-col items-center gap-2 absolute left-16 top-1/2 -translate-y-1/2 z-30">
                <div className="w-[0.5px] h-32 mb-2 bg-green-700"></div>
                <SocialIcon className={`w-9 h-9 flex items-center justify-center rounded-full bg-yellow-600/20 text-white hover:bg-green-500 transition-colors`} href="https://www.facebook.com/alcaldiasanmartindelosllanos">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-facebook" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" /></svg>
                </SocialIcon>
                <SocialIcon className={`w-9 h-9 flex items-center justify-center rounded-full bg-yellow-600/20 text-white hover:bg-green-500 transition-colors`} href="https://x.com/SanMartin_Meta">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-x" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
                </SocialIcon>
                <SocialIcon className={`w-9 h-9 flex items-center justify-center rounded-full bg-yellow-600/20 text-white hover:bg-green-500 transition-colors`} href="https://www.instagram.com/alcaldiasanmartindelosllanos/">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-instagram" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M16.5 7.5l0 .01" /></svg>
                </SocialIcon>
                <SocialIcon className={`w-9 h-9 flex items-center justify-center rounded-full bg-yellow-600/20 text-white hover:bg-green-500 transition-colors`} href="https://www.youtube.com/@AlcaldiadeSanMartindeLosLlanos">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-youtube" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z" />
                        <path d="M10 9l5 3l-5 3z" />
                    </svg>
                </SocialIcon>
                <div className="w-[0.5px] h-32 mt-2 bg-green-700"></div>
            </div>

            <div className="absolute px-8 z-20 w-full max-w-7xl mx-auto lg:px-12">
                <div className="w-full md:pr-16 pl-0 sm:pl-24 md:pl-36 lg:pl-36  2xl:pr-0 2xl:pl-64 pt-12 text-left transition-all duration-300">
                    <h3 className="text-yellow-600 font-semibold text-2xl mb-2" style={{ fontFamily: 'Poppins' }}>
                        {/*{slidesData[activeIndex].pretitle}*/}
                        Vive la Tradición Llanera
                    </h3>
                    <div className="w-10/12">
                        <h2 className="text-4xl md:text-[56px] 2xl:text-[80px] font-black mb-2 leading-tight text-white transition-all duration-300" style={{ fontFamily: 'Manrope' }}>
                            {/*{slidesData[activeIndex].title}*/}
                            San Martín es Tu Destino
                        </h2>
                    </div>
                    <p className="text-white text-xl">
                        {/*{slidesData[activeIndex].subtitle}*/}
                        Quien llega a San Martín, siempre encuentra razones para volver.
                    </p>
                </div>
            </div>

            <div className="hidden sm:flex flex-col gap-3 absolute right-8 top-1/2 -translate-y-1/2 z-20">
                <button className="banner-prev-arrow p-3 bg-gray-200/50 rounded-full hover:bg-yellow-500/80 transition-colors">
                    <ArrowLongLeftIcon className="w-6 h-6 text-white" />
                </button>
                <button className="banner-next-arrow p-3 bg-gray-200/50 rounded-full hover:bg-yellow-500/80 transition-colors">
                    <ArrowLongRightIcon className="w-6 h-6 text-white" />
                </button>
            </div>
        </section>
    );
}

