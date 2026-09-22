// import {LogoutBtn} from '../index'
import {  Container, Logo } from "../index"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

function Header(){
const authStatus = useSelector((state)=>
    state.auth.status)
const navigate= useNavigate()
const [menuOpen, setMenuOpen] = useState(false)
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
    {
        name: 'Profile',
        slug: '/profile',
        active: authStatus,
    },
]

    const handleNavigate = (slug) => {
        navigate(slug)
        setMenuOpen(false)
    }

    return (
     <header className="border-b border-slate-200/80 bg-[#f7f3ed]/90 py-4 backdrop-blur-md"> 
     <Container>
        <nav className="relative flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="mr-auto">
               <Link to="/">
                    <Logo width="70px"/>
                </Link>
            </div>
            <button
                type="button"
                aria-expanded={menuOpen}
                aria-controls="site-navigation"
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                className="grid h-10 w-10 place-items-center rounded-lg border border-slate-300 text-xl text-slate-900 hover:bg-slate-900 hover:text-white sm:hidden"
                onClick={() => setMenuOpen((open) => !open)}
            >
                {menuOpen ? "×" : "☰"}
            </button>
            <ul id="site-navigation" className={`${menuOpen ? "flex" : "hidden"} w-full flex-col gap-1 border-t border-slate-200 pt-3 sm:flex sm:w-auto sm:flex-row sm:border-t-0 sm:pt-0`}>
        {navItems.map((item)=> 
        item.active? <li key={item.name}><button
        onClick={()=>handleNavigate(item.slug)}
        className="block w-full rounded-full px-5 py-3 text-left duration-200 hover:bg-blue-100 sm:w-auto sm:px-6 sm:py-2 sm:text-center"
        >{item.name}</button></li> : null
        )}

            </ul>
        </nav>
     </Container>
     
     </header>


    )
}
export default Header
