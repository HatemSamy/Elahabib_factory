
import ContactModel from '../../../../DB/model/contact.model.js';
import { sendEmail } from '../../../services/email.js';
import { asynchandler } from '../../../services/errorHandling.js';
import { generateContactRequestEmail } from '../../../services/emailTemplateService.js';


export const AllContactRequest = asynchandler(async (req, res) => {
    const contacts = await ContactModel.find({});
  
    if (!contacts) {
      return res.status(400).json({ message: "لا يوجد طلبات تواصل" });
    }
  
    res.status(200).json({
      message: ' طلبات التواصل ',
      data: contacts,
    });
  });




  // sent contact request to email 

 export const SentContactReqestMessage = asynchandler(async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;

    // Generate HTML email using the new template service
    const htmlMessage = generateContactRequestEmail({
      name,
      email,
      phone,
      message
    });

    const info = await sendEmail(
      process.env.NOTIFICATION_EMAIL,
      'طلب تواصل جديد - مصنع الحبيب لصناعة الأبواب',
      email,
      htmlMessage
    );

    if (info?.accepted?.length > 0) {
      const contact = await ContactModel.create({ name, email, phone, message });
      return res.status(201).json({ message: 'تم استلام رسالتك بنجاح' });
    } else {
      console.error("Email sending failed:", info?.rejected);
      return next(new Error("لم يتم إرسال الطلب، الرجاء المحاولة لاحقًا", { cause: 400 }));
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'حدث خطأ أثناء إرسال الرسالة' });
  }
});
