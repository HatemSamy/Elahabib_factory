
import express from 'express';
import * as FAQController from './controller/faq.js';

const router = express.Router();

router.get('/Questions', FAQController.getAllFAQs);
router.post('/add', FAQController.insertManyFAQs); 

export default router;
