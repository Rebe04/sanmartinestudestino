import {XMarkIcon} from "@heroicons/react/24/solid";
import logo from '../../assets/images/logo.png';

export default function SideMenu({setSideMenuOpen}) {
    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            <div onClick={() => setSideMenuOpen(false)} className="fixed inset-0 bg-black bg-opacity-50 animate-fade-in"></div>
            <div className="relative w-3/12 max-w-sm bg-white shadow-xl p-6 animate-slide-in-left">
                <div className="flex justify-between items-center mb-8">
                    <img src={logo} alt="Logo" className="w-32"/>
                    <button onClick={() => setSideMenuOpen(false)}><XMarkIcon className="w-6 h-6 text-gray-600" /></button>
                </div>
                {/* Aquí puedes agregar el contenido del offcanvas que tenías en el HTML */}
                <p className="text-gray-600">Contenido del menú lateral iría aquí.</p>
            </div>
        </div>
    )
}
