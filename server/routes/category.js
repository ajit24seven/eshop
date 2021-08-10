const router = require('express').Router();
const { authz, adminCheck } = require('../middlewares/authz');
const {
	create,
	read,
	update,
	remove,
	list,
} = require('../controllers/category');

router.post('/category', authz, adminCheck, create);
router.get('/cagegories', list);
router.get('/category/:id', authz, adminCheck, read);
router.put('/category/:id', authz, adminCheck, update);
router.delete('/category/:id', authz, adminCheck, remove);

module.exports = router;
