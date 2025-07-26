import express from "express"
import { adminLogin, approvedComment, deleteCommentById, getallBlogsAdmin, getAllComments, getDashboard } from "../controller/adminController.js" 
import auth from "../middleware/auth.js";
const adminRouter=express.Router()
adminRouter.post('/login',adminLogin);
adminRouter.get('/comments',getAllComments)
adminRouter.get('/blogs',auth,getallBlogsAdmin)
adminRouter.get('/dashboard',getDashboard)
adminRouter.post('/delete-comment',auth,deleteCommentById)
adminRouter.post('/approve-comment',auth,approvedComment)
export default adminRouter;