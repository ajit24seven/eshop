const router = require('express').Router();
const { authz, adminCheck } = require('../middlewares/authz');
const {
	create,
	read,
	update,
	remove,
	list,
} = require('../controllers/category');

router.post('/category', authz, create);
router.get('/categories', list);
router.get('/category/:slug', read);
router.put('/category/:slug', authz, adminCheck, update);
router.delete('/category/:slug', authz, adminCheck, remove);

module.exports = router;
