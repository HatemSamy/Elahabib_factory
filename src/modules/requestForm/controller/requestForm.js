
import RequestFormModel from '../../../../DB/model/RequestForm.model.js';
import { asynchandler } from '../../../services/errorHandling.js';


// Create a new request form
export const createRequestForm = asynchandler(async (req, res) => {

  const form = await RequestFormModel.create(req.body);

  res.status(201).json({
    message: 'تم إرسال الطلب بنجاح، سيتم التواصل معك خلال ٤٨ ساعة',
    data: form
  });
});

// Get all submitted forms (admin)
export const getAllRequestForms = asynchandler(async (req, res) => {
  const forms = await RequestFormModel.find().sort({ createdAt: -1 });
  res.status(200).json({message:"جميع الطلبات",forms});
});




