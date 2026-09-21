import service from "../appwrite/appWriteConfig";
import { useState,useEffect } from "react";
import { PostForm, Container } from "../components";
import { useNavigate, useParams } from "react-router-dom";
 export default function EditPost(){
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug){
           service.getPost(slug).then((post)=>{
            if(post) setPost(post)
            else navigate("/")
           }) 
        }
        else{
            navigate("/")
        }
    },[slug, navigate])
    return post ? (
    <div className="py-8">
        <Container >
            <PostForm  post={post}/>
        </Container>

    </div>


):null;
}
