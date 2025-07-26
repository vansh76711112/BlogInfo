import React from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Dashboard from '../Pages/admin/Dashboard';
const Navbar = () => {
   const {navigate,token}=useAppContext();
  return (
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-16 xl:mx-32 '>
      <img src={assets.logo} onClick={()=>navigate('/')} alt="logo" className='w-32 sm:w-44 cursor-pointer'/>
     
      <button onClick={()=>navigate('/admin')} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-blue-600 text-white px-10 py-2.5'>
       {token?'Dashboard':'login'}
        <img src={assets.arrow} className='w-3' alt="arrow" />
      </button>
    </div > 
  )
}

export default Navbar
