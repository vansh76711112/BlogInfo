import imagekit from "../config/imageKit.js";
import Blog from "../model/Blog.js";
import Comment from "../model/comment.js"; // Required for comment deletion
import main from "../config/gemini.js";
import fs from "fs"; // Import the main function for content generation
// ADD BLOG
export const addBlog = async (req, res) => {


  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
    const imageFile = req.file;//yha kiya chage
    console.log("🖼️ Uploaded file:", req.file);

    if (!title || !description || !imageFile || !category) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    //const fileBuffer = imageFile.buffer;
    const fileBuffer=fs.readFileSync(imageFile.path)

    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs"
    });

    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" }
      ]
    });

    const image = optimizedImageUrl;

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished
    });

    res.json({ success: true, message: "Blog was added" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Blog was not added" });
  }
};
// GET ALL BLOGS (Only Published)
export const getBLog = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET BLOG BY ID
export const getBLogByID = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.json({ success: false, message: "Blog Not Found" });
    }
    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// DELETE BLOG
export const deleteByID = async (req, res) => {
  try {
    const { id } = req.body;
    await Blog.findByIdAndDelete(id);
    await Comment.deleteMany({ blog: id });

    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
// TOGGLE PUBLISH STATUS
export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.json({ success: true, message: "Blog status updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
// ADD COMMENT
export const addComment = async (req, res) => {
  
  try {
   // console.log("the comment has added")
    const { blog, name, content } = req.body;
    console.log(req.body);
    await Comment.create({ blog, name, content });
    res.json({ success: true, message: "Comment added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
// GET COMMENTS
export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;
    const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 });

    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
//blogController.js to handle content generation
export const generateContent= async(req,res)=>{ 
  try{
    const { prompt } = req.body;
    console.log("Prompt received:", prompt) // 👈 Add this
  const content = await main(prompt + 'Generate the blog content for this topic in simple text format.')
  res.json({ success: true, content })
  console.log("Generated content:", content) // 👈 Add this
}


catch (error) {
res.json({ success: false, message: error.message });
}
}