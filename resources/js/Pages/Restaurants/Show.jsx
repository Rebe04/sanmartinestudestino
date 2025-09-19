import MainLayout from "@/Layouts/MainLayout.jsx";

export default function Index({hotel}) {
    return(
        <MainLayout>
            <div>
                <h1>Lista de Eventos</h1>
                {JSON.stringify(hotel, null, 2)}
            </div>
        </MainLayout>
    )
}
