import { Router } from 'express';

import {
  buildHome,
  buildInventory,
  buildLogin,
  buildVehicleDetail,
} from '../controllers/siteController.js';

const router = Router();

router.get('/', buildHome);
router.get('/vehicles', buildInventory);
router.get('/vehicles/:slug', buildVehicleDetail);
router.get('/login', buildLogin);

export default router;