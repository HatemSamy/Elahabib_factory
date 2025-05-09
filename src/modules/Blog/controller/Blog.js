import { asynchandler } from '../../../services/errorHandling.js';
import BlogModel from '../../../../DB/model/Blog.model.js';
import cloudinary from "../../../services/cloudinary.js";
import { pagination } from '../../../middleware/pagination.js';


export const createBlog = asynchandler(async (req, res) => {
  const { title, author, content } = req.body;

  if (!title || !author || !content || !req.file) {
    return res.status(400).json({ message: 'الرجاء تعبئة جميع الحقول المطلوبة وإرفاق صورة' });
  }

  const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
    folder: 'Elabib-Factory/Blogs',
  });

  const newBlog = new BlogModel({
    title,
    author,
    image: secure_url,
    imagePublicId: public_id,
    content,
  });

  await newBlog.save();

  res.status(201).json({ message: 'تم إنشاء المقالة بنجاح', blog: newBlog });
});

  


export const getAllBlogs = asynchandler(async (req, res) => {
   const { page, size } = req.query;
    const { skip, limit } = pagination(page, size);
    const blogs = await BlogModel.find().sort({ date: -1 })
    .skip(skip)
    .limit(limit);;
  if (!blogs) {
    
   return next(Error('فشل في جلب المقالات',{cause:404}))

  }
  res.json({message:"All Blogs", blogs});
  
});

export const getBlogById = asynchandler(async (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Blog ID format" });
  }
    const blog = await BlogModel.findById(req.params.id);
    if (!blog) {
   return next(Error('المقالة غير موجودة',{cause:404}))

    }
     res.json({message:"Blog detials", blog});

});
