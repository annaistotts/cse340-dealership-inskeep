import { Router } from 'express';
import { requireLogin } from '../middleware/auth.js';
import { validateServiceRequest } from '../middleware/validation.js';
import {
  buildServiceForm,
  submitServiceRequest,
  viewServiceHistory,
} from '../controllers/service/controller.js';

const router = Router();

router.get('/service', requireLogin, buildServiceForm);
router.post('/service', requireLogin, validateServiceRequest, submitServiceRequest);
router.get('/service/history', requireLogin, viewServiceHistory);

export default router;