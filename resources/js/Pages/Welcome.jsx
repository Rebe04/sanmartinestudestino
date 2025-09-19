import { Head, Link } from '@inertiajs/react';
import MainLayout from "@/Layouts/MainLayout.jsx";
import Banner from "@/Components/Banner.jsx";
import AboutSection from "@/Components/AboutSection.jsx";
import RoutesSection from "@/Components/RoutesSection.jsx";
import DondeComer from "@/Components/DondeComer.jsx";
import DondeDormir from "@/Components/DondeDormir.jsx";
import NextEvent from "@/Components/NextEvent.jsx";
import PostsSection from "@/Components/PostsSection.jsx";

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


