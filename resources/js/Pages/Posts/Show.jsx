import MainLayout from "@/Layouts/MainLayout.jsx";

export default function Index({post}) {
    return(
        <MainLayout>
            <div>
                <h1>Post</h1>
                {JSON.stringify(post, null, 2)}
            </div>
        </MainLayout>
    )
}
