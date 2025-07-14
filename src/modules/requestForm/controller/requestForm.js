
import RequestFormModel from '../../../../DB/model/RequestForm.model.js';
import { sendEmail } from '../../../services/email.js';
import { asynchandler } from '../../../services/errorHandling.js';
import { generateRequestFormEmail } from '../../../services/generateRequestFormEmail.js';





export const createRequestForm = asynchandler(async (req, res) => {
  const form = await RequestFormModel.create(req.body);

  const adminEmail = process.env.NOTIFICATION_EMAIL;
  const subject = 'طلب جديد من خلال النموذج';
  const replyTo = req.body.email || undefined;

  const htmlMessage = generateRequestFormEmail(req.body);

  try {
    await sendEmail(adminEmail, subject, replyTo, htmlMessage);
  } catch (error) {
    console.error("فشل إرسال الإيميل:", error.message);
  }

  res.status(201).json({
    message: 'تم استلام طلبكم بنجاح، سنتواصل معكم قريبًا..',
    data: form
  });
});




export const getAllRequestForms = asynchandler(async (req, res) => {
  const forms = await RequestFormModel.find().sort({ createdAt: -1 });
  res.status(200).json({message:"جميع الطلبات",forms});
});




