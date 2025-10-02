import MainLayout from "@/Layouts/MainLayout.jsx";
import {Head} from "@inertiajs/react";

export default function Index({food_categories}) {
    return(
        <MainLayout>
            <Head title="Categorías de comida" />
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
