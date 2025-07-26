import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { axios, setToken } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/admin/login', { email, password })
        console.log("LOGIN RESPONSE:", data); 
      if (data.success) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        axios.defaults.headers.common['Authorization'] = data.token;
        // navigate('/admin'); // ✅ redirect to dashboard
      } else {
        toast.error(data.message);
      }
    } catch (error) {
       console.error("LOGIN ERROR:", error); // 
      toast.error(error.message);
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-blue shadow-xl shadow-blue-400 rounded-lg'>
        <div className='flex flex-col items-center justify-center'>
          <div className='w-full py-6 text-center'>
            <h1 className='text-3xl font-bold'><span className='text-blue-700'>Admin </span>Login</h1>
            <p className='font-light'>Please enter your credentials to access the admin panel</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='flex-col flex'>
              <label>Email</label>
              <input type="email" required placeholder='email id'
                onChange={(e) => setEmail(e.target.value)}
                className='border-b-2 border-gray-300 p-2 outline-none mb-6' />
            </div>
            <div className='flex-col flex'>
              <label>Password</label>
              <input type="password"
                onChange={(e) => setPassword(e.target.value)}
                required placeholder='Enter your Password'
                className='border-b-2 border-gray-300 p-2 outline-none mb-6' />
            </div>
            <button type='submit' className='w-full py-3 font-medium bg-blue-700 text-white rounded cursor-pointer hover:bg-blue-700/90'>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
