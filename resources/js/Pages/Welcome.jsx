import { Head, Link } from '@inertiajs/react';
import MainLayout from "@/Layouts/MainLayout.jsx";
import Banner from "@/Components/Banner.jsx";
import AboutSection from "@/Components/AboutSection.jsx";
import RoutesSection from "@/Components/RoutesSection.jsx";
import DondeComer from "@/Components/DondeComer.jsx";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <MainLayout>
            <Head title="Inicio" />
            <Banner/>
            <AboutSection/>
            <RoutesSection/>
            <DondeComer/>

        </MainLayout>
    );
}
