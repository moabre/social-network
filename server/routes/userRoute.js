const userCtrl = require('../controllers/userController');
const router = require('express').Router();
const authCtrl = require('../controllers/authControllers');

router.route('/api/users').get(userCtrl.list).post(userCtrl.create);

router
  .route('/api/users/follow')
  .put(
    authCtrl.requiresSignin,
    userCtrl.addUserFollowing,
    userCtrl.addFollower
  );
router
  .route('/api/users/unfollow')
  .put(
    authCtrl.requiresSignin,
    userCtrl.removeUserFollowing,
    userCtrl.removeFollower
  );

router
  .route('/api/users/findpeople/:userId')
  .get(authCtrl.requiresSignin, userCtrl.recommendPeople);

router
  .route('/api/users/:userId')
  .get(authCtrl.requiresSignin, userCtrl.specificUser)
  .put(authCtrl.requiresSignin, authCtrl.hasAuth, userCtrl.updateUser)
  .patch(authCtrl.requiresSignin, authCtrl.hasAuth, userCtrl.updateUser)
  .delete(authCtrl.requiresSignin, authCtrl.hasAuth, userCtrl.removeUser);

router.param('userId', userCtrl.userById);

module.exports = router;
