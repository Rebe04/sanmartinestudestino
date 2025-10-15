import MainLayout from "@/Layouts/MainLayout.jsx";
import blogImage from "@/assets/images/banner/1.webp";
import {ChevronRightIcon} from "@heroicons/react/24/outline/index.js";
import PostCard from "@/Components/Posts/PostsCard.jsx";
import SideBar from "@/Components/Posts/SideBar.jsx";
import React from "react";
import {Head} from "@inertiajs/react";

export default function Show({posts, postCategory, postCategories}) {
    const data = posts.data;
    const categoryData = postCategory.data;
    const categories = postCategories.data;
    return(
        <MainLayout>
            <Head title={`Posts de Categoría: ${data.name}`}/>
            <div className="min-h-screen w-full">
                <div className={`flex flex-col relative items-center justify-center pt-smd-104 w-full h-smd-496`} style={{ backgroundImage: `url(${blogImage})`, backgroundSize: 'cover'}}>
                    <div className="absolute top-0 w-full h-smd-496 bg-smd-dark opacity-75"></div>
                    <h3 className="text-smd-yellow text-xl font-second z-10">Posts de Categoría</h3>
                    <h1 className="text-smd-light text-3xl text-center md:text-5xl 2xl:text-7xl font-bold font-second z-10">{categoryData.name}</h1>
                    <div className="border border-gray-300 flex items-center gap-smd-8 justify-center bg-gray-500/15 mt-smd-16 text-smd-light px-smd-16 py-smd-8 rounded-full z-10">
                        <p>Home</p> <ChevronRightIcon className={`h-smd-16 w-smd-16 `}/> <p>Categorías</p>
                    </div>
                </div>
                <div className="max-w-smd-max mx-auto grid grid-cols-3 gap-smd-32 my-smd-80">
                    <div className="col-span-2">
                        {data.map((post, index) => (
                            <div className="mb-smd-32" key={index}>
                                <PostCard post={post} />
                            </div>
                        ))}
                    </div>
                    <SideBar categories={categories} />
                </div>
            </div>
        </MainLayout>
    )
}

Show.layout = page => <MainLayout children={page} title="Posts de Categoría:" />;
