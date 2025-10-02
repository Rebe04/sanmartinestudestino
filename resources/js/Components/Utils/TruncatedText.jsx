import React, { useState } from 'react';

// Props:
// - text: El texto completo que quieres mostrar.
// - maxLength: El número de caracteres a mostrar antes de truncar.
export default function TruncatedText({ text, maxLength = 150 }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Si el texto es más corto que el máximo, simplemente lo mostramos completo.
    if (text.length <= maxLength) {
        return <p>{text}</p>;
    }


    return (
        <div>
            <p>
                {text.substring(0, maxLength)}...
            </p>
        </div>
    );
}
