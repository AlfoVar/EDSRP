import {Router} from 'express';
import { addUser, loginUser, logout, verifyToken } from '../controller/auth.controller.js';
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post('/register', validateSchema(registerSchema), addUser);

router.post('/login', validateSchema(loginSchema), loginUser);

router.post('/logout', logout);

router.get('/verify', verifyToken);

export default router