import logo from "@/assets/images/logo.png";
import NavLink from "@/Components/Utils/NavLink.jsx";
import DropdownSm from "@/Components/Utils/DropdownSm.jsx";
import {Bars3BottomRightIcon, MagnifyingGlassIcon, XMarkIcon} from '@heroicons/react/24/solid';
import {Link} from "@inertiajs/react";

export default function Navbar({scrolled, setSearchOpen, setSideMenuOpen, setMobileMenuOpen, mobileMenuOpen})  {
    return (
        <>
            {/* --- Header Flotante --- */}
            <div className={`fixed top-0 left-0 right-0 z-40 transition-all w-full px-4 md:px-12 duration-300 ${scrolled ? 'py-5' : 'py-7'}`}>
                <header className={`w-full bg-white/95 backdrop-blur-md rounded-xl lg:rounded-full shadow-lg border border-gray-400/50 px-8 flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-[85px] lg:h-[80px] lg:py-2' : 'h-[85px] lg:h-[100px]'}`}>
                    <Link href={route('home')}>
                        <img className={`w-20 lg:w-28 h-auto transition-all duration-300 ${scrolled ? 'lg:w-20' : 'lg:w-28'}`} src={logo} alt="San Martin es tu Destino Logo"/>
                    </Link>

                    <div className="flex justify-end gap-x-20 ">
                        <nav className="hidden lg:flex items-center gap-2 lg:gap-4 xl:gap-6 2xl:gap-8">
                            <NavLink href={route('home')}>Inicio</NavLink>
                            <DropdownSm title="Guía Local">
                                <DropdownSm.Link href={route('hotels.index')}>Dónde Dormir</DropdownSm.Link>
                                <DropdownSm.Link href={route('restaurants.index')}>Dónde Comer</DropdownSm.Link>
                            </DropdownSm>
                            <DropdownSm title="Cultura y Eventos">
                                <DropdownSm.Link href={route('about-us')}>Nuestra Historia</DropdownSm.Link>
                                <DropdownSm.Link href={route('cuadrillas')}>Las Cuadrillas</DropdownSm.Link>
                                <DropdownSm.Link href={route('monuments')}>Monumentos</DropdownSm.Link>
                            </DropdownSm>
                            <NavLink href={route('posts.index')}>Blog</NavLink>
                            <NavLink href={route('contact-us')}>Contacto</NavLink>
                        </nav>

                        <div className="flex items-center gap-4">
                            <div className="hidden lg:flex items-center gap-2">
                                <button onClick={() => setSearchOpen(true)} className="p-3 rounded-full hover:bg-gray-100">
                                    <MagnifyingGlassIcon className="w-6 h-6 text-gray-700"/>
                                </button>
                                <button onClick={() => setSideMenuOpen(true)} className="p-3 rounded-full hover:bg-gray-100">
                                    <svg className="w-6 h-6 text-gray-700" xmlns="http://www.w3.org/2000/svg" width="26" height="18" viewBox="0 0 26 18" fill="none">
                                        <path d="M19.5 1.28571C19.5 0.575658 18.9179 0 18.2 0H1.3C0.582056 0 0 0.575658 0 1.28571C0 1.99577 0.582056 2.57143 1.3 2.57143H18.2C18.9179 2.57143 19.5 1.99572 19.5 1.28571ZM1.3 7.71428H24.7C25.4179 7.71428 26 8.28999 26 9C26 9.71006 25.4179 10.2857 24.7 10.2857H1.3C0.582056 10.2857 0 9.71006 0 9C0 8.28999 0.582056 7.71428 1.3 7.71428ZM1.3 15.4286H13C13.7179 15.4286 14.3 16.0042 14.3 16.7143C14.3 17.4243 13.7179 18 13 18H1.3C0.582056 18 0 17.4243 0 16.7143C0 16.0042 0.582056 15.4286 1.3 15.4286Z" fill="currentColor" />
                                    </svg>
                                </button>
                            </div>
                            <Link href={route('places.index')} className="hidden xl:block bg-green-600 text-white font-bold px-6 py-3 rounded-full hover:bg-yellow-500 transition-colors">
                                Explora San Martín
                            </Link>
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden">
                                <Bars3BottomRightIcon className="w-8 h-8 text-gray-800" />
                            </button>
                        </div>
                    </div>
                </header>
            </div>
            {mobileMenuOpen && (
                <div className="lg:hidden fixed top-0 inset-x-0 z-50 p-2 transition transform origin-top-right">
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                        <div className="pt-5 pb-6 px-5">
                            <div className="flex items-center justify-between">
                                <Link href={route('home')}>
                                    <img className="h-12 w-auto" src={logo} alt="Logo" />
                                </Link>
                                <div className="-mr-2">
                                    <button
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                                    >
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                            <div className="mt-6">
                                <nav className="grid gap-y-8">
                                    <NavLink href={route('home')}>Inicio</NavLink>
                                    <DropdownSm mobile={true} title="Guía Local">
                                        <DropdownSm.Link href={route('hotels.index')}>Dónde Dormir</DropdownSm.Link>
                                        <DropdownSm.Link href={route('restaurants.index')}>Dónde Comer</DropdownSm.Link>
                                    </DropdownSm>
                                    <DropdownSm mobile={true} title="Cultura y Eventos">
                                        <DropdownSm.Link href={route('about-us')}>Nuestra Historia</DropdownSm.Link>
                                        <DropdownSm.Link href={route('cuadrillas')}>Las Cuadrillas</DropdownSm.Link>
                                        <DropdownSm.Link href={route('monuments')}>Monumentos</DropdownSm.Link>
                                    </DropdownSm>
                                    <NavLink href={route('posts.index')}>Blog</NavLink>
                                    <NavLink href={route('contact-us')}>Contacto</NavLink>
                                    <NavLink href={route('places.index')}>Explora San Martin</NavLink>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
