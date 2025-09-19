import MainLayout from "@/Layouts/MainLayout.jsx";

export default function Index({postCategories}) {
    return(
        <MainLayout>
            <div className="min-h-screen">
                <h1>Lista de Posts</h1>
                <ul>
                    {postCategories.data.map(postCategory => (
                        <li key={postCategory.id}>{postCategory.name}</li>
                    ))}
                </ul>
            </div>
        </MainLayout>
    )
}
