const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment') 
const sendToken = require("../utils/sendJwtToken");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const { sendEmail } = require("../middlewares/sendEmail");
const catchAsyncErrors = require ("../middlewares/catchAsyncErrors") ;
const crypto = require ("crypto");


exports.registerUser = catchAsyncErrors( async (req , res ,next)=> {
    
  const { username, email, password } = req.body;
    const checkIfUserExists = await User.find({email:email});
    
    if (!checkIfUserExists) {
      return next(new ErrorHandler("This Email Already exists" , 403))
    }

    const user = await User.create({
        username , 
        email ,
        password ,
    })
  

  
    sendToken(user, 201, res);

})

exports.loadUser = catchAsyncErrors( async (req , res , next) =>{

  const { token } = req.cookies;

    if (!token) {
      return res.status(200).json({
        success: true,
        isAutheticated: false,
      });
    }
    else {
          const decoded = await jwt.verify(token, process.env.JWT_SECRET);

          const user = await User.findById(decoded._id);
          
          return res.status(200).json({
            success: true,
            isAutheticated: true,
            user: user,
          });
      }
    
})

// Login User

exports.loginUser = catchAsyncErrors( async (req , res , next) =>{



  const { email, password } = req.body;

  // Checking if user has given email and body both 


  if (!email || !password) {
      return next(new ErrorHandler("please enter email and password both" , 400))
  }
  const user = await User.findOne({email}).select("+password").populate("posts followers following");

  if (!user) {
      return next(new ErrorHandler("invalid email or password 1 " , 401));
  }
  

  const isPasswordMatch = await user.matchPassword(password);
  if (!isPasswordMatch) {
      return next(new ErrorHandler("invalid email or password 2" , 401));
  }

  sendToken(user , 202 , res);
})

//logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
  

  res.cookie("token" , null ,{
      expires : new Date (Date.now()),
      httpOnly : true
  })

  res.status(200).json({
      success : true ,
      message : "Logged out"
  })
})

//get all users
exports.getAllUsers = catchAsyncErrors( async (req , res)=>{
  const users = await User.find().populate("posts followers following");
  const numberOfUsers = await User.countDocuments();

  res.status(200).json({
    success : true ,
    numberOfUsers : numberOfUsers,
    users  : users
})
})

exports.getUser = catchAsyncErrors(async (req, res, next) => {
  
  const username = req.params.username;

  const user = await User.findOne({ username }).populate(
    'posts followers following comments comments.commentedByUser likedPosts likedPosts.comments likedPosts.comments.commentedByUser dislikedPosts dislikedPosts.comments dislikedPosts.comments.commentedByUser'
  );
  
  if (!user) {
    return next(new ErrorHandler("User does not exist") ,404);
  }

  res.status(200).json({
    success : true ,
    user  : user
})
})

//Get My Profile
exports.getMyProfile = catchAsyncErrors( async (req , res)=>{
  const currentUser = await User.findById(req.user._id).populate("posts followers following");;

  res.status(200).json({
    success : true ,
    currentUser  : currentUser
})
})


//following a user
exports.followUser = catchAsyncErrors( async (req, res ,next) => {
  try {
    const username = req.params.username;
    
    const userToFollow = await User.findOne({ username });
    const loggedInUser = await User.findById(req.user._id);

    
    if (!userToFollow) {
      return next(new ErrorHandler("User not found" , 401));
      
    }

   if (loggedInUser.following.includes(userToFollow._id) && userToFollow !== loggedInUser) {


      const indexfollowing = loggedInUser.following.indexOf(userToFollow._id);
      const indexfollowers = userToFollow.followers.indexOf(loggedInUser._id);

      console.log(loggedInUser.following, userToFollow.followers);

      loggedInUser.following.splice(indexfollowing, 1);
      userToFollow.followers.splice(indexfollowers, 1);

      console.log(loggedInUser.following, userToFollow.followers);

      await loggedInUser.save();
      await userToFollow.save();

      res.status(200).json({
        success: true,
        message: "User Unfollowed",
      });
    } else {
      if (userToFollow !== loggedInUser) {

        loggedInUser.following.push(userToFollow._id);
        userToFollow.followers.push(loggedInUser._id);

        
        await loggedInUser.save();
        await userToFollow.save();
        
      }
      
      res.status(200).json({
        success: true,
        message: "User followed",
      });
    }
  } catch (error) {
    
    return next(new ErrorHandler(error.message , 400));

  }
});

exports.CheckfollowUser = catchAsyncErrors( async (req, res ,next) => {
  try {
    const username = req.params.username;
    
    const userToFollow = await User.findOne({ username });
    const loggedInUser = await User.findById(req.user._id);

    
    if (!userToFollow) {
      return next(new ErrorHandler("User not found" , 401));
      
    }

   if (loggedInUser.following.includes(userToFollow._id) && userToFollow !== loggedInUser) {

      res.status(200).json({
        success: true,
        message: "User Unfollowed",
        isFollowed: true,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User followed",
        isFollowed: false,
      });
    }
  } catch (error) {
    
    return next(new ErrorHandler(error.message , 400));

  }
});


exports.updatePassword = catchAsyncErrors( async (req, res , next) => {
  try {
    const user = await User.findById(req.user._id).select("+password");

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return next(new ErrorHandler("Please provide old and new password" , 401));
    }

    const isMatch = await user.matchPassword(oldPassword);

    if (!isMatch) {
      return next(new ErrorHandler("Incorrect Old password", 401));

    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 401));

  }
});

exports.updateProfile = catchAsyncErrors( async (req, res ,next) => {
  try {
    const user = await User.findById(req.user._id);

    const { username, email } = req.body;

    if (username) {
      user.username = username;
    }
    if (email) {
      user.email = email;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 401));

  }
});

//delete my profile 
// exports.deleteMyProfile = catchAsyncErrors( async (req, res , next) => {
//   try {
//     const user = await User.findById(req.user._id);
//     const posts = user.posts;
//     const followers = user.followers;
//     const following = user.following;
//     const userId = user._id;
    
//     await user.remove();
    

//     // Logout user after deleting profile

//     res.cookie("token", null, {
//       expires: new Date(Date.now()),
//       httpOnly: true,
//     });

//     // Delete all posts of the user
//     for (let i = 0; i < posts.length; i++) {
//       const post = await Post.findById(posts[i]);
      
//       await post.remove();
      
//     }

//     // Removing User from Followers Following
//     for (let i = 0; i < followers.length; i++) {
//       const follower = await User.findById(followers[i]);

//       const index = follower.following.indexOf(userId);
//       follower.following.splice(index, 1);
//       await follower.save();
//     }

//     // Removing User from Following's Followers
//     for (let i = 0; i < following.length; i++) {
//       const follows = await User.findById(following[i]);

//       const index = follows.followers.indexOf(userId);
//       follows.followers.splice(index, 1);
//       await follows.save();
//     }

//     // removing all comments of the user from all posts
//     const allPosts = await Post.find();

//     for (let i = 0; i < allPosts.length; i++) {
//       const post = await Post.findById(allPosts[i]._id);

//       for (let j = 0; j < post.comments.length; j++) {
//         if (post.comments[j].user === userId) {
//           post.comments.splice(j, 1);
//         }
//       }
//       await post.save();
//     }
//     // removing all likes of the user from all posts

//     for (let i = 0; i < allPosts.length; i++) {
//       const post = await Post.findById(allPosts[i]._id);

//       for (let j = 0; j < post.likes.length; j++) {
//         if (post.likes[j] === userId) {
//           post.likes.splice(j, 1);
//         }
//       }
//       await post.save();
//     }

//     res.status(200).json({
//       success: true,
//       message: "Profile Deleted",
//     });
//   } catch (error) {
//     return next(new ErrorHandler(error.message, 400));

//   }
// });

exports.getMyPosts = catchAsyncErrors(async (req, res, next) => {
  
  try {
    const user = await User.findById(req.user._id);

    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.commentedByUser owner"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));

  }
});

exports.getUserPosts = catchAsyncErrors( async (req, res ,next) => {
  try {
    const username = req.params.username;
    
    const user = await User.findOne({ username });

    if (!user) {
      return next(new ErrorHandler("User Not Found", 400)); 
    }

    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "owner likes comments comments.commentedByUser"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));

  }
});


exports.getUserLikedPosts = catchAsyncErrors( async (req, res ,next) => {
  try {
    const username = req.params.username;
    
    const user = await User.findOne({ username });

    if (!user) {
      return next(new ErrorHandler("User Not Found", 400)); 
    }

    const likedPosts = [];
    const dislikedPosts = [];

    for (let i = 0; i < user.likedPosts.length; i++) {
      const post = await Post.findById(user.likedPosts[i]).populate(
        "owner likes comments comments.commentedByUser"
      );
      likedPosts.push(post);
    }

    for (let i = 0; i < user.dislikedPosts.length; i++) {
      const post = await Post.findById(user.dislikedPosts[i]).populate(
        "owner likes comments comments.commentedByUser"
      );
      dislikedPosts.push(post);
    }

    res.status(200).json({
      success: true,
      likedPosts: likedPosts,
      dislikedPosts: dislikedPosts,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));

  }
});


exports.getUserLikedComments = catchAsyncErrors( async (req, res ,next) => {
  try {
    const username = req.params.username;
    
    const user = await User.findOne({ username });

    if (!user) {
      return next(new ErrorHandler("User Not Found", 400)); 
    }

    const likedComments = [];
    const dislikedComments = [];

    for (let i = 0; i < user.likedComments.length; i++) {
      const comment = await Comment.findById(user.likedComments[i]).populate(
        "commentedByUser"
      );
      likedComments.push(comment);
    }

    for (let i = 0; i < user.dislikedComments.length; i++) {
      const comment = await Comment.findById(user.dislikedComments[i]).populate(
        "commentedByUser"
      );
      dislikedComments.push(comment);
    }

    res.status(200).json({
      success: true,
      likedComments: likedComments,
      dislikedComments: dislikedComments,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));

  }
});


//Forgot Password Section

exports.forgotPassword = catchAsyncErrors( async (req, res , next) => {
      res.status(200)
});

exports.resetPassword =catchAsyncErrors( async (req, res , next) => {
      res.status(200);
});