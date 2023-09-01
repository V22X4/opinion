import { createReducer } from "@reduxjs/toolkit";

const initialState = {showComments : true, comments : [], newpost : 0};

export const likeReducer = createReducer(initialState, {
    likeRequest: (state) => {
      state.loading = true;
    },
    likeSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.isLiked = action.isLiked;
      state.votedpost = action.votedpost;
      state.votes = action.votes;
  },
    
    likeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
      
    dislikeRequest: (state) => {
      state.loading = true;
    },
    
    dislikeSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.isdisLiked = action.isdisLiked;
      state.votedpost = action.votedpost;
      state.votes = action.votes;
    },

    dislikeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    showCommentRequest: (state, action) => {
      state.showComments = action.showComments;
      state.comments = action.payload.post.comments;
    },
  
  
    newPostRequest: (state) => {
      state.loading = true;
    },
    newPostSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.newpost = 1 - state.newpost;
    },
    newPostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  
    updateCaptionRequest: (state) => {
      state.loading = true;
    },
    updateCaptionSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateCaptionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  
    deletePostRequest: (state) => {
      state.loading = true;
    },
    deletePostSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deletePostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  
    updateProfileRequest: (state) => {
      state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  
    updatePasswordRequest: (state) => {
      state.loading = true;
    },
    updatePasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updatePasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  
    deleteProfileRequest: (state) => {
      state.loading = true;
    },
    deleteProfileSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  
    forgotPasswordRequest: (state) => {
      state.loading = true;
    },
    forgotPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    forgotPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  
    resetPasswordRequest: (state) => {
      state.loading = true;
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    resetPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  
    followUserRequest: (state) => {
      state.loading = true;
    },
    followUserSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    followUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  });
  

  export const getPostReducer = createReducer(initialState, {
    getpostRequest: (state) => {
      state.loading = true;
    },

    getpostSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },

    getpostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

  });





  export const myPostsReducer = createReducer(initialState, {
    myPostsRequest: (state) => {
      state.loading = true;
    },
    myPostsSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    myPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  });
  
  export const userPostsReducer = createReducer(initialState, {
    userPostsRequest: (state) => {
      state.loading = true;
    },
    userPostsSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    userPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  });