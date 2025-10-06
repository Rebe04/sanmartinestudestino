import {CalendarIcon, MapPinIcon} from "@heroicons/react/24/outline/index.js";
import {Link} from "@inertiajs/react";
import {ArrowRightIcon} from "@heroicons/react/16/solid/index.js";
import TruncatedText from "@/Components/Utils/TruncatedText.jsx";

export default function PlaceCard({place}) {
    const {name, image, address} = place;
    return (
        <div className="h-full">
            <div className="overflow-hidden rounded-2xl h-smd-496 ">
                <img src={image.url} alt={name}
                     className="w-full h-full object-cover"/>
            </div>
            <div className="py-smd-32">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                    <span className="flex"><MapPinIcon className="h-smd-16 w-smd-16 mr-smd-8"/> Por {address}</span>
                    <span className="py-smd-4 px-smd-16 bg-smd-green text-smd-light text-center rounded-full text-sm"> {place.place_category.name}</span>
                </div>
                <h3 className="text-4xl font-bold font-second text-smd-dark mb-smd-16">
                    <Link href={route('places.show', place)} className="hover:text-smd-soft-green transition-colors">
                        {name}
                    </Link>
                </h3>
                <TruncatedText text={place.description} maxLength={120} />
                <div className="flex flex-col-reverse md:flex-row justify-between">
                    <Link href={route('places.show', place)}
                          className="inline-flex items-center justify-between gap-2 px-smd-16 md:px-smd-16 2xl:px-smd-32 font-bold text-smd-light py-smd-8 xl:py-smd-16 rounded-full mt-smd-16 md:mt-smd-32 bg-smd-soft-green hover:bg-smd-yellow transition-colors">
                        Ver Detalles <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1"/>
                    </Link>
                    <div className="flex mt-smd-32 md:mt-0 items-center">
                        <span className="text-smd-gray-text 2xl:mr-smd-8 text-wrap">Precio Entrada:</span>
                        <span className="text-3xl font-second font-semibold text-smd-dark">
                        {place.price}
                    </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
