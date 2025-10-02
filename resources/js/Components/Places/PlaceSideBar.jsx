import {Link} from "@inertiajs/react";
import {MapPinIcon} from "@heroicons/react/16/solid/index.js";
import SocialIcon from "@/Components/Utils/SocialIcon.jsx";

export default function PlaceSideBar({place, places}) {
    return (
        <aside>
            {place.phone || place.email || place.facebook || place.instagram || place.youtube ?
                (<div className="bg-gray-200/80 rounded-xl lg:mx-0 p-smd-32  mt-smd-16">
                    <h2 className="text-2xl text-center lg:text-left font-second font-bold text-smd-dark mb-smd-16">Más Información</h2>
                    <div className="flex justify-center lg:justify-start gap-smd-8 mb-smd-8">
                        <span className="font-semibold">Telefono:</span>
                        <Link className="text-smd-gray-text" href={`tel:${place.phone}`}>{place.phone}</Link>
                    </div>
                    <div className="flex justify-center lg:justify-start gap-smd-8 mb-smd-24">
                        <span className="font-semibold">Email:</span>
                        <Link className="text-smd-gray-text" href={`mailto:${place.email}`}>{place.email}</Link>
                    </div>
                    <div className="flex justify-center lg:justify-start  items-center gap-smd-16">
                        <SocialIcon className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white border-2 border-green-500 transition-colors duration-300 hover:bg-green-500`} href={place.facebook}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-facebook" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" /></svg>
                        </SocialIcon>
                        <SocialIcon className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white border-2 border-green-500 transition-colors duration-300 hover:bg-green-500`} href={place.instagram}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-instagram" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M16.5 7.5l0 .01" /></svg>
                        </SocialIcon>
                        <SocialIcon className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white border-2 border-green-500 transition-colors duration-300 hover:bg-green-500`} href={place.youtube}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-youtube" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z" />
                                <path d="M10 9l5 3l-5 3z" />
                            </svg>
                        </SocialIcon>
                    </div>
                </div>):(null)}
            <div className="bg-gray-200/80 rounded-xl mb-smd-32 p-smd-32 mt-smd-16">
                <h2 className="text-2xl font-second font-bold text-smd-dark">Otros Lugares</h2>
                <ul className="mt-smd-16">
                    {places.map((place, index) => (
                        <li className="mt-smd-8 rounded-lg group" key={index}>
                            <Link className="flex group items-center" href={route('places.show', place)}>
                                <div className="w-smd-64 h-smd-64 rounded-xl mr-smd-16 overflow-hidden">
                                    <img className="object-center w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={place.image.url} alt={place.name}/>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-smd-dark text-lg font-second font-bold group-hover:text-smd-soft-green">
                                        {place.name}
                                    </h3>
                                    <div className="flex items-center">
                                        <p className="text-gray-500 text-xs">{place.address}</p>
                                    </div>
                                </div>
                            </Link>
                            <hr className="border-gray-800/20 my-smd-8"/>
                        </li>
                    ))}
                </ul>
            </div>

        </aside>
    )
}
