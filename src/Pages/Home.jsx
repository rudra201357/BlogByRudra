import { useEffect, useState } from
    "react";
import service from "../appwrite/appWriteConfig";
import { Container, PostCard } from "../components";


export default function Home() {

    const [posts, setPosts] = useState([])
    useEffect(() => {
        service.listPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    return (
        <div className="w-full py-12 sm:py-20">
            <Container>
                <section className="mb-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                    <div>
                        <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-orange-600">Notes from the everyday</p>
                        <h1 className="max-w-3xl text-5xl font-bold leading-[0.98] tracking-tight text-slate-950 sm:text-7xl">Ideas worth keeping close.</h1>
                    </div>
                    <p className="max-w-sm text-lg leading-relaxed text-slate-500 lg:justify-self-end">A quiet corner for stories, observations, and the useful things we learn while making a life.</p>
                </section>
                <div className="mb-5 flex items-center justify-between border-b border-slate-300 pb-4">
                    <h2 className="text-xl font-bold text-slate-900">Latest writing</h2>
                    <span className="text-sm font-medium text-slate-500">{posts.length} {posts.length === 1 ? "story" : "stories"}</span>
                </div>
                {posts.length ? (
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post)=>(
                    <div key={post.$id}>
                 <PostCard {...post} />
                 </div>
            ))}
            </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-20 text-center">
                        <p className="text-lg font-semibold text-slate-700">No stories published yet.</p>
                        <p className="mt-2 text-slate-500">The first note is waiting to be written.</p>
                    </div>
                )}
            </Container>
        </div>
    )

}
