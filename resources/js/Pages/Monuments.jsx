import blogImage from "@/assets/images/banner/1.webp";
import {ChevronRightIcon} from "@heroicons/react/24/outline/index.js";
import MainLayout from "@/Layouts/MainLayout.jsx";

export default function Monuments() {
    return (
        <MainLayout>
            <div className="min-h-screen w-full">
                <div className={`flex flex-col relative items-center justify-center pt-smd-104 w-full h-smd-496`} style={{ backgroundImage: `url(${blogImage})`, backgroundSize: 'cover'}}>
                    <div className="absolute top-0 w-full h-smd-496 bg-smd-dark opacity-75"></div>
                    <h1 className="text-smd-light text-7xl font-second z-10">Nuestros Monumentos</h1>
                    <div className="border border-gray-300 flex items-center gap-smd-8 justify-center bg-gray-500/15 mt-smd-16 text-smd-light px-smd-16 py-smd-8 rounded-full z-10">
                        <p>Home</p> <ChevronRightIcon className={`h-smd-16 w-smd-16 `}/> <p>Monumentos</p>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
