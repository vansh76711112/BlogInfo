    import express from "express"
    import { addBlog, addComment, deleteByID, generateContent, getBLog, getBLogByID, getBlogComments, togglePublish } from "../controller/blogController.js"
    import multer from "multer";
    import upload from "../middleware/multer.js"
    import auth from "../middleware/auth.js";
    const blogRouter=express.Router();
    //const upload=multer();
    blogRouter.post("/add",upload.single('image'),auth,addBlog);
    blogRouter.get('/all',getBLog);
    blogRouter.post('/delete',auth,deleteByID)  
    blogRouter.get('/:blogId',getBLogByID);
    blogRouter.post('/toggle-publish',auth,togglePublish)
    blogRouter.post('/add-comment',addComment);
    blogRouter.post('/comments',getBlogComments)
    blogRouter.post('/generate',auth,generateContent)

    export default blogRouter;
        