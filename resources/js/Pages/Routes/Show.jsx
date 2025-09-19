import MainLayout from "@/Layouts/MainLayout.jsx";

export default function Index({route}) {
    return(
        <MainLayout>
            <div>
                <h1>Lista de Eventos</h1>
                {JSON.stringify(route, null, 2)}
            </div>
        </MainLayout>
    )
}
