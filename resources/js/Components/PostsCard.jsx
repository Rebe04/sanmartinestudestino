import {Link} from "@inertiajs/react";
import {ArrowRightIcon} from "@heroicons/react/16/solid/index.js";

export default function PostCard({ post }) {
    const { name, created_at_formatted, image, user } = post;
    return (
        <div className="group rounded-2xl overflow-hidden h-full cursor-pointer bg-gray-200/80 transition-all duration-300 hover:shadow-2xl">
            <div className="overflow-hidden">
                <img src={image.url} alt={name}
                     className="w-full object-cover transition-transform duration-500 group-hover:scale-110"/>
            </div>
            <div className="p-smd-16">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                    <span>Por {user.name}</span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                    <span>{post.created_at_formatted}</span>
                </div>
                <h3 className="text-2xl font-bold font-second text-smd-dark mb-smd-16">
                    <Link href={route('posts.show', post)} className="hover:text-smd-soft-green transition-colors">
                        {name}
                    </Link>
                </h3>
                <Link href={route('posts.show', post)}
                      className="inline-flex items-center gap-2 font-bold text-smd-soft-green hover:text-smd-yellow transition-colors">
                    Ver Detalles <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1"/>
                </Link>
            </div>
        </div>
    )
}
