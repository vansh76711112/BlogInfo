// AppContext.js
import React, { createContext, useContext, useState,useEffect } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom"
import toast from 'react-hot-toast';

axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL;
// 1. Create the context
const AppContext = createContext();

// 2. Create the provider component
export const AppProvider = ({ children }) => {
    const navigate=useNavigate()

    const[token,setToken]=useState(null);
    const[blogs,setBlogs]=useState([]);
    const[input,setInput]=useState("");
    
      const value = {axios,navigate,token,setToken,blogs,setBlogs,input,setInput
      }

//fetching the data from the server
   const fetchBlogs = async () => {

  try {
    const { data } = await axios.get('/api/blogs/all');


    if (data.success) {
      setBlogs(data.blogs);
        console.log("✅ Blogs set in state:", data.blogs); // 👈 Add this too

    } else {
      // optional toast
      console.log("❌ Failed to fetch blogs:", data.message);

    }
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  fetchBlogs();  // Call API to fetch blogs when component loads

  const token = localStorage.getItem('token'); // Get token from local storage

  if (token) {
    setToken(token); // Save token to state (probably for showing user info)
    axios.defaults.headers.common['Authorization'] = `${token}`; // Attach token to all Axios requests
  }
}, []);



  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// 3. Custom hook to use context (optional, but makes it easier)
export const useAppContext = () => {
  return useContext(AppContext);
};
