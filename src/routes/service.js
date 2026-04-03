import { Router } from 'express';
import { requireLogin } from '../middleware/auth.js';
import {
  buildServiceForm,
  submitServiceRequest,
  viewServiceHistory,
} from '../controllers/service/controller.js';

const router = Router();

router.get('/service', requireLogin, buildServiceForm);
router.post('/service', requireLogin, submitServiceRequest);
router.get('/service/history', requireLogin, viewServiceHistory);

export default router;