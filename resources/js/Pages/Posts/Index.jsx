import MainLayout from "@/Layouts/MainLayout.jsx";
import blogImage from "@/assets/images/banner/1.webp";
import {ChevronRightIcon} from "@heroicons/react/24/outline/index.js";
import PostCard from "@/Components/Posts/PostsCard.jsx";
import SideBar from "@/Components/Posts/SideBar.jsx";
import {Head} from "@inertiajs/react";
import Pagination from "@/Components/Utils/Pagination.jsx";

export default function Index({posts, post_categories}) {
    const data = posts.data;
    const postCategories = post_categories.data;
    return(
        <MainLayout>
            <Head title="Blog" />
            <div className="min-h-screen w-full">
                <div className={`flex flex-col relative items-center justify-center pt-smd-104 w-full h-smd-496`} style={{ backgroundImage: `url(${blogImage})`, backgroundSize: 'cover'}}>
                    <div className="absolute top-0 w-full h-smd-496 bg-smd-dark opacity-75"></div>
                    <h1 className="text-smd-light text-3xl text-center md:text-5xl 2xl:text-7xl font-bold font-second z-10">Blog</h1>
                    <div className="border border-gray-300 flex items-center gap-smd-8 justify-center bg-gray-500/15 mt-smd-16 backdrop-blur-sm text-smd-light md:py-smd-4 px-smd-16 2xl:py-smd-8 rounded-full z-10">
                        <p>Home</p> <ChevronRightIcon className={`h-smd-16 w-smd-16 `}/> <p>Blog</p>
                    </div>
                </div>
                <div className="sm-container mx-auto grid lg:grid-cols-3 gap-smd-32 py-smd-64">
                    <div className="lg:col-span-2">
                        {data.map((post, index) => (
                            <div className="mb-smd-32" key={index}>
                                <PostCard post={post} />
                            </div>
                        ))}
                        {/* Paginación */}
                        <div className="my-smd-32">
                            <Pagination links={posts.meta.links} />
                        </div>
                    </div>
                    <SideBar categories={postCategories} />
                </div>
            </div>
        </MainLayout>
    )
}
