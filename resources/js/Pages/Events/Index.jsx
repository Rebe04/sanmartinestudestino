import MainLayout from "@/Layouts/MainLayout.jsx";
import {Head} from "@inertiajs/react";

export default function Index({events}) {
    return(
        <MainLayout>
            <Head title="Eventos" />
            <div className="min-h-screen">
                <h1>Lista de Eventos</h1>
                <ul>
                    {events?.data.map(event => (
                        <li key={event.id}>{event.name}</li>
                    ))}
                </ul>
            </div>
        </MainLayout>
    )
}
