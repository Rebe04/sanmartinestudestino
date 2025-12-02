export const createImage = (url) =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.setAttribute('crossOrigin', 'anonymous');
        image.src = url;
    });

export async function getCroppedImg(imageSrc, pixelCrop, frameSrc) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // --- CAMBIO CLAVE: TAMAÑO DEL CANVAS ---
    // Usamos el tamaño original del marco (2250px) para máxima calidad
    const size = 2250;

    canvas.width = size;
    canvas.height = size;

    // Opcional: Suavizado de imagen para mejorar calidad al escalar
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // 1. Dibujar la imagen del usuario recortada
    // Mapeamos el recorte (pixelCrop) al tamaño total del canvas (size)
    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        size,
        size
    );

    // 2. Dibujar el Marco (Frame) encima
    if (frameSrc) {
        const frame = await createImage(frameSrc);
        // El marco se dibuja ocupando todo el canvas (2250x2250)
        ctx.drawImage(frame, 0, 0, size, size);
    }

    // 3. Retornar con calidad máxima (1.0)
    return canvas.toDataURL('image/png', 1.0);
}
