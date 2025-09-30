import {StarIcon} from "@heroicons/react/16/solid/index.js";

export default function GastronomiaCard({item}) {
    return (
        <div className="bg-white rounded-2xl w-full sm:w-smd-304 h-full p-smd-16 overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2">
            <div className="rounded-2xl overflow-hidden bg-white">
                <img className="w-full h-smd-224 object-cover" src={item.imagen} alt={item.nombre} />
            </div>
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="text-xl font-bold text-gray-800">{item.nombre}</h4>
                        <p className="text-gray-500 text-sm mt-1">{item.categoria}</p>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-1 bg-green-100 text-green-800 font-bold text-sm px-3 py-1 rounded-full">
                        <StarIcon className="w-4 h-4" />
                        <span>{item.rate.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
