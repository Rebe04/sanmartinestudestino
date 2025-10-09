import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Transition } from '@headlessui/react';

export default function Notification() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Si hay un mensaje 'success' y no está visible, lo mostramos.
        if (flash.success && !visible) {
            setVisible(true);
            // Creamos un temporizador para ocultarlo después de 4 segundos.
            setTimeout(() => {
                setVisible(false);
            }, 4000);
        }
    }, [flash]); // Este efecto se ejecuta cada vez que 'flash' cambia.

    return (
        <Transition
            show={visible}
            enter="transition-transform duration-300 ease-out"
            enterFrom="translate-y-2 opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transition-transform duration-300 ease-in"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="translate-y-2 opacity-0"
        >
            <div className="fixed bottom-4 right-4 z-50">
                <div className="flex items-center bg-green-500 border-l-4 border-green-700 text-white p-4 rounded-md shadow-lg">
                    <CheckCircleIcon className="h-6 w-6 mr-3" />
                    <div>
                        <p className="font-bold">¡Éxito!</p>
                        <p>{flash.success}</p>
                    </div>
                </div>
            </div>
        </Transition>
    );
}
