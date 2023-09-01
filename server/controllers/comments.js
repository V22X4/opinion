const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require ("../middlewares/catchAsyncErrors") ;

exports.getALLcommentByPost = catchAsyncErrors(async (req, res, next) => {
    try {
  
    const post = await Post.findById(req.params.id).populate("owner likes comments comments.commentedByUser");;
      
      res.status(200).json({
        success: true,
        comments: post.comments.reverse(),
      });
    } catch (error) {
        return next(new ErrorHandler(error.message , 400));

    }
});
  
exports.commentOnPost = catchAsyncErrors( async (req, res , next) => {
    try {

      const post = await Post.findById(req.params.id);
      const user = await User.findById(req.user._id);

      const newComment = {
        comment: req.body.comment,
        commentedByUser: req.user._id,
        post : req.params.id,
      };

        
      const comment = await Comment.create(newComment);
  
      if (!post) {
        return next(new ErrorHandler("Post not found", 404));
      }
  
      post.comments.push(comment._id);
      user.comments.push(comment._id);

      await post.save();
      await comment.save();
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Comment added",
      });
    } catch (error) {
        return next(new ErrorHandler(error.message , 400));

    }
  });
  
  exports.deleteComment = catchAsyncErrors( async (req, res , next) => {
    try {
            
        return res.status(200).json({
          success: true,
          message: "Your Comment has deleted",
        });
      
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));

    }
  });

  exports.likeComment = catchAsyncErrors( async (req, res , next) => {
    try {

      const comment = await Comment.findById(req.params.id);
      const user = await User.findById(req.user._id);
  
      if (!comment) {
        return next(new ErrorHandler("Post not found", 404));
      }
      
      
      if (comment.likes.includes(req.user._id)) {
        const userindex = comment.likes.indexOf(req.user._id);
  
        comment.likes.splice(userindex, 1);
  
        await comment.save();

        const commentindex = user.likedComments.indexOf(req.params.id);

        user.likedComments.splice(commentindex, 1);

        await user.save();

  
        return res.status(200).json({
          success: true,
          message: "Comment Like removed",
          isLiked: false,
          votedComment: comment._id,
          votes: comment.likes.length - comment.dislikes.length,
        });
      } else {
        comment.likes.push(req.user._id);
        user.likedComments.push(req.params.id);

        if (comment.dislikes.includes(req.user._id)) {

          const userindex = comment.dislikes.indexOf(req.user._id);
          comment.dislikes.splice(userindex, 1);

          const commentindex = user.dislikedComments.indexOf(req.params.id);
          comment.dislikes.splice(commentindex, 1);

        }

        await user.save();
  
        await comment.save();
  
        return res.status(200).json({
          success: true,
          message: "Comment Liked",
          isLiked: true,
          votedComment: comment._id,
          votes: comment.likes.length - comment.dislikes.length,
        });
      }
    } catch (error) {
        return next(new ErrorHandler(error.message , 400));

    }
  });


  exports.dislikeComment = catchAsyncErrors( async (req, res , next) => {
    try {

      const comment = await Comment.findById(req.params.id);
      const user = await User.findById(req.user._id);
  
      if (!comment) {
        return next(new ErrorHandler("Post not found", 404));
      }
      
      
      if (comment.dislikes.includes(req.user._id)) {
        const userindex = comment.dislikes.indexOf(req.user._id);

        comment.dislikes.splice(userindex, 1);
  
        await comment.save();

        const commentindex = user.dislikedComments.indexOf(req.params.id);

        user.dislikedComments.splice(commentindex, 1);

        await user.save();

        return res.status(200).json({
          success: true,
          message: "Comment disLike removed",
          isdisLiked: false,
          votedComment: comment._id,
          votes: comment.likes.length - comment.dislikes.length,
        });
      } else {
        comment.dislikes.push(req.user._id);
        user.dislikedComments.push(req.params.id);

        if (comment.likes.includes(req.user._id)) {

          const userindex = comment.likes.indexOf(req.user._id);
          comment.likes.splice(userindex, 1);

          const commentindex = user.likedComments.indexOf(req.params.id);
          comment.likes.splice(commentindex, 1);

        }

        await user.save();
  
        await comment.save();
  
        return res.status(200).json({
          success: true,
          message: "Comment disLiked",
          isdisLiked: true,
          votedComment: comment._id,
          votes: comment.likes.length - comment.dislikes.length,
        });
      }
    } catch (error) {
        return next(new ErrorHandler(error.message , 400));

    }
  });