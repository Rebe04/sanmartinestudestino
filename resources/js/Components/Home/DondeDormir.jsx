import {Link} from "@inertiajs/react";
import {MapPinIcon} from "@heroicons/react/16/solid/index.js";
import {ChevronRightIcon} from "@heroicons/react/24/outline/index.js";
import hotel1 from "../../assets/images/hotels/hotel_1.jpg"
import hotel2 from "../../assets/images/hotels/hotel_2.jpg"
import hotel3 from "../../assets/images/hotels/hotel_3.jpg"

export default function DondeDormir(){

    const hotelesSanmartin = [
        {
            imagen: hotel1,
            nombre: "Hotel River Side",
            direccion: "Carrera 7 # 10-05, San Martín",
            precioPorNoche: 180
        },
        {
            imagen: hotel2,
            nombre: "Posada Turística La Herradura",
            direccion: "Calle 10 # 8-15, Barrio Centro",
            precioPorNoche: 95
        },
        {
            imagen: hotel3,
            nombre: "Hotel Palma Real San Martín",
            direccion: "Carrera 7 # 12-34, Frente al Parque Principal",
            precioPorNoche: 120
        },
    ];

    return (
        <>
        <section className="bg-smd-light w-full py-smd-144">
            <div className="mx-auto px-1 md:px-4 w-full max-w-smd-max">
                <div className="w-full flex flex-col justify-center items-center px-smd-24">
                    <span className="text-smd-soft-green text-2xl">
                        Tu Descanso en el Llano
                    </span>
                    <h2 className="text-4xl text-center lg:text-5xl font-extrabold text-smd-dark mb-4" style={{ fontFamily: 'Manrope, cursive' }}>
                        Encuentra tu Hogar en San Martín
                    </h2>
                </div>
                <div className="py-smd-24 grid md:grid-cols-2 lg:grid-cols-3 gap-smd-24 px-smd-24 md:px-smd-88">
                    {hotelesSanmartin.map((hotel, index) => (
                        <div key={index} className="rounded-2xl h-smd-488 overflow-hidden flex flex-col justify-between bg-gray-200/50 group">
                            <img className="object-cover w-full h-smd-224" src={hotel.imagen} alt={hotel.nombre}/>
                            <div className="px-smd-24 my-smd-16 flex flex-col flex-1  justify-between h-auto">
                                <h3 className="text-xl font-bold text-smd-dark font-second group-hover:text-smd-soft-green">
                                    {hotel.nombre}
                                </h3>
                                <div className="mt-smd-16 flex justify-between items-center">
                                    <div className="flex justify-start items-center w-3/5 h-smd-72 border-r border-smd-dark pr-smd-16">
                                        <MapPinIcon className="w-10 h-10 mr-smd-8 text-smd-dark"/>
                                        <p className="text-sm">{hotel.direccion.length > 10
                                            ? `${hotel.direccion.slice(0, 25)}...`
                                            : hotel.direccion
                                        }</p>
                                    </div>
                                    <div className="flex-1 flex flex-col justify-end items-end">
                                        <p className="text-smd-dark text-3xl">{hotel.precioPorNoche}K</p>
                                        <span className="text-smd-gray-text text-smd-16">/noche</span>
                                    </div>
                                </div>
                                <div className="py-smd-16 px-smd-16 w-full flex justify-center">
                                    <Link href="#" className="bg-gray-100 w-full block text-smd-dark font-semibold transition duration-300 ease-in-out rounded-full hover:bg-smd-soft-green  py-smd-8 text-center hover:text-white">
                                        Ver Más
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center w-full mt-smd-64 mb-smd-48">
                    <a href="#" className="inline-flex items-center gap-2 bg-smd-soft-green text-white font-bold px-8 py-4 rounded-full hover:bg-smd-yellow hover:text-white transition-colors duration-300">
                        Más de nuestros hoteles
                        <ChevronRightIcon className="w-5 h-5 animate-bounce-horizontal" />
                    </a>
                </div>
            </div>
        </section>
        </>
    )
}
