import { Head, Link } from '@inertiajs/react';
import MainLayout from "@/Layouts/MainLayout.jsx";
import Banner from "@/Components/Banner.jsx";
import AboutSection from "@/Components/AboutSection.jsx";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <MainLayout>
            <Head title="Welcome" />
            <Banner/>
            <AboutSection/>

        </MainLayout>
    );
}
