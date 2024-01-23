import {Router} from 'express';
import { addUser, loginUser, logout } from '../controller/auth.controller.js';

const router = Router();

router.post('/register', addUser);

router.post('/login', loginUser);

router.post('/logout', logout);

export default router