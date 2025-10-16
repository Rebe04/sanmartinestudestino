import {PencilIcon, TrashIcon} from "@heroicons/react/24/solid/index.js";
import React from "react";

export default function DishCard({ dish, onRemove, onEdit }) {
    const imagePreview = typeof dish.image === 'string' ? dish.image : dish.image ? URL.createObjectURL(dish.image) : '';
    return (
        <div className="flex items-center gap-4 p-2 border rounded-md bg-gray-50">
            <img src={imagePreview} className="w-16 h-16 rounded-md object-cover flex-shrink-0" alt={dish.name} />
            <p className="flex-grow font-semibold text-smd-dark truncate">{dish.name}</p>
            <button type="button" onClick={onEdit} className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100 transition-colors">
                <PencilIcon className="h-5 w-5" />
            </button>
            <button type="button" onClick={onRemove} className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition-colors">
                <TrashIcon className="h-5 w-5" />
            </button>
        </div>
    );
}
