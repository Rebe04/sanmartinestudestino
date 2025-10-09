import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import loginImage from "@/assets/images/login-image.webp";
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import React from "react";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <Head title="Verificar Correo" />

            <div className="w-full max-w-4xl lg:max-w-5xl bg-white sm-container shadow-2xl lg:min-h-smd-480 rounded-2xl flex overflow-hidden">
                {/* --- Columna Izquierda (Imagen) --- */}
                <div
                    className="hidden lg:block w-1/2 bg-cover bg-center"
                    style={{ backgroundImage: `url(${loginImage})` }}
                >
                    <div className="w-full h-full bg-smd-dark/50 p-12 flex flex-col justify-between">
                        <div>
                            <ApplicationLogo white={true} className="w-32" />
                        </div>
                        <div>
                            <h1 className="text-white text-4xl font-bold">
                                Estás a un Paso de Unirte a esta Aventura
                            </h1>
                            <p className="text-white/80 mt-2">
                                Necesitamos verificar tu cuenta de correo
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- Columna Derecha (Formulario) --- */}
                <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">

                    <div className="mb-4 text-sm text-gray-600">
                        ¡Gracias por registrarte! antes de empezar, Necesitamos verificar tu
                        dirección de correo. Haz click en el enlace y te enviarémos un
                        link de verificación. Si no lo recibiste, estarémos felices de enviarte
                        otro.
                    </div>

                    {status === 'verification-link-sent' && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            Un nuevo link de verificación ha sido enviado a la cuenta de correo
                            que nos diste durante el registro.
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div className="flex items-center justify-between mt-smd-32">
                            <PrimaryButton className="text-center justify-center bg-smd-soft-green hover:bg-smd-yellow" disabled={processing}>
                                Reenviar Email Verificación
                            </PrimaryButton>

                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Log Out
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
