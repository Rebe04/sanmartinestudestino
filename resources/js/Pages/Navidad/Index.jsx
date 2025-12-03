import React, { useState, useCallback } from 'react';
import { Head } from '@inertiajs/react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '@/Utils/canvasUtils';
import { ArrowDownTrayIcon, PhotoIcon, ArrowPathIcon, SparklesIcon } from '@heroicons/react/24/solid';
import logo from '../../assets/images/logoWhite.png';
import logoNavidad from '../../assets/images/logo-navidad.png';
import MainLayout from "@/Layouts/MainLayout.jsx";

const FRAME_URL = '/images/marco-navidad.png';


export default function Index() {
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [finalImage, setFinalImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const onFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const imageDataUrl = await readFile(file);
            setImageSrc(imageDataUrl);
            setFinalImage(null);
            setZoom(1);
        }
    };

    const readFile = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => resolve(reader.result), false);
            reader.readAsDataURL(file);
        });
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const generateImage = async () => {
        setLoading(true);
        try {
            const base64Image = await getCroppedImg(imageSrc, croppedAreaPixels, FRAME_URL);
            setFinalImage(base64Image);
            setImageSrc(null);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const downloadImage = () => {
        const link = document.createElement('a');
        link.download = `sanmartin-navidad-${Date.now()}.png`;
        link.href = finalImage;
        link.click();
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans antialiased">
            <Head title="Modo Navidad" />

            {/* Tarjeta Principal */}
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl overflow-hidden my-4 sm:my-8 max-h-[90vh] flex flex-col">

                {/* Encabezado Verde */}
                <div className="bg-christmas py-6 px-6 text-center relative overflow-hidden flex-shrink-0">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/images/bg-pattern.png')] bg-repeat mix-blend-overlay"></div>

                    <div className="flex justify-center items-center gap-smd-16">
                        <img src={logo} alt="Logo" className="h-12 sm:h-14 mb-3 relative z-10" />
                        <img src={logoNavidad} alt="Logo" className="h-12 sm:h-14 mb-3 relative border-l pl-smd-16 z-10" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 relative z-10 flex items-center justify-center gap-2">
                        Modo Navidad <SparklesIcon className="h-6 w-6 sm:h-8 sm:w-8 text-amber-300" />
                    </h1>
                    <p className="text-christmas-light text-xs sm:text-sm relative z-10 font-medium">
                        Crea tu foto de perfil oficial.
                    </p>
                </div>

                {/* Cuerpo de la Tarjeta (Scrollable) */}
                <div className="p-6 sm:p-8 text-gray-700 overflow-y-auto custom-scrollbar">

                    {/* --- PASO 1: Subir Foto --- */}
                    {!imageSrc && !finalImage && (
                        <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 hover:bg-christmas-light/50 hover:border-christmas transition-all cursor-pointer relative group">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={onFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                            />
                            <div className="group-hover:scale-110 transition-transform duration-300 inline-block p-4 bg-white rounded-full shadow-sm mb-4">
                                <PhotoIcon className="w-12 h-12 text-christmas" />
                            </div>
                            <p className="font-bold text-xl text-gray-800">Sube tu foto aquí</p>
                            <p className="text-gray-500 mt-2 text-sm">Recomendamos una selfie o primer plano.</p>
                        </div>
                    )}

                    {/* --- PASO 2: Recortar Foto --- */}
                    {imageSrc && (
                        <div className="flex flex-col items-center animate-fade-in">
                            <p className="mb-4 text-gray-600 text-sm font-medium flex items-center gap-1 text-center">
                                <ArrowPathIcon className="h-4 w-4 animate-spin" /> Arrastra y haz zoom para ajustar tu cara en el círculo
                            </p>

                            {/* CONTENEDOR DEL CROPPER */}
                            {/* Limitamos el ancho máximo para que quepa en pantallas pequeñas */}
                            <div className="relative w-full max-w-[300px] sm:max-w-[350px] aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-inner border-4 border-christmas/20 mb-5 mx-auto">
                                <Cropper
                                    image={imageSrc}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={1}
                                    cropShape="round"
                                    showGrid={false}
                                    onCropChange={setCrop}
                                    onCropComplete={onCropComplete}
                                    onZoomChange={setZoom}
                                    objectFit="cover"
                                    minZoom={1}
                                    style={{
                                        containerStyle: {
                                            width: '100%',
                                            height: '100%',
                                        },
                                        mediaStyle: {
                                            maxWidth: 'none',
                                            maxHeight: 'none',
                                            width: 'auto',
                                            height: '100%',
                                            display: 'block'
                                        }
                                    }}
                                    // -------------------------------------------------------
                                />
                                {/* Overlay del Marco */}
                                <div className="absolute inset-0 pointer-events-none z-10">
                                    <img src={FRAME_URL} className="w-full h-full object-cover" alt="Marco Guía" />
                                </div>
                            </div>

                            {/* Control de Zoom */}
                            <div className="w-full max-w-[300px] sm:max-w-[350px] mb-8 flex items-center gap-4 px-2">
                                <span className="text-xs font-bold uppercase text-gray-500">Zoom</span>
                                <input
                                    type="range"
                                    value={zoom}
                                    min={1}
                                    max={3}
                                    step={0.01}
                                    onChange={(e) => setZoom(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-christmas"
                                />
                            </div>

                            <div className="flex flex-col-reverse sm:flex-row gap-3 w-full max-w-[400px]">
                                <button
                                    onClick={() => setImageSrc(null)}
                                    className="flex-1 py-3.5 rounded-xl border-2 border-gray-300 text-gray-600 font-bold text-sm hover:bg-gray-50 transition"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={generateImage}
                                    disabled={loading}
                                    className="flex-1 py-3.5 rounded-xl bg-christmas text-white font-bold text-sm shadow-md hover:bg-christmas-dark hover:shadow-lg transition-all disabled:opacity-50 flex justify-center items-center gap-2"
                                >
                                    {loading ? (
                                        <><ArrowPathIcon className="h-5 w-5 animate-spin"/> Procesando...</>
                                    ) : (
                                        <><SparklesIcon className="h-5 w-5 text-amber-300"/> ¡Crear Imagen!</>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* --- PASO 3: Descargar --- */}
                    {finalImage && (
                        <div className="text-center animate-fade-in">
                            <h3 className="text-2xl font-bold mb-2 text-gray-800">¡Resultado espectacular!</h3>
                            <p className="text-gray-600 mb-6 text-sm">Ya puedes guardar y compartir tu espíritu navideño.</p>

                            <div className="relative w-full max-w-[300px] sm:max-w-[350px] mx-auto aspect-square rounded-2xl overflow-hidden shadow-2xl mb-8 bg-gray-50">
                                <img src={finalImage} alt="Resultado Navideño" className="w-full h-full object-contain" />
                            </div>

                            <button
                                onClick={downloadImage}
                                className="w-full max-w-[400px] mx-auto py-4 rounded-xl bg-christmas text-white font-bold text-lg shadow-lg hover:bg-christmas-dark hover:shadow-xl transition flex items-center justify-center gap-3 animate-bounce"
                            >
                                <ArrowDownTrayIcon className="w-6 h-6" />
                                Descargar Imagen
                            </button>

                            <button
                                onClick={() => { setFinalImage(null); setImageSrc(null); }}
                                className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-gray-500 hover:text-christmas transition w-full"
                            >
                                <ArrowPathIcon className="w-4 h-4" />
                                Probar con otra foto
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <footer className="mt-4 text-gray-500 text-sm text-center font-medium">
                San Martín es tu Destino © {new Date().getFullYear()}
            </footer>
        </div>
    );
}

Index.layout = page => <MainLayout children={page} title="Hotel:" />;
