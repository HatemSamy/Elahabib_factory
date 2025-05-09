import express from 'express';
import * as requestFormController from './controller/requestForm.js';
import { validation } from '../../middleware/validation.js';
import { CreaterequestForm } from './requestForm.validation.js';
const router = express.Router();

router.post('/Create-request-form',validation(CreaterequestForm) ,requestFormController.createRequestForm); 
router.get('/request-forms',requestFormController.getAllRequestForms); 

export default router;
