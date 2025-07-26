import React, { useEffect, useState } from 'react';
import BlogTableItem from '../../Components/BlogtableData';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ListBlog = () => {
  const [blogList, setBlogList] = useState([]);
  const { axios } = useAppContext();

  // ✅ Function to fetch blogs
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('/api/blogs/all'); // Use the correct route
      if (data.success) {
        setBlogList(data.blogs);
        console.log("✅ Admin blogs fetched:", data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Fetch error:", error.message);
    }
  };

  // ✅ Call fetchBlogs on component load
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      <h1 className='text-xl font-semibold mb-4'>All Blogs</h1>

      <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-gray-600 text-left uppercase'>
            <tr>
              <th className='px-2 py-4 xl:px-6'>#</th>
              <th className='px-2 py-4'>Blog Title</th>
              <th className='px-2 py-4 max-sm:hidden'>Date</th>
              <th className='px-2 py-4 max-sm:hidden'>Status</th>
              <th className='px-2 py-4'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogList.length > 0 ? (
              blogList.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchBlogs}
                  index={index + 1}
                  
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6">No blogs available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBlog;
``