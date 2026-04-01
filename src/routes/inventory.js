import { Router } from 'express';

import {
	buildHome,
	buildInventory,
	buildVehicleDetail,
} from '../controllers/inventory/controller.js';

const router = Router();

router.get('/', buildHome);
router.get('/vehicles', buildInventory);
router.get('/vehicles/:slug', buildVehicleDetail);

export default router;
