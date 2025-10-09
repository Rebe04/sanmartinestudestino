import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import loginImage from "@/assets/images/login-image.webp";
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";
import React from "react";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <Head title="Restablecer mi Contraseña" />

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
                                No te preocupes, pordémos ayudarte
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- Columna Derecha (Formulario) --- */}
                <div className="w-full lg:w-1/2 p-8 sm:p-12">

                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Contraseña" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                isFocused={true}
                                onChange={(e) => setData('password', e.target.value)}
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirma la Contraseña"
                            />

                            <TextInput
                                type="password"
                                id="password_confirmation"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData('password_confirmation', e.target.value)
                                }
                            />

                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4 flex items-center justify-end">
                            <PrimaryButton className="w-full text-center justify-center bg-smd-soft-green hover:bg-smd-yellow" disabled={processing}>
                                Restablecer la Contraseña
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
