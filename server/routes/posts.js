const express = require('express');
const { createPost, likePost, dislikePost, deletePost, getPostOfFollowing, updateCaption, getAllPosts, getPost} = require("../controllers/posts");
const { isAuthenticated } = require("../middlewares/auth");
  
  const router = express.Router();
  
  router.route("/post/upload").post(isAuthenticated, createPost);
  
  router
    .route("/post/:id")
    .get(getPost)
    .put(isAuthenticated, updateCaption)
    .delete(isAuthenticated, deletePost);
  
router.route("/post/like/:id").get(isAuthenticated, likePost)
router.route("/post/dislike/:id").get(isAuthenticated, dislikePost)
  
  router.route("/posts/following").get(isAuthenticated, getPostOfFollowing);
  router.route("/posts").get(getAllPosts);

module.exports = router ;