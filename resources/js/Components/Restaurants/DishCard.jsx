import {StarIcon} from "@heroicons/react/16/solid/index.js";

export default function DishCard({dish}) {
    return(
        <div className="bg-white rounded-2xl w-full sm:w-smd-304 lg:w-full h-full p-smd-16 overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2">
            <div className="rounded-2xl overflow-hidden h-smd-24 lg:h-smd-184 lg:w-full bg-white">
                <img className="w-full h-full object-cover" src={dish.image.url} alt={dish.name} />
            </div>
            <div className="mt-smd-16">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="text-xl font-bold text-gray-800">{dish.name}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}
