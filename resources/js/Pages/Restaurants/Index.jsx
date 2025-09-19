import MainLayout from "@/Layouts/MainLayout.jsx";

export default function Index({restaurants}) {
    return(
        <MainLayout>
            <div>
                <h1>Lista de Eventos</h1>
                <ul>
                    {restaurants.data.map(restaurant => (
                        <li key={restaurant.id}>{restaurant.name}</li>
                    ))}
                </ul>
            </div>
        </MainLayout>
    )
}
