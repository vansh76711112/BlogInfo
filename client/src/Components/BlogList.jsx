import React, { useState } from 'react';
import { blogCategories } from '../assets/assets';
import BlogCard from './BlogCard';
import { useAppContext } from '../context/AppContext';

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();

  const filterBlog = () => {
    if (!input.trim()) return blogs;

    return blogs.filter((blog) =>
      blog.title.toLowerCase().includes(input.toLowerCase()) ||
      blog.category.toLowerCase().includes(input.toLowerCase())
    );
  };

  return (
    <div>
      {/* Category Menu */}
      <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>
        {blogCategories.map((item) => (
          <div key={item} className='relative'>
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer text-gray-500 transition-all duration-300 relative z-10 ${
                menu === item && 'text-white px-4 pt-0.5'
              }`}
            >
              {item}
              {menu === item && (
                <div className='absolute left-0 right-0 top-0 h-7 z-[-1] bg-blue-500'></div>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Blog Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
        {filterBlog()
          .filter((blog) => menu === "All" || blog.category === menu)
          .map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
      </div>
    </div>
  );
};
export default BlogList;
