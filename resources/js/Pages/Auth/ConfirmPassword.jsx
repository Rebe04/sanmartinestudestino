import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import loginImage from "@/assets/images/login-image.webp";
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";
import Checkbox from "@/Components/Checkbox.jsx";
import React from "react";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <Head title="Confirma tu contraseña" />

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
                                Bienvenido
                            </h1>
                            <p className="text-white/80 mt-2">
                                Administra todo el contenido de San Martín desde un solo lugar.
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- Columna Derecha (Formulario) --- */}
                <div className="w-full lg:w-1/2 p-8 sm:p-12">
                    <h2 className="text-2xl font-bold text-smd-dark mb-2">Iniciar Sesión</h2>
                    <p className="text-smd-gray-text mb-6">Ingresa tus credenciales para acceder al panel.</p>


                    <form onSubmit={submit}>
                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData('password', e.target.value)}
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mt-4 flex items-center justify-end">
                            <PrimaryButton className="w-full text-center justify-center bg-smd-soft-green hover:bg-smd-yellow" disabled={processing}>
                                Confirmar
                            </PrimaryButton>
                        </div>
                    </form>
                    <div className="mb-4 text-sm text-gray-600">
                        Esta es una área restringida de la aplicación. Por favor confirme su contraseña
                        anted de continuar
                    </div>
                </div>
            </div>
        </div>
    );
}
