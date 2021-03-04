const postCtrl = require('../controllers/postControllers');
const router = require('express').Router();
const authCtrl = require('../controllers/authControllers');
const userCtrl = require('../controllers/userController');

router.get('/', postCtrl.allPosts);
router.post('/', postCtrl.post);
router.patch('/:id', postCtrl.editPost);
router.delete('/:id', postCtrl.deletePost);

module.exports = router;
