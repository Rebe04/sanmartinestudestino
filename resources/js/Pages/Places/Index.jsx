import MainLayout from "@/Layouts/MainLayout.jsx";

export default function Index({places}) {
    return(
        <MainLayout>
            <div className="min-h-screen">
                <h1>Lista de Lugares</h1>
                <ul>
                    {places.data.map(place => (
                        <li key={place.id}>{place.name}</li>
                    ))}
                </ul>
            </div>
        </MainLayout>
    )
}
