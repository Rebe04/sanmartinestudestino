import {Link} from "@inertiajs/react";
import {ArrowRightIcon} from "@heroicons/react/16/solid/index.js";

export default function  SecondaryPostCard ({ post }) {
    return (
        <div
            className="group bg-white max-h-smd-208 overflow-hidden cursor-pointer rounded-2xl flex flex-1 items-center gap-x-4 transition-all duration-300 hover:shadow-2xl">
            <div className="w-3/5 h-full rounded-l-xl overflow-hidden">
                <img src={post.image_url} alt={post.name}
                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
            </div>
            <div className="w-2/3">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                    <span>{post.category.name}</span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span>{post.created_at_formatted}</span>
                </div>
                <h4 className="lg:text-2xl font-bold font-second text-smd-dark leading-tight">
                    <Link href={route('posts.show', post)} className="hover:text-smd-soft-green block lg:hidden transition-colors">
                        {post.name.length <= 20 ? (post.name):(post.name.substring(0, 20)+"...")}
                    </Link>
                    <Link href={route('posts.show', post)} className="hover:text-smd-soft-green transition-colors hidden lg:block">
                        {post.name.length <= 50 ? (post.name):(post.name.substring(0, 50)+"...")}
                    </Link>
                </h4>
                <Link href={route('posts.show', post)}
                      className="text-sm inline-flex items-center gap-1 mt-2 font-bold text-smd-soft-green hover:text-smd-yellow transition-colors">
                    Ver Detalles <ArrowRightIcon className="w-3 h-3 transition-transform group-hover:translate-x-1"/>
                </Link>
            </div>
        </div>
    )
}
