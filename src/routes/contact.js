import { Router } from 'express';
import {
  buildContactForm,
  submitContactMessage,
} from '../controllers/contact/controller.js';
import { validateContact } from '../middleware/validation.js';

const router = Router();

router.get('/contact', buildContactForm);
router.post('/contact', validateContact, submitContactMessage);

export default router;