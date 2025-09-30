import {useEffect, useRef, useState} from "react";
import {ChevronDownIcon} from "@heroicons/react/24/solid/index.js";
import {Link} from "@inertiajs/react";

// Le añadimos la prop 'mobile', que por defecto será 'false'.
export default function DropdownSm({ title, children, mobile = false }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Cierra el dropdown si se hace clic fuera de él (funciona bien en ambos modos)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        // El contenedor solo necesita ser 'relative' en modo escritorio
        <div className={!mobile ? 'relative' : ''} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                // Hacemos que el botón ocupe todo el ancho en móvil para un área de toque más grande
                className={`flex items-center justify-between w-full lg:w-auto gap-1.5 lg:text-lg font-bold text-gray-800 hover:text-yellow-500 transition-colors duration-300 text-left`}
            >
                <span>{title}</span>
                <ChevronDownIcon className={`w-4 h-4 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                // Aquí está la magia: aplicamos clases condicionales
                <div
                    className={
                        mobile
                            ? "pl-4 mt-2 flex flex-col space-y-1" // Estilos de Acordeón para MÓVIL
                            : "absolute z-10 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-100 animate-fade-in-down" // Estilos de Popover para ESCRITORIO
                    }
                >
                    <div className={!mobile ? "p-2" : ""}>
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

const DropdownLink = ({ href, children }) => (
    <Link
        href={href}
        className="block font-medium w-full px-4 py-2 text-md text-gray-700 rounded-md hover:bg-gray-100 hover:text-green-700"
    >
        {children}
    </Link>
);

DropdownSm.Link = DropdownLink;

