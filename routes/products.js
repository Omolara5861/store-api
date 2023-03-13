const {Router} = require('express');
const { getAllProducts, getAllProductsStatic } = require('../controllers/products');
const router = Router();

router.route('/').get(getAllProducts);
router.route('/static').get(getAllProductsStatic);

module.exports = router;