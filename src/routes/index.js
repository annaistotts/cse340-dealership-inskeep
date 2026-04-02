import { Router } from 'express';
import inventoryRoutes from './inventory.js';
import accountRoutes from './account.js';
import reviewRoutes from './reviews.js';

const router = Router();

router.use('/', inventoryRoutes);
router.use('/', accountRoutes);
router.use('/', reviewRoutes);

export default router;
