const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.get('/', accountController.getAllAccounts);
router.post('/:accountId/products', accountController.addProductToAccount);
router.delete('/:accountId/products/:productId', accountController.removeProductFromAccount);

module.exports = router;
