import MainLayout from "@/Layouts/MainLayout.jsx";

export default function Index({hotels}) {
    return(
        <MainLayout>
            <div>
                <h1>Lista de Eventos</h1>
                <ul>
                    {hotels.data.map(hotel => (
                        <li key={hotel.id}>{hotel.name}</li>
                    ))}
                </ul>
            </div>
        </MainLayout>
    )
}
