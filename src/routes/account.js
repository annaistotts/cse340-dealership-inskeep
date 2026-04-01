import { Router } from 'express';

import {
	buildLogin,
	buildRegister,
} from '../controllers/account/controller.js';

const router = Router();

router.get('/login', buildLogin);
router.get('/register', buildRegister);

export default router;
