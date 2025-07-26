  import React from 'react';
  import { assets } from '../assets/assets';
  import { useAppContext } from '../context/AppContext';
  import { toast } from 'react-hot-toast'; // ✅ Import toast

  const BlogTableItem = ({ blog, fetchBlogs, index }) => {
    const { title, createdAt, _id, isPublished } = blog;
    const BlogDate = new Date(createdAt);
    const { axios } = useAppContext();

    // ✅ Deleting the blog
    const deleteBlog = async () => {
      const confirm = window.confirm('Are you sure you want to delete the blog?');
      if (!confirm) return;

      try {
        const { data } = await axios.post('/api/blogs/delete', { id: _id });
        if (data.success) {
          toast.success(data.message);
          await fetchBlogs();
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error(err.message);
      }
    };

    // ✅ Toggling publish status
  const togglePublish = async () => {
    try {
      const token = localStorage.getItem("token"); // ✅ Get token

      const { data } = await axios.post(
        '/api/blogs/toggle-publish',
        { id: blog._id },
      );

      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

    return (
      <tr className="border-y border-gray-300">
        <th className="px-2 py-4">{index}</th>
        <td className="px-2 py-4">{title}</td>
        <td className="px-2 py-4 max-sm:hidden">{BlogDate.toDateString()}</td>
        <td className="px-2 py-4 max-sm:hidden">
          <p className={`${isPublished ? 'text-green-600' : 'text-orange-700'}`}>
            {isPublished ? 'Published' : 'Unpublished'}
          </p>
        </td>
        <td className="px-2 py-4 flex text-xs gap-3">
          <button
            onClick={togglePublish}
            className="border rounded mt-1 py-0.5 px-2 cursor-pointer"
          >
            {isPublished ? 'Unpublish' : 'Publish'}
          </button>
          <img
            onClick={deleteBlog}
            src={assets.cross_icon}
            alt="delete"
            className="w-8 hover:scale-110 transition-transform cursor-pointer"
          />
        </td>
      </tr>
    );
  };

  export default BlogTableItem;
