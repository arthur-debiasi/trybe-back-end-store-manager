const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

router.get('/', salesController.listSales);

router.get('/:id', salesController.listSalesById);

router.post('/', salesController.registerSales);

router.delete('/:id', salesController.deleteSales);

router.put('/:id', salesController.updateSales);

module.exports = router;
