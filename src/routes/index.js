import { Router } from 'express';

import inventoryRoutes from './inventory.js';
import accountRoutes from './account.js';

const router = Router();

router.use('/', inventoryRoutes);
router.use('/', accountRoutes);

export default router;
