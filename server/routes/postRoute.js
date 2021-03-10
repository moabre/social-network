const postCtrl = require('../controllers/postControllers');
const router = require('express').Router();
const authCtrl = require('../controllers/authControllers');
const userCtrl = require('../controllers/userController');

router
  .route('/api/posts/new/:userId')
  .post(authCtrl.requiresSignin, postCtrl.post);

router
  .route('/api/posts/by/:userId')
  .get(authCtrl.requiresSignin, postCtrl.postsByUser);

router
  .route('/api/posts/feed/:userId')
  .get(authCtrl.requiresSignin, postCtrl.postNewsFeed);

router.route('/api/posts/like').put(authCtrl.requiresSignin, postCtrl.like);
router.route('/api/posts/unlike').put(authCtrl.requiresSignin, postCtrl.unlike);

router
  .route('/api/posts/comment')
  .put(authCtrl.requiresSignin, postCtrl.comment);

router
  .route('/api/posts/uncomment')
  .put(authCtrl.requiresSignin, postCtrl.deleteComment);

router
  .route('/api/posts/edit/comment')
  .put(authCtrl.requiresSignin, postCtrl.editComment);
router
  .route('/api/posts/edit/:postId')
  .put(authCtrl.requiresSignin, postCtrl.editPost);

router
  .route('/api/posts/:postId')
  .delete(authCtrl.requiresSignin, postCtrl.authPoster, postCtrl.deletePost);

router.param('userId', userCtrl.userById);
router.param('postId', postCtrl.postById);

module.exports = router;
