import { Router } from 'express';
import {
  buildContactForm,
  submitContactMessage,
} from '../controllers/contact/controller.js';

const router = Router();

router.get('/contact', buildContactForm);
router.post('/contact', submitContactMessage);

export default router;