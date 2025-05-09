import { Router } from "express";
const router = Router();
import *  as ContactController  from "./controller/contact.js";
import *  as contactValidation  from "./contact.validation.js";
import { validation } from "../../middleware/validation.js";



router.post('/ContactRequest', validation(contactValidation.SentMessage), ContactController.createContact);
router.get('/ContactRequest', ContactController.AllContactRequest);



export default router;