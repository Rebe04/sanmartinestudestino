import EventCard from "@/Components/Home/EventCard.jsx";
import event1 from "../../assets/images/events/Evento_1.jpeg"
import event2 from "../../assets/images/events/Evento_2.jpeg"
import event3 from "../../assets/images/events/Evento_3.jpg"
import event4 from "../../assets/images/events/Evento_4.jpeg"
import event5 from "../../assets/images/events/Evento_5.jpg"
export default function NextEvent() {

    const eventos = [
        {
            // --- Evento Principal ---
            eventName: "Festival Internacional Folclórico y Turístico del Llano",
            eventDateRange: "8 al 11 de Noviembre de 2025",
            eventDescription: "La máxima celebración de la cultura llanera, donde San Martín de los Llanos se convierte en el epicentro del folclor, la música, la gastronomía y las tradiciones de Colombia y Venezuela.",
            eventImage: "https://placehold.co/1200x600/2E6230/FFFFFF?text=Festival+del+Llano",

            // --- Array de Sub-Eventos ---
            subEvents: [
                {
                    image: event1,
                    name: "Juegos de Cuadrillas de San Martín",
                    extract: "El alma del festival. Un espectáculo único en el mundo que narra la lucha entre moros y cristianos a través de coreografías ecuestres.",
                    date: "Domingo, 10 de Noviembre",
                    time: "02:00 PM",
                    location: "Plaza de Cuadrillas Gabino de Balboa",
                    category: "Tradición",
                    long_description: "Declaradas Patrimonio Cultural de la Nación, las Cuadrillas son una tradición de más de 300 años. Cuatro partidas (Moros, Cristianos, Indios y Negros) realizan diez juegos o coreografías a caballo, demostrando una increíble destreza y coordinación."
                },
                {
                    image: event2,
                    name: "Joropódromo 'El Sanmartinero'",
                    extract: "Las principales calles del municipio se visten de fiesta y zapateo en este masivo desfile de academias de baile de joropo.",
                    date: "Sábado, 9 de Noviembre",
                    time: "03:00 PM",
                    location: "Principales calles del municipio",
                    category: "Folclor",
                    long_description: "Más de mil parejas de baile de toda la Orinoquía compiten en un vibrante recorrido, mostrando su talento y pasión por el joropo. Un evento lleno de color, música y energía que contagia a todos los espectadores."
                },
                {
                    image: event3,
                    name: "Reinado Internacional del Llano",
                    extract: "La belleza y el talento de la mujer llanera se toman el escenario en este certamen que busca a la embajadora del folclor de Colombia y Venezuela.",
                    date: "Viernes, 8 de Noviembre",
                    time: "08:00 PM",
                    location: "Tarima Principal del Festival",
                    category: "Certamen",
                    long_description: "Las candidatas de diferentes regiones de Colombia y estados de Venezuela no solo compiten por su belleza, sino que demuestran su conocimiento del folclor, su destreza en el baile del joropo y su amor por la cultura llanera."
                },
                {
                    image: event4,
                    name: "Gran Cabalgata de Apertura",
                    extract: "Miles de jinetes de toda la región se congregan para dar inicio oficial al festival en una impresionante muestra de la cultura equina llanera.",
                    date: "Viernes, 8 de Noviembre",
                    time: "10:00 AM",
                    location: "Principales calles del municipio",
                    category: "Tradición",
                    long_description: "La cabalgata es un desfile de los mejores ejemplares equinos de la región, donde caballistas de todas las edades muestran con orgullo sus caballos y aperos, recorriendo el pueblo al ritmo de la música llanera."
                },
                {
                    image: event5,
                    name: "Muestras Gastronómicas y Artesanales",
                    extract: "Un recorrido por los sabores y saberes del llano. Prueba la mamona, las hayacas, el pan de arroz y llévate una pieza única de artesanía local.",
                    date: "Del 8 al 11 de Noviembre",
                    time: "Todo el día",
                    location: "Parque Principal y alrededores",
                    category: "Gastronomía",
                    long_description: "Durante todo el festival, el parque principal se convierte en una gran feria donde los visitantes pueden degustar los platos más representativos de la gastronomía llanera y adquirir artesanías hechas a mano por talentosos artesanos de la región."
                }
            ]
        }
    ];
    const festival = eventos[0];
    const subEvents = festival.subEvents;
    const totalSubEvents = subEvents.length;

    return (
        <section className="bg-gray-200 w-full pt-20">
            <div className="w-full">
                <div className="text-center mx-auto lg:w-1/2 mb-12">
                    <h3 className="text-green-600 text-2xl italic">
                        Nuestro Próximo evento
                    </h3>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800 mt-1">
                        {festival.eventName}
                    </h2>
                </div>

                {/* Contenedor Flexbox para la grid dinámica */}
                <div className="flex flex-wrap">
                    {subEvents.map((subEvent, index) => {
                        const isLast = index === totalSubEvents - 1;
                        const isSecondToLast = index === totalSubEvents - 2;

                        let sizeClasses = 'md:w-1/2 lg:basis-1/3';
                        if (totalSubEvents % 3 === 2 && (isLast || isSecondToLast)) {
                            sizeClasses = 'md:w-1/2 lg:basis-1/2';
                        }

                        // Si en la última fila queda 1 solo elemento, ocupa 100%
                        if (totalSubEvents % 3 === 1 && isLast) {
                            sizeClasses = 'md:w-full lg:basis-full';
                        }

                        return (
                            <EventCard
                                key={index}
                                subEvent={subEvent}
                                className={sizeClasses}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    )
}
