import MainLayout from "@/Layouts/MainLayout.jsx";
import {Head} from "@inertiajs/react";

export default function Index({event_categories}) {
    return(
        <MainLayout>
            <Head title="Categorías de Eventos" />
            <div>
                <h1>Lista de Eventos</h1>
                <ul>
                    {event_categories.data.map(event_category => (
                        <li key={event_category.id}>{event_category.name}</li>
                    ))}
                </ul>
            </div>
        </MainLayout>
    )
}
