import {Router} from 'express';
import { getPump, getPumpById, addPump, updatePumpById, deletePump } from "../controller/pump.constroler.js";
//import { authValidationToken } from "../middlewares/validateToken.js";

const router = Router();

router.get('/pump', /*authValidationToken,*/ getPump);

router.get('/pump/:id',/*authValidationToken,*/ getPumpById)

router.post('/pump',/*authValidationToken, */addPump)

router.put('/pump/:id',/*authValidationToken,*/ updatePumpById)

router.delete('/pump/:id',/*authValidationToken,*/ deletePump);

export default router;