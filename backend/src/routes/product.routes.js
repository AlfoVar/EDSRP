import {Router} from 'express';
import { getProducts, getProductById, addProduct, updateProductById, deleteProduct } from "../controller/products.controller.js";
import { authValidationToken } from "../middlewares/validateToken.js";

const router = Router();

//Esta es la forma para colocar la validacion del token en la llamadas a las rutas
// --> router.get('/', authValidationToken, getProducts);

router.get('/', authValidationToken, getProducts);

router.get('/:id', authValidationToken, getProductById)

router.post('/', authValidationToken, addProduct)

router.put('/:id', authValidationToken, updateProductById)

router.delete('/:id', authValidationToken, deleteProduct);

export default router;