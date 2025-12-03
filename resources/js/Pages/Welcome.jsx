import { Head, Link } from '@inertiajs/react';
import MainLayout from "@/Layouts/MainLayout.jsx";
import Banner from "@/Components/Home/Banner.jsx";
import AboutSection from "@/Components/Home/AboutSection.jsx";
import RoutesSection from "@/Components/Home/RoutesSection.jsx";
import DondeComer from "@/Components/Home/DondeComer.jsx";
import DondeDormir from "@/Components/Home/DondeDormir.jsx";
import NextEvent from "@/Components/Home/NextEvent.jsx";
import PostsSection from "@/Components/Home/PostsSection.jsx";
import React from "react";
import NavidadSection from "@/Components/Home/NavidadSection.jsx";

export default function Welcome({ auth, laravelVersion, phpVersion, posts, restaurants, nextEvent, hotels }) {
    return (
        <div>
            <Banner/>
            <AboutSection/>
            <NavidadSection/>
            <PostsSection posts={posts} />
            <RoutesSection/>
            <DondeComer restaurants={restaurants.data} />
            <DondeDormir hotels={hotels.data}/>
            {nextEvent && <NextEvent eventData={nextEvent.data} />}
        </div>
    );
}

Welcome.layout = page => <MainLayout children={page} title="Inicio" />;


