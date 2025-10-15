import MainLayout from "@/Layouts/MainLayout.jsx";
import React from "react";

export default function Index({postCategories}) {
    return(
        <>
            <div className="min-h-screen">
                <h1>Lista de Posts</h1>
                <ul>
                    {postCategories.data.map(postCategory => (
                        <li key={postCategory.id}>{postCategory.name}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}
Index.layout = page => <MainLayout children={page} title="Categorías de Posts" />;
