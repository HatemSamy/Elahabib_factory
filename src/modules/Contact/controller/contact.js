
import ContactModel from '../../../../DB/model/contact.model.js';
import { sendEmail } from '../../../services/email.js';
import { asynchandler } from '../../../services/errorHandling.js';


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

   const htmlMessage = `
  <div style="max-width: 600px; margin: auto; padding: 15px; border: 1px solid #ccc; border-radius: 6px; font-family: Arial, sans-serif;">
    <h3 style="margin-bottom: 20px;">New Contact Request</h3>

    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Message:</strong><br>${message}</p>
  </div>
`;

    const info = await sendEmail(
      process.env.notificationEmail,
      'New Contact Request',
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
