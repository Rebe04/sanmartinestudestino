import MainLayout from "@/Layouts/MainLayout.jsx";
import blogImage from "@/assets/images/banner/1.webp";
import wallpaper from "@/assets/images/wallpaper-01.png";
import {CalendarIcon, ChevronRightIcon, UserIcon} from "@heroicons/react/24/outline";
import {Link} from "@inertiajs/react";

export default function Index({post, related, post_category}) {
    const data = post.data;
    const relatedPosts = related.data;
    const categories = post_category.data;
    return(
        <MainLayout>
            <div className="min-h-screen w-full">
                <div className={`flex flex-col relative items-center justify-center pt-smd-104 w-full h-smd-496`} style={{ backgroundImage: `url(${blogImage})`, backgroundSize: 'cover'}}>
                    <div className="absolute w-full top-0 h-smd-496 bg-smd-dark opacity-75"></div>
                    <h1 className="text-smd-light text-7xl font-second z-10">{data.name}</h1>
                    <div className="border border-gray-300 flex items-center gap-smd-8 justify-center bg-gray-500/15 mt-smd-16 text-smd-light px-smd-16 py-smd-8 rounded-full z-10">
                        <p>Home</p> <ChevronRightIcon className={`h-smd-16 w-smd-16 `}/> <p>Posts</p>
                    </div>
                </div>
                <div className="w-full">
                    <div className="mx-auto my-smd-40 w-full flex items-center overflow-hidden max-w-smd-max rounded-xl h-smd-592">
                        <img className="w-full object-cover" src={data.image.url} alt={data.name}/>
                    </div>

                    <div className="grid mx-auto max-w-smd-max grid-cols-3 mb-smd-104 gap-smd-16">
                        <div className="w-full col-span-2">
                            <div className="flex justify-start mb-smd-40 gap-smd-32">
                                <p className="text-smd-gray-text flex items-center gap-smd-4">
                                    <span>
                                        <UserIcon className="h-smd-16 w-smd-16"/>
                                    </span>
                                    {data.user.name}
                                </p>
                                <p className="text-smd-gray-text flex items-center gap-smd-4">
                                    <span>
                                        <CalendarIcon className="h-smd-16 w-smd-16"/>
                                    </span>
                                    {data.created_at_formatted}
                                </p>
                            </div>
                            <h1 className="text-smd-dark text-5xl font-second font-bold mb-smd-40">
                                {data.name}
                            </h1>
                            <div className="mb-smd-40">
                                <p className="text-smd-gray-text">
                                    {data.content}
                                </p>
                            </div>
                        </div>
                        <aside>
                            <div className="bg-gray-200/80 rounded-xl p-smd-16">
                                <h2 className="text-2xl font-second font-bold text-smd-dark mb-smd-16">Categorías de Posts</h2>
                                <ul>
                                    {categories.map((postCategory, index) => (
                                        <li className="bg-smd-light p-smd-16 mt-smd-8 rounded-lg" key={index}>
                                            <Link href={route('post_categories.show', postCategory)}>
                                                {postCategory.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-gray-200/80 rounded-xl mt-smd-32 p-smd-16">
                                <h2 className="text-2xl font-second font-bold text-smd-dark">Posts Relacionados</h2>
                                <ul>
                                    {relatedPosts.map((post, index) => (
                                        <li className="p-smd-16 mt-smd-8 rounded-lg" key={index}>
                                            <Link className="flex group items-center" href={route('posts.show', post)}>
                                                <div className="w-smd-184 h-smd-96 rounded-xl mr-smd-16 overflow-hidden">
                                                    <img className="w-full h-full object-cover" src={post.image.url} alt={post.name}/>
                                                </div>
                                                <div>
                                                    <h3 className="text-smd-dark text-xl font-second font-bold group-hover:text-smd-soft-green">
                                                        {post.name}
                                                    </h3>
                                                    <p className="text-smd-soft-green group-hover:text-smd-yellow">
                                                        {post.created_at_formatted}
                                                    </p>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </aside>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
