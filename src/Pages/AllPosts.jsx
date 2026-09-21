import service from "../appwrite/appWriteConfig";
import { useState,useEffect } from "react";
import { PostCard, Container } from "../components";

function AllPosts(){
    const [posts, setPosts]=useState([])
    useEffect(()=>{
          service.listPosts().then((posts)=>{
        if(posts){
            setPosts(posts.documents)
        }
    })
    },[])

  
    return(
        <div className="w-full py-12 sm:py-16">
        <Container>
            <div className="mb-10 flex items-end justify-between border-b border-slate-300 pb-5">
                <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-orange-600">The archive</p>
                    <h1 className="text-4xl font-bold tracking-tight text-slate-950">All stories</h1>
                </div>
                <span className="text-sm text-slate-500">{posts.length} published</span>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post)=>(
                    <div key={post.$id}>
                 <PostCard {...post} />
                 </div>
            ))}
            </div>
        </Container>
        </div>
    )
}
export default AllPosts
