import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { Transition } from '@headlessui/react';

export default function Notification() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('success');

    useEffect(() => {
        if (flash.success || flash.error) {
            setMessage(flash.success || flash.error);
            setType(flash.success ? 'success' : 'error');
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, 5000);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [flash]);

    const isSuccess = type === 'success';
    const bgColor = isSuccess ? 'bg-green-500' : 'bg-red-500';
    const borderColor = isSuccess ? 'border-green-700' : 'border-red-700';
    const Icon = isSuccess ? CheckCircleIcon : XCircleIcon;

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
                <div className={`flex items-center ${bgColor} border-l-4 ${borderColor} text-white p-4 rounded-md shadow-lg`}>
                    <Icon className="h-6 w-6 mr-3" />
                    <div>
                        <p className="font-bold">{isSuccess ? '¡Éxito!' : 'Error'}</p>
                        <p>{message}</p>
                    </div>
                </div>
            </div>
        </Transition>
    );
}
