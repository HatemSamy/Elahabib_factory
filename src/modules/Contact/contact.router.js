import { Router } from "express";
const router = Router();
import *  as ContactController  from "./controller/contact.js";
import *  as contactValidation  from "./contact.validation.js";
import { validation } from "../../middleware/validation.js";



router.post('/SentMessage', validation(contactValidation.SentMessage), ContactController.createContact);
router.get('/ContactRequests', ContactController.AllContactRequest);



export default router;