import MainLayout from "@/Layouts/MainLayout.jsx";

export default function Index({food_categories}) {
    return(
        <MainLayout>
            <div>
                <h1>Lista de Eventos</h1>
                <ul>
                    {food_categories.data.map(food_category => (
                        <li key={food_category.id}>{food_category.name}</li>
                    ))}
                </ul>
            </div>
        </MainLayout>
    )
}
