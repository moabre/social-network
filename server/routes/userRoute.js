const userCtrl = require('../controllers/userController');
const router = require('express').Router();

router.get('/', userCtrl.list);
router.get('/:id', userCtrl.userByID);
router.post('/signup', userCtrl.create);
router.post('/login', userCtrl.login);

module.exports = router;
