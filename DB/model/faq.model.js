// src/models/faq.model.js
import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, 'السؤال مطلوب']
    },
    answer: {
      type: String,
      required: [true, 'الإجابة مطلوبة']
    }
  },
  {
    timestamps: true
  }
);
 const FAQModel = mongoose.model('FAQ', faqSchema);
export default FAQModel;