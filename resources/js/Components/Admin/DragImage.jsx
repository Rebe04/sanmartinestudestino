import React, {useState} from "react";

export default function DragImage({setData, errors, imagePreviewData}) {
    const [dragActive, setDragActive] = useState(false);
    const inputRef = React.useRef(null);
    const [imagePreview, setImagePreview] = useState(imagePreviewData);

    // Manejo del evento de arrastrar un archivo sobre el área
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // Manejo del evento de soltar el archivo
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    // Manejo del cambio desde el input de archivo
    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    // Función central para procesar el archivo
    const handleFile = (file) => {
        // Validación simple en el frontend
        if (file.type !== 'image/webp') {
            alert('Por favor, sube solo imágenes en formato WEBP.');
            return;
        }
        if (file.size > 1024 * 1024) { // 1MB
            alert('La imagen no puede pesar más de 1MB.');
            return;
        }
        setData('image', file);
        setImagePreview(URL.createObjectURL(file));
    };

    // Abrir el selector de archivos al hacer clic en el botón
    const onButtonClick = () => {
        inputRef.current.click();
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">Imagen Destacada</label>
            <div
                className={`mt-1 h-64 border-2 border-dashed rounded-md flex flex-col justify-center items-center text-center ${dragActive ? "border-smd-soft-green bg-green-50" : "border-gray-300"}`}
                onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
            >
                <input ref={inputRef} type="file" accept="image/webp" className="hidden" onChange={handleChange} />
                {imagePreview ? (
                    <img src={imagePreview} alt="Vista previa" className="h-full w-full object-contain p-2"/>
                ) : (
                    <div>
                        <p className="text-gray-500">Arrastra y suelta tu imagen aquí</p>
                        <p className="text-sm text-gray-400 my-2">o</p>
                        <button type="button" onClick={onButtonClick} className="px-4 py-2 bg-gray-200 rounded-md text-sm font-semibold hover:bg-gray-300">
                            Seleccionar Archivo
                        </button>
                        <p className="text-xs text-gray-400 mt-2">WEBP de menos de 1MB</p>
                    </div>
                )}
            </div>
            {errors.image && <p className="text-sm text-red-600 mt-1">{errors.image}</p>}
        </div>
    )
}
