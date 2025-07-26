import React, { useRef, useState, useEffect } from 'react';
import { assets, blogCategories } from '../../assets/assets';
import Quill from 'quill';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { parse } from 'marked';
const AddBlog = () => {
  const editorref = useRef(null);
  const quillref = useRef(null);

  const { axios } = useAppContext();

  const [isAdding, setIsAdding] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [subtitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('Startup');
  const [isPublished, setIsPublished] = useState(false);
    const [loading, setLoading] = useState(false);


  const generatecontent = async () => {
    // Optional: implement OpenAI API integration for AI content
    if(!title){
      return toast.error("Please enter a title first");
    }
    try{
      setLoading(true);
      const {data}=await axios.post('/api/blogs/generate',{prompt:title})
      if(data.success){
        quillref.current.root.innerHTML = parse( data.content);
        toast.success("Content generated successfully");
      }
      else{
        toast.error(data.message);
      }
    }
    catch(err){
      toast.error(err.message)
    }
    finally{
      setLoading(false);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
      console.log("Form Submitted ✅"); // Add this


    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    try {
      setIsAdding(true);

      const blog = {
        title,
        subTitle: subtitle, // ✅ match schema
        category,
        isPublished,
        description: quillref.current.root.innerHTML,
      };

      const formData = new FormData();
      formData.append('blog', JSON.stringify(blog));
      formData.append('image', image);

      const { data } = await axios.post('/api/blogs/add', formData);

      if (data.success) {
        toast.success(data.message);
        setImage(null);
        setTitle('');
        setSubTitle('');
        setCategory('Startup');
        setIsPublished(false);
        quillref.current.root.innerHTML = '';
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (!quillref.current && editorref.current) {
      quillref.current = new Quill(editorref.current, { theme: 'snow' });
    }
  }, []);

  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>

        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img 
            src={!image ? assets.upload_area : URL.createObjectURL(image)} 
            alt="" 
            className='mt-2 h-16 rounded cursor-pointer' 
          />
          <input 
            onChange={(e) => setImage(e.target.files[0])}
            type="file" 
            id="image" 
            hidden 
            required 
          />
        </label>

        <p className="mt-4">Blog title</p>
        <input 
          type="text" 
          placeholder="Type here" 
          required 
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setTitle(e.target.value)} 
          value={title}
        />

        <p className="mt-4">SubBlog title</p>
        <input 
          type="text" 
          placeholder="Type here" 
          required 
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setSubTitle(e.target.value)} 
          value={subtitle}
        />

        <p className='mt-4'>Blog Description</p>
        <div className='max-w-lg pb-16 sm:pb-10 pt-2 relative h-80'>
          <div ref={editorref}></div>
          {loading &&(
            <div className='absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2'>
              <div className='w-8 h-8 rounded-full border-2 border-t-white animate-spin'></div>
            </div>
          ) }
          <button disabled={loading} type='button' onClick={generatecontent}
            className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'>
            Generate with AI
          </button>
        </div>

        <p className='mt-4'>Blog Category</p>
        <select onChange={e => setCategory(e.target.value)} name="category" className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'>
          <option value="">Select Category</option>
          {blogCategories.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>

        <div className='flex gap-2 mt-4 items-center'>
          <p>Publish Now</p>
          <input 
            type="checkbox" 
            checked={isPublished} 
            onChange={(e) => setIsPublished(e.target.checked)} 
            className='scale-125 cursor-pointer' 
          />
        </div>

        <button disabled={isAdding} type="submit" className='mt-8 w-40 h-10 bg-blue-700 text-white rounded cursor-pointer text-sm'>
          {isAdding ? 'Adding...' : 'Add Blog'}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
