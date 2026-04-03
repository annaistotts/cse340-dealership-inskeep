import { Router } from 'express';
import inventoryRoutes from './inventory.js';
import accountRoutes from './account.js';
import reviewRoutes from './reviews.js';
import serviceRoutes from './service.js';
import adminRoutes from './admin.js';

const router = Router();

router.use('/', inventoryRoutes);
router.use('/', accountRoutes);
router.use('/', reviewRoutes);
router.use('/', serviceRoutes);
router.use('/', adminRoutes);

export default router;