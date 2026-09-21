
import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login,logout } from './store/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {

const [loading,setLoading]= useState(true)
const dispatch = useDispatch()
useEffect(()=>{
  authService.getCurrentUser()
  .then((userData)=>{
    if(userData){
      dispatch(login({userData}))
    }
    else {
      dispatch(logout())
}
  })
  .finally(() => setLoading(false))
}, [dispatch])

  return !loading ? (

  <div className='app-shell relative min-h-screen overflow-hidden'>
  <div className='page-texture pointer-events-none fixed inset-0' />
  <div className='relative z-10 flex min-h-screen w-full flex-col'>
    <Header/>
    <main className='flex-1'>
      <Outlet />
    </main>
    <Footer/>
  </div>
  </div>

): <div className='min-h-screen bg-[#f7f3ed] flex justify-center items-center'>
  <div className='text-sm font-semibold uppercase tracking-[0.25em] text-orange-600'>Loading your journal...</div>
</div>
}

export default App
