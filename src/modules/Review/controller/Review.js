

import ReviewModel from '../../../../DB/model/Review.model.js';
import { asynchandler } from '../../../services/errorHandling.js';



export const addReview =asynchandler (async (req, res, next) => {
    const { text, rating } = req.body;
  
    if (!text || !rating) {
      return res.status(400).json({ message: 'الرجاء اخال النص والتقييم' });
    }
  
      const newReview = new ReviewModel({ text, rating });
      await newReview.save();
      res.status(201).json({ message: 'تم إضافة التقييم بنجاح', review: newReview });

      if (!newReview) {
        return next(Error('فشل في إضافة التقييم', { cause: 401 }));
      }
   
  });



export const getAllReviews = asynchandler(async (req, res, next) => {
 
    const reviews = await ReviewModel.find().sort({ createdAt: -1 });
    if (!reviews) {
        return next(Error('لا يوجد تقييمات ', { cause: 404 }));
      }
    res.json({message:"التقييمات",reviews})
 
});



  