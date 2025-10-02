import {Link} from "@inertiajs/react";
import {ArrowRightIcon} from "@heroicons/react/16/solid/index.js";
import {CalendarIcon, UserIcon} from "@heroicons/react/24/outline/index.js";

export default function PostCard({ post }) {
    const { name, created_at_formatted, image, user } = post;
    return (
        <div className="h-full">
            <div className="overflow-hidden rounded-2xl h-smd-280 md:h-smd-352 2xl:h-smd-496 ">
                <img src={image.url} alt={name}
                     className="w-full object-cover"/>
            </div>
            <div className="py-smd-16 2xl:py-smd-32">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                    <span className="flex"><UserIcon className="h-smd-16 w-smd-16 mr-smd-8"/> Por {user.name}</span>
                    <span className="flex"> <CalendarIcon className="h-smd-16 w-smd-16 mr-smd-8"/>{post.created_at_formatted}</span>
                </div>
                <h3 className="text-4xl font-bold font-second text-smd-dark mb-smd-16">
                    <Link href={route('posts.show', post)} className="hover:text-smd-soft-green transition-colors">
                        {name}
                    </Link>
                </h3>
                <article className="text-smd-gray-text">
                    {post.extract}
                </article>
                <Link href={route('posts.show', post)}
                      className="inline-flex items-center gap-2 px-smd-16 py-smd-8 2xl:px-smd-32 2xl:py-smd-16 font-bold text-smd-light rounded-full mt-smd-16 2xl:mt-smd-32 bg-smd-soft-green hover:bg-smd-yellow transition-colors">
                    Ver Detalles <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1"/>
                </Link>
            </div>
        </div>
    )
}
