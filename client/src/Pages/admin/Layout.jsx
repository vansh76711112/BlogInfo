import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../Components/admin/Sidebar'
import Dashboard from './Dashboard'
import { useAppContext } from '../../context/AppContext'
import axios from 'axios'
const Layout = () => {
    const {axios,navigate,setToken}=useAppContext();
    const logout =()=>{
        localStorage.removeItem('token');
        axios.defaults.headers.common['Authorization'] = null;
        setToken(null); // Clear token in context
        navigate('/'); // Redirect to home page
    }
  return (
    < >
      <div className='flex justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>
        <img src={assets.logo} alt="" className='cursor-pointer w-32 sm:w-40' onClick={()=>navigate('/')}/>
        <button onClick={logout

        } className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-blue-600 text-white px-10 py-2.5'>Logout</button>
      </div>
      <div className='flex h-[calc(100vh-70px)]'>
        <Sidebar/>
        
        <Outlet/>
        
        
     </div>
    </>
  )
}

export default Layout
