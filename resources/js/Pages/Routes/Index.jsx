import MainLayout from "@/Layouts/MainLayout.jsx";

export default function Index({routes}) {
    return(
        <MainLayout>
            <div>
                <h1>Lista de Eventos</h1>
                <ul>
                    {routes.data.map(route => (
                        <li key={route.id}>{route.name}</li>
                    ))}
                </ul>
            </div>
        </MainLayout>
    )
}
