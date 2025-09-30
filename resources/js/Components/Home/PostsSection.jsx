
import FeaturedPostCard from "@/Components/Home/FeaturedPostCard.jsx";
import SecondaryPostCard from "@/Components/Home/SecondaryPostCard.jsx";
import {Link} from "@inertiajs/react";
import {ArrowRightIcon} from "@heroicons/react/16/solid/index.js";


export default function PostsSection({ posts }) {
    // Si no hay posts, no renderizamos nada.
    if (!posts || posts.length === 0) {
        return (
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p>No hay artículos para mostrar en este momento.</p>
                </div>
            </section>
        );
    }

    // Separamos el primer post (destacado) de los otros dos.
    const [featuredPost, ...otherPosts] = posts;

    return (
        <section className="py-smd-104 bg-gray-200">
            <div className="mx-auto px-4 sm:px-6 max-w-smd-max lg:px-8">
                {/* Cabecera de la sección */}
                <div className="flex flex-wrap justify-between items-end gap-4 mb-12">
                    <div>
                        <h3 className="font-sans text-green-600 text-2xl">
                            Noticias y Actualidad
                        </h3>
                        <h2 className="text-4xl lg:text-5xl font-extrabold font-second text-gray-800 mt-1">
                            Nuestros Últimos Artículos
                        </h2>
                    </div>
                    <Link href={route('posts.index')} className="inline-flex items-center gap-2 bg-green-600 text-white font-bold px-6 py-3 rounded-full hover:bg-yellow-500 transition-colors">
                        Ver todos los Posts <ArrowRightIcon className="w-5 h-5" />
                    </Link>
                </div>

                {/* Grid de Posts */}
                <div className="grid grid-cols-1 lg:grid-cols-6 w-full gap-smd-32">
                    {/* Columna del Post Destacado */}
                    <div className="lg:col-span-2">
                        {featuredPost && <FeaturedPostCard post={featuredPost} />}
                    </div>

                    {/* Columna de los Posts Secundarios */}
                    <div className="flex flex-col lg:col-span-4 h-full gap-smd-16">
                        {otherPosts.map(post => (
                            <SecondaryPostCard key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}


