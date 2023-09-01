const express = require('express');
const { } = require("../controllers/posts");
const { isAuthenticated } = require("../middlewares/auth");
const { getALLcommentByPost, commentOnPost, deleteComment, likeComment, dislikeComment } = require('../controllers/comments');
  
  const router = express.Router();

  router
    .route("/post/comment/:id")
    .get(getALLcommentByPost)
    .put(isAuthenticated, commentOnPost)
    .delete(isAuthenticated, deleteComment);
    
router.route("/comment/like/:id").get(isAuthenticated, likeComment);
router.route("/comment/dislike/:id").get(isAuthenticated, dislikeComment);
  

module.exports = router ;