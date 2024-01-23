import {Router} from 'express';
import { getProducts, getProductById, addProduct, updateProductById, deleteProduct } from "../controller/products.controller.js";
import { authValidationToken } from "../middlewares/validateToken.js";

const router = Router();

router.get('/', authValidationToken, getProducts);

router.get('/:id',authValidationToken, getProductById)

router.post('/',authValidationToken, addProduct)

router.put('/:id',authValidationToken, updateProductById)

router.delete('/:id',authValidationToken, deleteProduct);

export default router;