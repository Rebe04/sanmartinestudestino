import {Link} from "@inertiajs/react";
import SocialIcon from "@/Components/SocialIcon.jsx";

export default function SideBar({categories, relatedPosts = [] }) {
    return (
        <aside>
            {categories.length > 0 && (
                <div className="bg-gray-200/80 rounded-xl mx-smd-24 lg:mx-0 p-smd-32 mb-smd-32">
                    <h2 className="text-2xl text-center lg:text-left font-second font-bold text-smd-dark mb-smd-16">Categorías de Posts</h2>
                    <ul>
                        {categories.map((postCategory, index) => (
                            <li className="bg-smd-light p-smd-16 cursor pointer mt-smd-8 rounded-lg text-center lg:text-left hover:bg-smd-yellow hover:text-smd-light" key={index}>
                                <Link href={route('post_categories.show', postCategory)}>
                                    {postCategory.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {relatedPosts.length > 0 && (
                <div className="bg-gray-200/80 rounded-xl mb-smd-32 mx-smd-24 lg:mx-0 p-smd-32">
                    <h2 className="text-2xl font-second font-bold text-smd-dark">Posts Relacionados</h2>
                    <ul>
                        {relatedPosts.map((post, index) => (
                            <li className="p-smd-16 mt-smd-8 rounded-lg group" key={index}>
                                <Link className="flex group items-center" href={route('posts.show', post)}>
                                    <div className="w-smd-184 h-smd-96 rounded-xl mr-smd-16 overflow-hidden">
                                        <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={post.image.url} alt={post.name}/>
                                    </div>
                                    <div>
                                        <h3 className="text-smd-dark text-xl font-second font-bold group-hover:text-smd-soft-green">
                                            {post.name}
                                        </h3>
                                        <p className="text-smd-soft-green group-hover:text-smd-yellow">
                                            {post.created_at_formatted}
                                        </p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="bg-gray-200/80 rounded-xl mx-smd-24 lg:mx-0 p-smd-32">
                <h2 className="text-2xl text-center lg:text-left font-second font-bold text-smd-dark mb-smd-16">Síguenos</h2>
                <div className="flex justify-start  items-center gap-smd-16">
                    <SocialIcon className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white border-2 border-green-500 transition-colors duration-300 hover:bg-green-500`} href="https://www.facebook.com/alcaldiasanmartindelosllanos">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-facebook" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" /></svg>
                    </SocialIcon>
                    <SocialIcon className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white border-2 border-green-500 transition-colors duration-300 hover:bg-green-500`} href="https://x.com/SanMartin_Meta">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-x" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
                    </SocialIcon>
                    <SocialIcon className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white border-2 border-green-500 transition-colors duration-300 hover:bg-green-500`} href="https://www.instagram.com/alcaldiasanmartindelosllanos/">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-instagram" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M16.5 7.5l0 .01" /></svg>
                    </SocialIcon>
                    <SocialIcon className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white border-2 border-green-500 transition-colors duration-300 hover:bg-green-500`} href="https://www.youtube.com/@AlcaldiadeSanMartindeLosLlanos">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-youtube" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z" />
                            <path d="M10 9l5 3l-5 3z" />
                        </svg>
                    </SocialIcon>
                </div>
            </div>

        </aside>
    )
}
