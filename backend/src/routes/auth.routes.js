import {Router} from 'express';
import { addUser, loginUser, logout, verifyToken } from '../controller/auth.controller.js';
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import { authValidationToken } from "../middlewares/validateToken.js";

const router = Router();

router.post('/register'/*, authValidationToken*/, validateSchema(registerSchema), addUser);
// router.post('/register', addUser);

router.post('/login', validateSchema(loginSchema), loginUser);
// router.post('/login', loginUser);

router.post('/logout', logout);

router.get('/verify', verifyToken);

export default router