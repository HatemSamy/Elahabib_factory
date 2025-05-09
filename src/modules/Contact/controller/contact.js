
import ContactModel from '../../../../DB/model/contact.model.js';
import { asynchandler } from '../../../services/errorHandling.js';


export const createContact = asynchandler(async (req, res) => {
  const contact = await ContactModel.create(req.body);

  if (!contact) {
    return res.status(400).json({ message: 'فشل إرسال الرساله,  يرجى المحاولة مرة أخرى' });
  }

  res.status(201).json({
    message: 'تم إرسال الرساله بنجاح، سيتم التواصل معك خلال ٤٨ ساعة',
    data: contact,
  });
});


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


