
import { LogoutBtn, Container, Logo } from "../index"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

function Header(){
const authStatus = useSelector((state)=>
    state.auth.status)
const navigate= useNavigate()
const navItems = [
    {
        name: 'Home',
        slug: '/',
        active: true,
    },
    {
        name: 'Login',
        slug: '/login',
        active: !authStatus,
    },
    {
        name: 'Signup',
        slug: '/signup',
        active: !authStatus,
    },
    {
        name: 'Add Post',
        slug: '/add-post',
        active: authStatus,
    },
    {
        name: 'All Posts',
        slug: '/all-posts',
        active: authStatus,
    },
]

    return (
     <header className="border-b border-slate-200/80 bg-[#f7f3ed]/90 py-4 backdrop-blur-md"> 
     <Container>
        <nav className="flex items-center gap-6">
            <div className="mr-auto">
               <Link to="/">
                    <Logo width="70px"/>
                </Link>
            </div>
            <ul className="flex items-center gap-1">
        {navItems.map((item)=> 
        item.active? <li key={item.name}><button
        onClick={()=>{navigate(item.slug)}}
        className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
        >{item.name}</button></li> : null
        )}
    {authStatus &&(<li><LogoutBtn/></li>)}
            </ul>
        </nav>
     </Container>
     
     </header>


    )
}
export default Header
