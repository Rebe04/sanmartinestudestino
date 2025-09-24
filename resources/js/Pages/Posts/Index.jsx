import MainLayout from "@/Layouts/MainLayout.jsx";
import blogImage from "@/assets/images/banner/1.webp";
import {ChevronRightIcon} from "@heroicons/react/24/outline/index.js";
import PostCard from "@/Components/PostsCard.jsx";
import SideBar from "@/Components/SideBar.jsx";

export default function Index({posts, post_categories}) {
    const data = posts.data;
    const postCategories = post_categories.data;
    return(
        <MainLayout>
            <div className="min-h-screen w-full">
                <div className={`flex flex-col relative items-center justify-center pt-smd-104 w-full h-smd-496`} style={{ backgroundImage: `url(${blogImage})`, backgroundSize: 'cover'}}>
                    <div className="absolute top-0 w-full h-smd-496 bg-smd-dark opacity-75"></div>
                    <h1 className="text-smd-light text-7xl font-second z-10">Blog</h1>
                    <div className="border border-gray-300 flex items-center gap-smd-8 justify-center bg-gray-500/15 mt-smd-16 text-smd-light px-smd-16 py-smd-8 rounded-full z-10">
                        <p>Home</p> <ChevronRightIcon className={`h-smd-16 w-smd-16 `}/> <p>Blog</p>
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
                    <SideBar categories={postCategories} />
                </div>
            </div>
        </MainLayout>
    )
}
