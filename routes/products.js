const {Router} = require('express');
const { getAllProducts, getAllProductsStatic, getProduct } = require('../controllers/products');
const router = Router();

router.route('/').get(getAllProducts);
router.route('/static').get(getAllProductsStatic);
router.route('/:id').get(getProduct);

module.exports = router;