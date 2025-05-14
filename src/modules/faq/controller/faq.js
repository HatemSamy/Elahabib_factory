
import { asynchandler } from '../../../services/errorHandling.js';
import  FAQModel  from '../../../../DB/model/faq.model.js';


export const getAllFAQs = asynchandler(async (req, res) => {
  const faqs = await FAQModel.find();
  res.status(200).json({ message: 'الأسئلة الشائعة', faqs });
});

export const insertManyFAQs = asynchandler(async (req, res) => {
  const { faqs } = req.body;


  if (!Array.isArray(faqs) || faqs.length === 0) {
    return res.status(400).json({ message: 'يرجى إرسال مجموعه من الأسئلة والإجابات' });
  }

  const inserted = await FAQModel.insertMany(faqs);
  res.status(201).json({ message: 'تم إدخال الأسئلة بنجاح', inserted });
})
