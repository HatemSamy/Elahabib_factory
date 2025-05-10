import { asynchandler } from '../../../services/errorHandling.js';
import BlogModel from '../../../../DB/model/Blog.model.js';
import cloudinary from "../../../services/cloudinary.js";
import mongoose from 'mongoose';
import { pagination } from '../../../middleware/pagination.js';


export const createBlog = asynchandler(async (req, res, next) => {
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

  

export const getAllBlogs = asynchandler(async (req, res, next) => {
      const { page, size } = req.query;

    const { skip, limit } = pagination(page, size);
    const blogs = await BlogModel.find()
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit);
    
    // total count of all blogs
    const totalBlogs = await BlogModel.countDocuments();
    
    if (!blogs || blogs.length === 0) {
        return next(new Error('فشل في جلب المقالات', { cause: 404 }));
    }
    
    res.status(200).json({
        blogs,
        pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalBlogs / limit),
            totalBlogs: totalBlogs,
            blogsPerPage: parseInt(size)
        }
    });
});

export const getBlogById = asynchandler(async (req, res, next) => {
  const { BlogId } = req.params;
    const blog = await BlogModel.findOne({ _id: BlogId });
    if (!blog) {
        return next(Error('المقالة غير موجودة', { cause: 404 }));
    }
    res.json({ message: "Blog details", blog });
})
