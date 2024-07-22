const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');

router.get('/daily', saleController.getDailySales);
router.get('/monthly', saleController.getMonthlySales);

module.exports = router;