import mongoose from "mongoose";
const BlogSchema=new mongoose.Schema({
    title:{type:String,required:true},
    subTitle:{type:String},
    description:{type:String,required:true},
    category:{type:String,required:true},
    image:{type:String,required:true},
    isPublished:{type:Boolean,required:true}
},{timestamps:true});
const Blog=mongoose.model('blog',BlogSchema);
export default Blog