import EventCard from "@/Components/Home/EventCard.jsx";
import event1 from "../../assets/images/events/Evento_1.jpeg"
import event2 from "../../assets/images/events/Evento_2.jpeg"
import event3 from "../../assets/images/events/Evento_3.jpg"
import event4 from "../../assets/images/events/Evento_4.jpeg"
import event5 from "../../assets/images/events/Evento_5.jpg"
export default function NextEvent({eventData}) {

    const festival = eventData;
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
