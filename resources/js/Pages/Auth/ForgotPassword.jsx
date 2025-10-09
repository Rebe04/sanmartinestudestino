import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import loginImage from "@/assets/images/login-image.webp";
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import React from "react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <Head title="Olvidé mi Contraseña" />

            <div className="w-full max-w-4xl lg:max-w-5xl bg-white sm-container shadow-2xl rounded-2xl flex overflow-hidden">
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
                                ¿Olvidaste tu Contraseña?
                            </h1>
                            <p className="text-white/80 mt-2">
                                No te preocupes, ¡pordémos ayudarte!
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- Columna Derecha (Formulario) --- */}
                <div className="w-full lg:w-1/2 p-8 sm:p-12">

                    <div className="mb-4 text-sm text-gray-600">
                        ¿Olvidaste tu contraseña? No hay problema. Solo déjanos tu dirección de
                        email y te enviarémos un mensaje con un link para que puedas restablecer
                        tu contraseña y elegir una nueva.
                    </div>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />

                        <div className="mt-4 flex items-center justify-end">
                            <PrimaryButton className="text-center justify-center bg-smd-soft-green hover:bg-smd-yellow" disabled={processing}>
                                Enviar Link de Restablecimiento
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
