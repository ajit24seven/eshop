const router = require('express').Router();
const { authz, adminCheck } = require('../middlewares/authz');
const {
	getAllProducts,
	createProducts,
	getProductDetails,
	updateProduct,
	deleteProduct,
} = require('../controllers/category');

router.post('/categories', authz, adminCheck, createProducts);
router.get('/categories', getAllProducts);
router.get('/categories/:slug', getProductDetails);
router.put('/categories/:slug', authz, adminCheck, updateProduct);
router.delete('/categories/:slug', authz, adminCheck, deleteProduct);

module.exports = router;
