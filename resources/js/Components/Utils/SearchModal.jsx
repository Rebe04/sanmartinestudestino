import { XMarkIcon } from '@heroicons/react/24/solid';

export default function SearchModal({ isOpen, onClose }) {
    if (!isOpen) {
        return null;
    }

    return (
        // Contenedor principal con fondo oscuro semitransparente
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm animate-fade-in"
            onClick={onClose} // Cierra el modal al hacer clic en el fondo
        >
            {/* Contenedor del contenido del modal */}
            <div
                className="relative text-center w-full max-w-2xl p-8"
                onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del modal lo cierre
            >
                <button
                    onClick={onClose}
                    className="absolute top-0 right-0 text-white hover:text-gray-300 transition-colors"
                >
                    <XMarkIcon className="w-8 h-8" />
                </button>

                <h2 className="mb-5 text-4xl md:text-5xl font-bold text-white font-main">
                    ¿Cómo podemos ayudarte?
                </h2>

                <form className="relative">
                    <input
                        type="search"
                        className="w-full bg-transparent border-0 border-b-2 border-gray-400 focus:border-green-500 focus:ring-0 text-white text-xl placeholder-gray-400 text-center py-3"
                        placeholder="Busca lugares, eventos y más..."
                    />
                    {/* El botón de submit puede estar oculto o deshabilitado por ahora */}
                    <button type="submit" className="hidden"></button>
                </form>

                {/* Mensaje informativo */}
                <p className="text-gray-400 mt-4 text-sm">
                    La funcionalidad de búsqueda estará disponible próximamente.
                </p>
            </div>
        </div>
    );
}
