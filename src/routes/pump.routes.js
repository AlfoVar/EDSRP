import {Router} from 'express';
import { getPump, getPumpById, getPumpByDate, addPump, updatePumpById, deletePump } from "../controller/pump.constroler.js";
//import { authValidationToken } from "../middlewares/validateToken.js";

const router = Router();

router.get('/', /*authValidationToken,*/ getPump);

router.get('/:id',/*authValidationToken,*/ getPumpById)

router.get('/:date',/*authValidationToken,*/ getPumpByDate) //TODO: check if this is the correct way to get by date

router.post('/',/*authValidationToken, */addPump)

router.put('/:id',/*authValidationToken,*/ updatePumpById)

router.delete('/:id',/*authValidationToken,*/ deletePump);

export default router;