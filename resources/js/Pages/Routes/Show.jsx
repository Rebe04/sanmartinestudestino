import MainLayout from "@/Layouts/MainLayout.jsx";
import React from "react";
import {Head} from "@inertiajs/react";

export default function Show({route}) {
    return(
        <>
            <Head title={`Ruta: ${route.name}`} />
            <div>
                <h1>Lista de Eventos</h1>
                {JSON.stringify(route, null, 2)}
            </div>
        </>
    )
}

Show.layout = page => <MainLayout children={page} title="Ruta:" />;
