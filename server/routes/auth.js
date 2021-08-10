const router = require('express').Router();
const { createOrUpdateUser, currentUser } = require('../controllers/auth');
const { authz, adminCheck } = require('../middlewares/authz');

router.post('/create-or-update-user', authz, createOrUpdateUser);
router.post('/current-user', authz, currentUser);
router.post('/current-admin', authz, adminCheck, currentUser);

module.exports = router;
