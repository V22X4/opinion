const express = require('express');
const { registerUser, loginUser, logout, getAllUsers, followUser, updatePassword, updateProfile, getMyProfile, deleteMyProfile, getMyPosts, getUserPosts, forgotPassword, resetPassword, getUser, loadUser, getUserLikedPosts, getUserLikedComments, CheckfollowUser } = require('../controllers/user');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/users/all').get(getAllUsers);
router.route('/user/:username').get(getUser);
router.route('/user/follow/:username').put(isAuthenticated ,followUser);
router.route('/me/password/update').put(isAuthenticated ,updatePassword);
router.route('/me/update').put(isAuthenticated ,updateProfile);
router.route('/me').get(isAuthenticated ,getMyProfile);
// router.route('/me/delete').delete(isAuthenticated ,deleteMyProfile);
router.route('/me/posts').get(isAuthenticated ,getMyPosts);
router.route('/user/posts/:username').get(isAuthenticated ,getUserPosts);
router.route('/forgot/password').post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/loaduser").get(isAuthenticated, loadUser);
router.route('/like/posts/:username').get(getUserLikedPosts);
router.route('/like/comments/:username').get(getUserLikedComments);
router.route('/user/checkfollow/:username').get(isAuthenticated, CheckfollowUser);



module.exports = router ;