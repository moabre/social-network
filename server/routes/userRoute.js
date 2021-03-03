const userCtrl = require('../controllers/userController');
const router = require('express').Router();

router.get('/', userCtrl.list);
router.get('/:id', userCtrl.userByID);
router.post('/signup', userCtrl.create);
router.post('/login', userCtrl.login);
router.patch('/:id', userCtrl.updateUser);
router.patch('/following/:id', userCtrl.addUserFollowing);
router.patch('/unfollowing/:id', userCtrl.removeUserFollowing);
router.patch('/unfollowers/:id', userCtrl.removeFollower);
router.delete('/:id', userCtrl.removeUser);

module.exports = router;
