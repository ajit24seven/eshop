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
router.get('/products', _getAll);
router.get('/products/:slug', _getOne);
router.put('/products/:slug', _update);
router.delete('/products/:slug', _delete);

module.exports = router;
