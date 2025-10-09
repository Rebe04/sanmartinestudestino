import React, { useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";

// Usemos otra imagen para variar
import registerImage from '@/assets/images/routes/cascada.webp';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <Head title="Register" />

            <div className="w-full max-w-4xl lg:max-w-5xl bg-white sm-container shadow-2xl rounded-2xl flex overflow-hidden">
                {/* --- Columna Izquierda (Imagen) --- */}
                <div
                    className="hidden lg:block w-1/2 bg-cover bg-center"
                    style={{ backgroundImage: `url(${registerImage})` }}
                >
                    <div className="w-full h-full bg-smd-dark/50 p-12 flex flex-col justify-between">
                        <div>
                            <ApplicationLogo white={true} className="w-32" />
                        </div>
                        <div>
                            <h1 className="text-white text-4xl font-bold">
                                Únete a la Aventura
                            </h1>
                            <p className="text-white/80 mt-2">
                                Crea tu cuenta para empezar a gestionar y explorar el contenido de San Martín.
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- Columna Derecha (Formulario) --- */}
                <div className="w-full lg:w-1/2 p-8 sm:p-12">
                    <h2 className="text-2xl font-bold text-smd-dark mb-2">Crear una Cuenta</h2>
                    <p className="text-smd-gray-text mb-6">Completa tus datos para registrarte.</p>

                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="name" value="Nombre" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="email" value="Correo Electrónico" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
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
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password_confirmation" value="Confirmar Contraseña" />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <div className="flex flex-col items-center mt-6">
                            <PrimaryButton className="w-full text-center justify-center bg-smd-soft-green hover:bg-smd-yellow" disabled={processing}>
                                Registrarse
                            </PrimaryButton>

                            <Link
                                href={route('login')}
                                className="mt-4 underline text-sm text-gray-600 hover:text-gray-900"
                            >
                                ¿Ya tienes una cuenta? Inicia Sesión
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
