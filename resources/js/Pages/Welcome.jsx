import { Head, Link } from '@inertiajs/react';
import MainLayout from "@/Layouts/MainLayout.jsx";
import Banner from "@/Components/Home/Banner.jsx";
import AboutSection from "@/Components/Home/AboutSection.jsx";
import RoutesSection from "@/Components/Home/RoutesSection.jsx";
import DondeComer from "@/Components/Home/DondeComer.jsx";
import DondeDormir from "@/Components/Home/DondeDormir.jsx";
import NextEvent from "@/Components/Home/NextEvent.jsx";
import PostsSection from "@/Components/Home/PostsSection.jsx";

export default function Welcome({ auth, laravelVersion, phpVersion, posts }) {
    return (
        <MainLayout>
            <Head title="Inicio" />
            <Banner/>
            <AboutSection/>
            <PostsSection posts={posts} />
            <RoutesSection/>
            <DondeComer/>
            <DondeDormir/>
            <NextEvent/>
        </MainLayout>
    );
}


