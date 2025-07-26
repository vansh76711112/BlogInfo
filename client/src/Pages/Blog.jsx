  import React, { useEffect, useState } from 'react';
  import { useParams } from 'react-router-dom';
  import { assets } from '../assets/assets';
  import Navbar from '../Components/Navbar';
  import Moment from 'moment';
  import Footer from '../Components/Footer';
  import Loading from '../Components/Loading';
  import toast from 'react-hot-toast';
  import { useAppContext } from '../context/AppContext';

  function Blog() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [comments, setComment] = useState([]);
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const { axios } = useAppContext();

    // ✅ FIXED: async + await + backticks
    const fetchBlogData = async () => {
      try {
        const { data } = await axios.get(`/api/blogs/${id}`);
        data.success ? setData(data.blog) : toast.error(data.message);
      } catch (error) {
        toast.error(error.message);
      }
    };

    // ✅ FIXED: correct route + method + setComment
    const fetchComment = async () => {
      try {
        const { data } = await axios.post('/api/blogs/comments', { blogId: id });
        data.success ? setComment(data.comments) : toast.error(data.message);
      } catch (error) {
        toast.error(error.message);
      }
    };

    // ✅ FIXED: route name and payload keys
    const addComment = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post('/api/blogs/add-comment', {
          blog: id,
          name,
          content,
        });

        if (data.success) {
          toast.success(data.message);
          setName('');
          setContent('');
          fetchComment(); // refresh comment list after add
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error(err.message);
      }
    };

    useEffect(() => {
      fetchBlogData();
      fetchComment();
    }, [id]);

    return data ? (
      <div className='relative'>
        <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-50' />
        <Navbar />
        <div className='text-center mt-20 text-gray-600'>
          <p className='text-primary py-4 font-medium'>
            Published on - {Moment(data.createdAt).format('MMMM Do, YYYY')}
          </p>
          <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto  text-gray-800'>{data.title}</h1>
          <h2 className='my-5 max-w-lg truncate mx-auto '>{data.subTitle}</h2>
          <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-blue-500/35 bg-blue-500/5 font-medium text-primary">
            William Shakespeare
          </p>
        </div>

        <div className='mx-5 max-w-5xl md:5xl md:mx-auto my-10 mt-6'>
          <img src={data.image} alt="" className='rounded-3xl mb-5' />
          <div className='rich-text max-w-3xl mx-auto' dangerouslySetInnerHTML={{ __html: data.description }}></div>

          {/* Comments */}
          <div className="mt-14 mb-10 max-w-3xl mx-auto">
            <p>Comments ({comments.length})</p>
            <div className="flex flex-col gap-4">
              {comments.map((item, index) => (
                <div key={index} className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <img src={assets.user_icon} alt="" className="w-6" />
                    <p className="font-medium">{item.name}</p>
                  </div>
                  <p className="text-sm max-w-md ml-8">{item.content}</p>
                  <div className='absolute right-4 bottom-3 flex items-center gap-4 text-xs'>
                    {Moment(item.createdAt).format('MMMM Do, YYYY')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Comment */}
          <div className="max-w-3xl mx-auto">
            <p className="font-semibold mb-4">Add your comment</p>
            <form onSubmit={addComment} className="flex flex-col items-start gap-4 max-w-lg">
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Name"
                required
                className="w-full p-2 border border-gray-300 rounded outline-none"
              />
              <textarea
                onChange={(e) => setContent(e.target.value)}
                value={content}
                placeholder="Comment"
                className="w-full p-2 border border-gray-300 rounded outline-none h-48"
                required
              ></textarea>
              <button type="submit" className="bg-blue-600 text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer">
                Submit
              </button>
            </form>
          </div>

          {/* Share Section */}
          <div className='mx-auto max-w-3xl my-24'>
            <p className='font-semibold my-6'>Share this article on social media</p>
            <div className='flex'>
              <img src={assets.facebook_icon} width={50} alt="" />
              <img src={assets.twitter_icon} width={50} alt="" />
              <img src={assets.googleplus_icon} width={50} alt="" />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    ) : (
      <Loading />
    );
  }

  export default Blog;
