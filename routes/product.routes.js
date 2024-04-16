import { Router } from 'express';
import { createProduct, getAllProducts, getOneProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js'; // Asegúrate de ajustar la ruta al controlador

const router = Router();

router.post('/createProduct', createProduct);

router.get('/getAllProducts', getAllProducts);

router.get('/getOneProduct/:id', getOneProduct);

router.put('/updateProduct/:id', updateProduct);

router.delete('/deleteProduct/:id', deleteProduct);

export default router;
