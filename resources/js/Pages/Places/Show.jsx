import MainLayout from "@/Layouts/MainLayout.jsx";

export default function Index({place}) {
    return(
        <MainLayout>
            <div>
                <h1>Lista de Eventos</h1>
                {JSON.stringify(place, null, 2)}
            </div>
        </MainLayout>
    )
}
