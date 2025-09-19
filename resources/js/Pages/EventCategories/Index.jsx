import MainLayout from "@/Layouts/MainLayout.jsx";

export default function Index({event_categories}) {
    return(
        <MainLayout>
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
