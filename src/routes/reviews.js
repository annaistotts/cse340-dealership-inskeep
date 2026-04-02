import { Router } from 'express';
import { requireLogin } from '../middleware/auth.js';
import {
  createReview,
  buildEditReview,
  updateReview,
  deleteReview,
} from '../controllers/reviews/controller.js';

const router = Router();

router.post('/vehicles/:slug/reviews', requireLogin, createReview);
router.get('/vehicles/:slug/reviews/:reviewId/edit', requireLogin, buildEditReview);
router.post('/vehicles/:slug/reviews/:reviewId/edit', requireLogin, updateReview);
router.post('/vehicles/:slug/reviews/:reviewId/delete', requireLogin, deleteReview);

export default router;