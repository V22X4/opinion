const Post = require('../models/Post');
const User = require('../models/User'); 
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require ("../middlewares/catchAsyncErrors") ;

exports.createPost = catchAsyncErrors( async (req, res ,next) => {
    try {
      
      const caption = req.body.caption;
      const newPost = {
        caption: caption,
        owner: req.user._id,
      };
  
      const post = await Post.create(newPost);

      const user = await User.findById(req.user._id);
  
      user.posts.unshift(post._id);
  
      await user.save();
      await post.save();

      res.status(201).json({
        success: true,
        message: "Post created",
      });
    } catch (error) {
        return next(new ErrorHandler(error.message , 401));

    }
  });

  
  exports.deletePost = catchAsyncErrors( async (req, res ,next) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        return next(new ErrorHandler("Post not found", 404));
      }
  
      if (post.owner.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler("You are not Authorised", 401));
      }
    
      await post.remove();
  
      const user = await User.findById(req.user._id);
  
      const index = user.posts.indexOf(req.params.id);
      user.posts.splice(index, 1);
  
      await user.save();
  
      res.status(200).json({
        success: true,
        message: "Post deleted",
      });
    } catch (error) {
        return next(new ErrorHandler(error.message , 501));
    }
  });
  
  exports.likePost = catchAsyncErrors( async (req, res , next) => {
    try {

      const post = await Post.findById(req.params.id);
      const user = await User.findById(req.user._id);
  
      if (!post) {
        return next(new ErrorHandler("Post not found", 404));
      }
      
      
      if (post.likes.includes(req.user._id)) {
        const userindex = post.likes.indexOf(req.user._id);
  
        post.likes.splice(userindex, 1);
  
        await post.save();

        const postindex = user.likedPosts.indexOf(req.params.id);

        user.likedPosts.splice(postindex, 1);

        await user.save();

  
        return res.status(200).json({
          success: true,
          message: "Post Like removed",
          isLiked: true,
          votedpost: post._id,
          votes: post.likes.length - post.dislikes.length,
        });
      } else {
        post.likes.push(req.user._id);
        user.likedPosts.push(req.params.id);

        if (post.dislikes.includes(req.user._id)) {

          const userindex = post.dislikes.indexOf(req.user._id);
          post.dislikes.splice(userindex, 1);

          const postindex = user.dislikedPosts.indexOf(req.params.id);
          post.dislikes.splice(postindex, 1);

        }

        await user.save();
  
        await post.save();
  
        return res.status(200).json({
          success: true,
          message: "Post Liked",
          isLiked: false,
          votedpost: post._id,
          votes: post.likes.length - post.dislikes.length,
        });
      }
    } catch (error) {
        return next(new ErrorHandler(error.message , 400));

    }
  });


  exports.dislikePost = catchAsyncErrors( async (req, res , next) => {
    try {

      const post = await Post.findById(req.params.id);
      const user = await User.findById(req.user._id);
  
      if (!post) {
        return next(new ErrorHandler("Post not found", 404));
      }
  
      if (post.dislikes.includes(req.user._id)) {

        const userindex = post.dislikes.indexOf(req.user._id);
  
        post.dislikes.splice(userindex, 1);
  
        await post.save();

        const postindex = user.dislikedPosts.indexOf(req.params.id);

        user.dislikedPosts.splice(postindex, 1);

        await user.save();

        return res.status(200).json({
          success: true,
          message: "Post Dislike removed",
          isLiked: false,
          votedpost: post._id,
          votes: post.likes.length - post.dislikes.length,
        });

      } else {
        post.dislikes.push(req.user._id);
        user.dislikedPosts.push(req.params.id);

        if (post.likes.includes(req.user._id)) {

          const userindex = post.likes.indexOf(req.user._id);
          post.likes.splice(userindex, 1);

          const postindex = user.likedPosts.indexOf(req.params.id);
          post.likes.splice(postindex, 1);

        }

        await user.save();
  
        await post.save();
  
        return res.status(200).json({
          success: true,
          message: "Post DisLiked",
          isLiked: false,
          votedpost: post._id,
          votes: post.likes.length - post.dislikes.length,
        });
      }
    } catch (error) {
        return next(new ErrorHandler(error.message , 400));

    }
  }); 

  exports.getAllPosts = catchAsyncErrors( async (req, res, next) => {
    try {
  
      const posts = await Post.find().populate("owner likes comments comments.commentedByUser");
      const totalPostCOunt = await Post.countDocuments();
      res.status(200).json({
        success: true,
        numberOfPosts :totalPostCOunt,
        posts: posts.reverse(),
      });
    } catch (error) {
        return next(new ErrorHandler(error.message , 400));

    }
  });


  exports.getPostOfFollowing = catchAsyncErrors( async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);
   
      const posts = await Post.find({
        owner: {
          $in: user.following,
        },
      }).populate("owner likes comments comments.commentedByUser");
  
      res.status(200).json({
        success: true,
        posts: posts.reverse(),
      });
    } catch (error) {
        return next(new ErrorHandler(error.message , 400));

    }
  });
 

  exports.getPost = catchAsyncErrors( async (req, res, next) => {
    try {
  
      const post = await Post.findById(req.params.id);

      res.status(200).json({
        success: true,
        post: post,
      });
    } catch (error) {
        return next(new ErrorHandler(error.message , 400));

    }
  });



  
  exports.updateCaption = catchAsyncErrors( async (req, res , next) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        return next(new ErrorHandler("Post not found", 404));

      }
  
      if (post.owner.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler("Unauthorized", 401));

      }
  
      post.caption = req.body.caption;
      await post.save();
      res.status(200).json({
        success: true,
        message: "Post updated",
      });
    } catch (error) {
        return next(new ErrorHandler(error.message , 400));

    }
  });
  



 