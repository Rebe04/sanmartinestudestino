import MainLayout from "@/Layouts/MainLayout.jsx";
import blogImage from "@/assets/images/banner/1.webp";
import wallpaper from "@/assets/images/wallpaper-01.png";
import {CalendarIcon, ChevronRightIcon, UserIcon} from "@heroicons/react/24/outline";
import {Link} from "@inertiajs/react";
import SideBar from "@/Components/SideBar.jsx";

export default function Index({post, related, post_category}) {
    const data = post.data;
    const relatedPosts = related.data;
    const categories = post_category.data;
    return(
        <MainLayout>
            <div className="min-h-screen w-full">
                <div className={`flex flex-col relative items-center justify-center pt-smd-104 w-full h-smd-496`} style={{ backgroundImage: `url(${blogImage})`, backgroundSize: 'cover'}}>
                    <div className="absolute w-full top-0 h-smd-496 bg-smd-dark opacity-75"></div>
                    <h1 className="text-smd-light px-smd-24 text-center text-4xl lg:text-7xl font-second z-10">{data.name}</h1>
                    <div className="border border-gray-300 flex items-center gap-smd-8 justify-center bg-gray-500/15 mt-smd-16 text-smd-light px-smd-16 py-smd-8 rounded-full z-10">
                        <p>Home</p> <ChevronRightIcon className={`h-smd-16 w-smd-16 `}/> <p>Posts</p>
                    </div>
                </div>
                <div className="w-full">
                    <div className="mx-auto px-smd-16 my-smd-16 lg:my-smd-40 w-full flex items-center overflow-hidden max-w-smd-max rounded-xl lg:h-smd-592">
                        <img className="w-full rounded-xl object-cover" src={data.image.url} alt={data.name}/>
                    </div>

                    <div className="grid mx-auto max-w-smd-max grid-cols-1 lg:grid-cols-3 mb-smd-104 lg:gap-smd-16">
                        <div className="w-full col-span-2">
                            <div className="flex justify-center lg:justify-start mb-smd-40 gap-smd-32">
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
                            <h1 className="text-smd-dark text-center lg:text-left text-5xl font-second font-bold mb-smd-40">
                                {data.name}
                            </h1>
                            <div className="mb-smd-40">
                                <p className="text-smd-gray-text px-smd-24 text-justify lg:px-0 lg:text-left">
                                    {data.content}
                                </p>
                            </div>
                        </div>
                        <SideBar categories={categories} relatedPosts={relatedPosts} />
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
