import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    HomeIcon,
    NewspaperIcon,
    BuildingOffice2Icon,
    BuildingStorefrontIcon,
    ChevronDownIcon,
    FlagIcon,
    MapIcon, CalendarDaysIcon
} from '@heroicons/react/24/outline';
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";

export default function Sidebar({ isOpen, setIsOpen }) {
    const { url } = usePage();

    const isActive = (path) => url.startsWith(path);
    const [openDropdown, setOpenDropdown] = useState('');

    const navLinks = [
        { name: 'Dashboard', href: route('admin.dashboard'), icon: HomeIcon, active: isActive('/admin/dashboard') },
        {
            name: 'Posts',
            icon: NewspaperIcon,
            active: isActive('/admin/posts') || isActive('/admin/post-categories'),
            children: [
                { name: 'Todos los Posts', href: route('admin.posts.index'), active: isActive('/admin/posts') },
                { name: 'Categorías', href: route('admin.post-categories.index'), active: isActive('/admin/post-categories') },
            ]
        },
        {
            name: 'Hoteles',
            icon: BuildingOffice2Icon,
            active: isActive('/admin/hotels') || isActive('/admin/amenities'),
            children: [
                { name: 'Todos los Hoteles', href: route('admin.hotels.index'), active: isActive('/admin/hotels') },
                { name: 'Comodidades', href: route('admin.amenities.index'), active: isActive('/admin/amenities') },
            ]
        },
        {
            name: 'Restaurantes',
            icon: BuildingStorefrontIcon,
            active: isActive('/admin/restaurants') || isActive('/admin/food-categories'),
            children: [
                { name: 'Todos los Restaurantes', href: route('admin.restaurants.index'), active: isActive('/admin/restaurants') },
                { name: 'Categorías', href: route('admin.food-categories.index'), active: isActive('/admin/food-categories') },
            ]
        },
        {
            name: 'Lugares',
            icon: MapIcon,
            active: isActive('/admin/places') || isActive('/admin/place-categories'),
            children: [
                { name: 'Todos los Lugares', href: route('admin.places.index'), active: isActive('/admin/places') },
                { name: 'Categorías de Lugar', href: route('admin.place-categories.index'), active: isActive('/admin/place-categories') },
            ]
        },
        {
            name: 'Rutas',
            icon: FlagIcon,
            active: isActive('/admin/routes'),
            href: route('admin.routes.index'),
        },
        {
            name: 'Eventos',
            icon: CalendarDaysIcon,
            active: isActive('/admin/events') || isActive('/admin/event-categories') || isActive('/admin/tags'),
            children: [
                { name: 'Todos los Eventos', href: route('admin.events.index'), active: isActive('/admin/events') },
                { name: 'Categorías de Evento', href: route('admin.event-categories.index'), active: isActive('/admin/event-categories') },
                { name: 'Tags de Subevento', href: route('admin.tags.index'), active: isActive('/admin/tags') },
            ]
        },
    ];

    const handleDropdownClick = (name) => {
        setOpenDropdown(openDropdown === name ? '' : name);
    };

    return (
        <aside
            className={`bg-smd-dark text-gray-300 flex flex-col h-full z-30
                fixed inset-y-0 left-0 transform transition-all duration-300 ease-in-out
                lg:relative lg:translate-x-0
                ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:w-20'}`}
        >
            {/* Logo */}
            <div className="flex items-center justify-center h-16 border-b border-gray-700">
                <Link href="/">
                    <ApplicationLogo white={true} className={`w-auto transition-all duration-300 ${isOpen ? 'h-10' : 'h-8'}`} />
                </Link>
            </div>

            {/* Links de Navegación */}
            <nav className="flex-grow px-2 py-4 overflow-y-auto">
                {navLinks.map((link) => {
                    const Icon = link.icon;
                    // Si el enlace tiene hijos, es un desplegable
                    if (link.children) {
                        return (
                            <div key={link.name}>
                                <button
                                    onClick={() => handleDropdownClick(link.name)}
                                    className={`w-full flex items-center justify-between p-3 my-1 rounded-lg hover:bg-smd-soft-green hover:text-white transition-colors duration-200 ${
                                        link.active ? 'bg-smd-soft-green text-white' : ''
                                    }`}
                                >
                                    <div className="flex items-center">
                                        <Icon className="h-6 w-6 flex-shrink-0" />
                                        <span className={`ml-4 font-semibold whitespace-nowrap transition-opacity duration-300 ${!isOpen && 'opacity-0'}`}>
                                            {link.name}
                                        </span>
                                    </div>
                                    {isOpen && (
                                        <ChevronDownIcon className={`h-5 w-5 transition-transform duration-300 ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                                    )}
                                </button>
                                {/* Contenido del desplegable */}
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                        openDropdown === link.name && isOpen ? 'max-h-40' : 'max-h-0'
                                    }`}
                                >
                                    <div className="pl-8 py-2">
                                        {link.children.map(child => (
                                            <Link
                                                key={child.name}
                                                href={child.href}
                                                className={`block p-2 rounded-md text-sm hover:bg-gray-700 ${child.active ? 'text-white font-bold' : 'text-gray-400'}`}
                                            >
                                                {child.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    }
                    // Si no tiene hijos, es un enlace normal
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex items-center p-3 my-1 rounded-lg hover:bg-smd-soft-green hover:text-white transition-colors duration-200 ${
                                link.active ? 'bg-smd-soft-green text-white shadow-lg' : ''
                            }`}
                            title={link.name}
                        >
                            <Icon className="h-6 w-6 flex-shrink-0" />
                            <span className={`ml-4 font-semibold whitespace-nowrap transition-opacity duration-300 ${!isOpen && 'opacity-0'}`}>
                                {link.name}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
