
export default function Preloader ({ isFadingOut, logo }) {
    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gray-50 transition-opacity duration-300 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
            <img src={logo} alt="Cargando..." className="w-48 animate-pulse-zoom"/>
        </div>
    )
};
