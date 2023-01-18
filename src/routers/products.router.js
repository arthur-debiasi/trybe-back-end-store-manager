const express = require('express');
const { productsController } = require('../controllers');

const router = express.Router();

router.get('/', productsController.listProducts);
router.post('/', productsController.registerProduct);

router.get('/:id', productsController.listProductsById);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProductById);

module.exports = router;