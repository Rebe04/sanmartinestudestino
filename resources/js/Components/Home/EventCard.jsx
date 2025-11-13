export default function  EventCard ({ subEvent, className = '' }) {

    return (
        <div className={`flex-shrink-0 w-full ${className}`}>
            <div className="group relative overflow-hidden h-smd-400 2xl:h-smd-568 shadow-lg">
                <img
                    src={subEvent.image}
                    alt={subEvent.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="bg-smd-yellow px-smd-8 mb-smd-8 flex w-fit rounded-full mt-1 line-clamp-2">{subEvent.category}</div>
                    <div className="bg-black/50 text-white px-3 py-1 rounded-full text-xs font-semibold self-start mb-2">
                        {subEvent.date}
                    </div>
                    <h3 className="text-white text-2xl font-bold">{subEvent.name}</h3>
                    <p className="text-white/80 mt-1 line-clamp-2">{subEvent.extract}</p>
                </div>
            </div>
        </div>
    )
}
