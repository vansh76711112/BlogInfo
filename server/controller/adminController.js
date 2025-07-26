//the middleware which control sign up and password of admin login
import jwt from "jsonwebtoken"; //  Make sure this is at the top
import Blog from "../model/Blog.js";
import Comment from "../model/comment.js";
export const adminLogin = async (req, res) => {
  console.log("EMAIL:", process.env.ADMIN_EMAIL);
console.log("PASSWORD:", process.env.ADMIN_PASSWORD);
  try {
    const { email, password } = req.body;
    if (
      email !== process.env.ADMIN_EMAIL || 
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
//this is the place where the token is genrated
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.json({ success: true, token });
    
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
//api to get all blog
export const getallBlogsAdmin=async(req,res)=>{
  try{
    const blogs=await Blog.find({}).sort({createdAt:-1});
    res.json({success:true,blogs})
  }
  catch(err){
    res.json({ success: false, message: err.message });
  }
}
//api to get allcomment
export const getAllComments=async(req,res)=>{
  try{
    console.log("the comment is open")
    const comments=await Comment.find({}).populate("blog").sort({createdAt:-1});
    res.json({success:true,comments})
  }
  catch(err){
    res.json({ success: false, message: err.message });
  }
}
//api to get the dashboard data
export const getDashboard = async (req, res) => {
  try {
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5); // ✅ renamed to recentBlogs
    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments();
    const drafts = await Blog.countDocuments({ isPublished: false }); // ✅ spelling fix

    const dashboardData = { recentBlogs, blogs, comments, drafts }; // ✅ plural key name

    res.json({ success: true, dashboardData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
//admin delete the comment
export const deleteCommentById=async(req,res)=>{
  try{
    const {id}=req.body;
    await Comment.findByIdAndDelete(id);
    res.json({success:true,message:'the comment has been deleted'})
  }
  catch(error){
    res.json({ success: false, message: error.message });
  }
}


//admin allowance to approve the comment
export const approvedComment=async(req,res)=>{
  try{
    const {id}=req.body;
    await Comment.findByIdAndUpdate(id,{isApproved:true});
    res.json({success:true,message:'the comment has been approved'})
  }
  catch(error){
    res.json({ success: false, message: error.message });
  }
}











//the blog