import {PencilIcon, TrashIcon} from "@heroicons/react/24/solid";
import React from "react";

export default function SubeventCard({ subevent, onRemove, onEdit }) {
    const imagePreview = subevent.image ? (typeof subevent.image === 'string' ? subevent.image : URL.createObjectURL(subevent.image)) : 'https://placehold.co/400x400/eeeeee/cccccc?text=Subevento';
    const formattedDate = new Date(subevent.date).toLocaleDateString('es-CO', { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="flex items-start gap-4 p-4 border rounded-md bg-gray-50">
            <img src={imagePreview} className="w-24 h-24 rounded-md object-cover flex-shrink-0" alt={subevent.name} />
            <div className="flex-grow">
                <p className="font-bold text-smd-dark">{subevent.name}</p>
                <p className="text-sm font-semibold text-smd-soft-green">{formattedDate} - {subevent.duration}</p>
                <p className="text-sm text-gray-600 mt-1">{subevent.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                    {subevent.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full">{tag.label || tag}</span>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <button type="button" onClick={onEdit} className="text-blue-600 p-1 rounded-full hover:bg-blue-100"><PencilIcon className="h-5 w-5" /></button>
                <button type="button" onClick={onRemove} className="text-red-600 p-1 rounded-full hover:bg-red-100"><TrashIcon className="h-5 w-5" /></button>
            </div>
        </div>
    );
}
