import MainLayout from "@/Layouts/MainLayout.jsx";
import blogImage from "@/assets/images/banner/1.webp";
import {ChevronRightIcon} from "@heroicons/react/24/outline/index.js";
import React from "react";
import {Head, Link, usePage} from "@inertiajs/react";

const IconGastronomy = () => (
    <svg className="h-smd-24 w-smd-24 text-smd-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 15.5a2.5 2.5 0 01-2.5 2.5h-11a2.5 2.5 0 01-2.5-2.5v-6a2.5 2.5 0 012.5-2.5h11a2.5 2.5 0 012.5 2.5v6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 7V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.5V7" />
    </svg>
);

const IconCulture = () => (
    <svg className="h-smd-24 w-smd-24 text-smd-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
    </svg>
);

const IconHistory = () => (
    <svg className="h-smd-24 w-smd-24 text-smd-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);
export default function AboutUs() {

    const { url, props } = usePage();

    // Define la URL base de tu sitio.
    // Es MEJOR si pasas esto desde Laravel (ej. en HandleInertiaRequests.php)
    // como 'appUrl' en las props compartidas.
    const baseUrl = props.appUrl || 'https://www.sanmartindestino.com';

    // URL canónica (la URL completa y preferida de la página)
    const canonicalUrl = new URL(url, baseUrl).href;

    // Imagen para redes sociales (debería ser una URL absoluta)
    // Es buena práctica tener una imagen dedicada en tu carpeta /public
    const socialImageUrl = new URL('/default-social-image.png', baseUrl).href;

    const metaDescription = "Descubre por qué 'San Martín es tu Destino'. Conoce la historia, la cultura, la gastronomía y el folclor de San Martín de los Llanos, cuna de las Cuadrillas y referente del Meta.";
    const metaKeywords = "San Martín de los Llanos, Turismo Meta, Cuadrillas de San Martín, Folclor Llanero, Gastronomía Llanera, San Martín es tu Destino, Acerca de"

    return (
        <>
            <Head>
                <title>Acerca de San Martín es tu Destino</title>
                <meta name="description" content={metaDescription} />
                <meta name="keywords" content={metaKeywords} />

                {/* --- SEO Avanzado y Redes Sociales --- */}

                {/* URL Canónica: Le dice a Google cuál es la URL "oficial" de esta página */}
                <link rel="canonical" href={canonicalUrl} />

                {/* Open Graph (para Facebook, LinkedIn, WhatsApp, etc.) */}
                <meta property="og:title" content="Acerca de San Martín es tu Destino" />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:image" content={socialImageUrl} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content="San Martín es tu Destino" />

                {/* Twitter Card (para Twitter) */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Acerca de San Martín es tu Destino" />
                <meta name="twitter:description" content={metaDescription} />
                <meta name="twitter:image" content={socialImageUrl} />
            </Head>
            <div className="min-h-screen w-full">
                <div className={`flex flex-col relative items-center justify-center pt-smd-104 w-full h-smd-496`} style={{ backgroundImage: `url(${blogImage})`, backgroundSize: 'cover'}}>
                    <div className="absolute top-0 w-full h-smd-496 bg-smd-dark opacity-75"></div>
                    <h1 className="text-smd-light text-3xl text-center md:text-5xl 2xl:text-7xl font-bold font-second z-10">Nuestra Historia</h1>
                    <div className="border border-gray-300 flex items-center gap-smd-8 justify-center bg-gray-500/15 mt-smd-16 backdrop-blur-sm text-smd-light md:py-smd-4 px-smd-16 2xl:py-smd-8 rounded-full z-10">
                        <p>Home</p> <ChevronRightIcon className={`h-smd-16 w-smd-16 `}/> <p>Nuestra Historia</p>
                    </div>
                </div>
                <div className="bg-white font-second text-smd-gray-text antialiased">
                    <main className="max-w-smd-max-lg mx-auto py-smd-48 px-smd-24">

                        {/* --- Cabecera de la Página --- */}
                        <header className="text-center mb-smd-48">
                            <h1 className="font-sans font-bold text-smd-48 text-smd-dark leading-tight">
                                San Martín es tu Destino
                            </h1>
                            <p className="text-smd-20 text-smd-gray-text mt-smd-8 font-second">
                                Cuna del Folclor Llanero
                            </p>
                        </header>

                        {/* --- Sección 1: Sobre Nuestra Tierra --- */}
                        <section>
                            <h2 className="font-sans font-semibold text-smd-36 text-smd-dark mb-smd-16 border-b-2 border-smd-yellow pb-smd-8">
                                Nuestra Tierra: Cuna del Folclor
                            </h2>
                            <div className="space-y-smd-16 font-second text-smd-18 leading-relaxed">
                                <p>
                                    San Martín de los Llanos, fundado en 1555, es reconocido como la cuna del folclor llanero y uno de los municipios más representativos del departamento del Meta. Su historia está profundamente ligada a las tradiciones del llano, a la fuerza de su gente y al legado cultural que ha trascendido generaciones.
                                </p>
                                <p>
                                    A lo largo de los años, San Martín ha consolidado un posicionamiento turístico destacado, gracias a la riqueza de sus atractivos gastronómicos, culturales e históricos. Este municipio se distingue por su variada y deliciosa gastronomía, su profundo amor a la música, la danza y las tradiciones.
                                </p>
                                <p>
                                    Entre sus expresiones más emblemáticas se encuentran las legendarias <strong className="font-semibold text-smd-green">Cuadrillas de San Martín</strong>, una manifestación cultural única declarada Patrimonio Cultural e Inmaterial de la Nación, que simboliza el espíritu, la historia y el arte del llano.
                                </p>
                            </div>
                        </section>

                        {/* --- Mini-Sección de Atractivos --- */}
                        <section className="grid grid-cols-1 md:grid-cols-3 gap-smd-24 my-smd-48">
                            <div className="bg-smd-light p-smd-24 rounded-lg text-center flex flex-col items-center">
                                <IconGastronomy />
                                <h3 className="font-sans font-semibold text-smd-20 text-smd-dark mt-smd-8">Gastronomía</h3>
                                <p className="text-smd-16 mt-smd-4">Cada plato refleja el sabor y la identidad de la región.</p>
                            </div>
                            <div className="bg-smd-light p-smd-24 rounded-lg text-center flex flex-col items-center">
                                <IconCulture />
                                <h3 className="font-sans font-semibold text-smd-20 text-smd-dark mt-smd-8">Cultura</h3>
                                <p className="text-smd-16 mt-smd-4">Tierra de grandes artistas, música, danza y folclor.</p>
                            </div>
                            <div className="bg-smd-light p-smd-24 rounded-lg text-center flex flex-col items-center">
                                <IconHistory />
                                <h3 className="font-sans font-semibold text-smd-20 text-smd-dark mt-smd-8">Tradición</h3>
                                <p className="text-smd-16 mt-smd-4">Hogar de las legendarias Cuadrillas de San Martín.</p>
                            </div>
                        </section>

                        {/* --- Sección 2: Sobre Este Proyecto --- */}
                        <section className="bg-smd-light p-smd-32 rounded-lg">
                            <h2 className="font-sans font-semibold text-smd-36 text-smd-dark mb-smd-16">
                                Nuestro Proyecto: La Plataforma Digital
                            </h2>
                            <div className="space-y-smd-16 font-second text-smd-18 leading-relaxed">
                                <p>
                                    Con el propósito de fortalecer su proyección turística, el Gobierno Municipal impulsa la marca <strong className="font-semibold text-smd-green">‘San Martín es tu destino’</strong>. Esta iniciativa busca visibilizar y promover todos los atractivos del municipio, tanto para visitantes como para los propios sanmartineros.
                                </p>
                                <p>
                                    Bajo esta estrategia se consolida esta plataforma digital, una página web diseñada para reunir toda la información de interés turístico en un solo lugar. A través de las siguientes herramientas, los usuarios pueden descubrir qué visitar, qué comer y qué experiencias vivir en San Martín:
                                </p>
                                <ul className="list-disc list-outside pl-smd-24 space-y-smd-8">
                                    <li>Blogs y reseñas detalladas.</li>
                                    <li>Categorías de atractivos (Culturales, Gastronómicos, Históricos).</li>
                                    <li>Información de contacto y direcciones.</li>
                                    <li>Recomendaciones para planificar tu recorrido.</li>
                                </ul>
                                <p>
                                    <strong className="font-semibold text-smd-green">‘San Martín es tu destino’</strong> no solo promueve el turismo, sino que refuerza la identidad cultural y el sentido de pertenencia, mostrando al mundo la esencia de este territorio mágico: una tierra de historia, sabor, arte y tradición llanera.
                                </p>
                            </div>
                        </section>

                        {/* --- Llamado a la Acción (CTA) --- */}
                        <section className="text-center mt-smd-48">
                            <Link
                                href="/" // Asumiendo que '/' es la página de inicio
                                className="inline-block bg-smd-green text-white font-sans font-bold text-smd-18 px-smd-40 py-smd-16 rounded-lg shadow-lg transition-transform duration-300 hover:bg-smd-dark hover:-translate-y-1"
                            >
                                Comienza a Explorar
                            </Link>
                        </section>

                    </main>
                </div>
            </div>
        </>
    )
}

AboutUs.layout = page => <MainLayout children={page} title="¿Quienes Somos?" />;
