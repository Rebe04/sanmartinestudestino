import {Head, Link} from '@inertiajs/react';
import { useState, useEffect } from 'react';
import logo from '../assets/images/logo.png';
import SearchModal from '@/Components/SearchModal';
import Preloader from "@/Components/Preloader.jsx";
import Footer from "@/Components/Footer.jsx";
import SideMenu from "@/Components/SideMenu.jsx";
import Navbar from "@/Components/Navbar.jsx";

export default function MainLayout({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [sideMenuOpen, setSideMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const fadeTimer = setTimeout(() => setIsFadingOut(true), 1500);
        const loadTimer = setTimeout(() => setIsLoading(false), 1800);
        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(loadTimer);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen w-full bg-gray-50">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                    rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap"
                      rel="stylesheet"/>
            </Head>
            {isLoading && <Preloader logo={logo} isFadingOut={isFadingOut}/>}
            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)}/>

            {/* --- Offcanvas del Menú Lateral (SideMenu) --- */}
            {sideMenuOpen && <SideMenu setSideMenuOpen={setSideMenuOpen}/>}

            <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} setSideMenuOpen={setSideMenuOpen} setSearchOpen={setSearchOpen} scrolled={scrolled} />

            {/* --- Menú desplegable para móvil --- */}


            <main>
                {children}
            </main>

            <Footer/>
        </div>
    );
}
