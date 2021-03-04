const router = require('express').Router();
const authCtrl = require('../controllers/authControllers');

router.route('/auth/signin').post(authCtrl.login);

module.exports = router;
