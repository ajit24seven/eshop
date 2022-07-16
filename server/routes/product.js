const router = require('express').Router();
const { authz, adminCheck } = require('../middlewares/authz');
const {
	_getAll,
	_create,
	_getOne,
	_update,
	_delete,
} = require('../controllers/product');

router.post('/products', authz, adminCheck, _create);
router.get('/products', authz, _getAll);
router.get('/products/:slug', authz, _getOne);
router.put('/products/:slug', authz, _update);
router.delete('/products/:slug', authz, _delete);

module.exports = router;
