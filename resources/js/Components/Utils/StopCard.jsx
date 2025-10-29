import { XCircleIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { Draggable } from 'react-beautiful-dnd';
export default function StopCard({ stop, index, onDescriptionChange, onRemove }) {
    const imageUrl = `https://placehold.co/100x100/eeeeee/cccccc?text=${stop.label.charAt(0)}`; // Placeholder

    return (
        <Draggable draggableId={`${stop.value}-${stop.type}`} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`p-4 bg-white rounded-lg shadow mb-4 border ${snapshot.isDragging ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-200'}`}
                >
                    <div className="flex items-start gap-4">
                        {/* Drag Handle */}
                        <div {...provided.dragHandleProps} className="pt-1 text-gray-400 cursor-grab">
                            <Bars3Icon className="h-5 w-5" />
                        </div>
                        {/* Imagen (Placeholder) */}
                        <img src={imageUrl} alt={stop.label} className="w-16 h-16 rounded-md object-cover flex-shrink-0"/>
                        {/* Contenido */}
                        <div className="flex-grow">
                            <p className="font-bold text-smd-dark">{stop.label}</p>
                            <textarea
                                value={stop.description || ''}
                                onChange={(e) => onDescriptionChange(e.target.value, index)}
                                placeholder="Describe la visita o por qué se incluyó esta parada..."
                                className="w-full mt-2 p-2 border rounded-md text-sm text-gray-700 focus:ring-smd-soft-green focus:border-smd-soft-green"
                                rows="3"
                            />
                        </div>
                        {/* Botón Eliminar */}
                        <button
                            type="button"
                            onClick={onRemove}
                            className="text-red-500 hover:text-red-700 pt-1"
                            title="Quitar parada"
                        >
                            <XCircleIcon className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            )}
        </Draggable>
    );
}
