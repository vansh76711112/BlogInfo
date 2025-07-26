import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Blog from './Pages/Blog';
import Layout from './Pages/admin/Layout';
import Login from './Components/admin/Login';
import Comment from './Pages/admin/Comment'; // ✅ Import Comment component
import Dashboard from './Pages/admin/Dashboard';
import AddBlog from './Pages/admin/Addblog';
import 'quill/dist/quill.snow.css'
import {Toaster} from "react-hot-toast"
// import { useContext } from '../context/AppContext';
import { useAppContext } from './context/AppContext';
import ListBlog from './Pages/admin/ListBlog';
function App() {
  // just a placeholder — use real auth logic
  const {token}=useAppContext();
  

  console.log("Token from context:", token);
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Blog/:id' element={<Blog />} />

        {/* Admin section */}
        <Route path='/admin' element={token ? <Layout /> : <Login />}>

          {/* ✅ Nested routes go here */}
          <Route index element={<Dashboard />} />
          {/* <Route path='DashBoard' element={<Dashboard />} /> */}
          <Route path='listBlog' element={<ListBlog />} />
            <Route path='addBlog' element={<AddBlog />} />
          <Route path='comments' element={<Comment />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
