import {useEffect, useRef, useState} from "react";
import {ChevronDownIcon} from "@heroicons/react/24/solid/index.js";
import Dropdown from "@/Components/Dropdown.jsx";
import {Link} from "@inertiajs/react";

export default function DropdownSm({ title, children }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Cierra el dropdown si se hace clic fuera de él
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
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-1.5 lg:text-lg font-bold text-gray-800 hover:text-yellow-500 transition-colors duration-300">
                {title}
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute z-10 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-100 animate-fade-in-down">
                    <div className="p-2">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

const DropdownLink = ({ href, children }) => (
    <Link href={href} className="block font-medium w-full px-4 py-2 text-md text-gray-700 rounded-md hover:bg-gray-100 hover:text-green-700">{children}</Link>
);

DropdownSm.Link = DropdownLink;
