import { Router } from 'express';

import {
	buildLogin,
	buildRegister,
	loginUser,
	registerUser,
} from '../controllers/account/controller.js';
import { validateLogin, validateRegister } from '../middleware/validation.js';

const router = Router();

router.get('/login', buildLogin);
router.get('/register', buildRegister);

router.post('/login', validateLogin, loginUser);
router.post('/register', validateRegister, registerUser);

router.get('/logout', (req, res) => {
	req.session.destroy(() => {
		res.redirect('/');
	});
});

export default router;
