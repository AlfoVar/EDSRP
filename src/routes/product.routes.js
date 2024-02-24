import {Router} from 'express';
import { getProducts, getProductById, addProduct, updateProductById, deleteProduct } from "../controller/products.controller.js";
import { authValidationToken } from "../middlewares/validateToken.js";

const router = Router();

//Esta es la forma para colocar la validacion del token en la llamadas a las rutas
// --> router.get('/', authValidationToken, getProducts);

router.get('/', getProducts);

router.get('/:id', getProductById)

router.post('/', addProduct)

router.put('/:id', updateProductById)

router.delete('/:id', deleteProduct);

export default router;