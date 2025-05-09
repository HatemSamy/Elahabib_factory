import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  image: { type: String },
  imagePublicId:String,
  content: { type: String, required: true },
});

const BlogModel = mongoose.model('Blog', blogSchema);
export default BlogModel;
