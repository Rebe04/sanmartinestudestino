import MainLayout from "@/Layouts/MainLayout.jsx";

export default function Index({posts}) {
    return(
        <MainLayout>
            <div className="min-h-screen">
                <h1>Lista de Posts</h1>
                <ul>
                    {posts.data.map(post => (
                        <li key={post.id}>{post.name}</li>
                    ))}
                </ul>
            </div>
        </MainLayout>
    )
}
