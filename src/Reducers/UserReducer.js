import { createReducer } from "@reduxjs/toolkit";
const initialState = {isAuthenticated:false};
export const userReducer = createReducer(initialState , {

    LoginRequest: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
      },
      LoginSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      },
      LoginFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      },
    
      RegisterRequest: (state) => {
        state.loading = true;
      },
      RegisterSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      },
      RegisterFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      },
    
      LoadUserRequest: (state) => {
        state.loading = true;
      },
      LoadUserSuccess: (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.currentUser;
        state.isAuthenticated = true;
      },
      LoadUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      },
    
      LogoutUserRequest: (state) => {
        state.loading = true;
      },
      LogoutUserSuccess: (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      },
      LogoutUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = true;
      },
    
      clearErrors: (state) => {
        state.error = null;
      },
      
      CheckfollowUserSuccess: (state, action) => {
        state.isFollowed = action.isFollowed;
      },
          
      CheckfollowUserFailure: (state, action) => {
        state.error = action.payload;
      }
});

export const getPostsReducer = createReducer(initialState, {
  getPostsRequest: (state) => {
    state.loading = true;
  },
  getPostsSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  getPostsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  userPostsRequest: (state) => {
    state.loading = true;
  },
  userPostsSuccess: (state, action) => {
    state.loading = false;
    state.userposts = action.payload;
  },
  userPostsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  getlikedPostsRequest: (state) => {
    state.loading = true;
  },
  getlikedPostsSuccess: (state, action) => {
    state.loading = false;
    state.likedPosts = action.likedPosts;
    state.dislikedPosts = action.dislikedPosts;
  },
  getlikedPostsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  getlikedCommentsRequest: (state) => {
    state.loading = true;
  },
  getlikedCommentsSuccess: (state, action) => {
    state.loading = false;
    state.likedComments = action.likedComments;
    state.dislikedComments = action.dislikedComments;
  },
  getlikedCommentsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});


export const allUsersReducer = createReducer(initialState, {
  getAllUsersRequest: (state) => {
    state.usersLoading = true;
  },
  getAllUsersSuccess: (state, action) => {
    state.usersLoading = false;
    state.users = action.payload;

  },
  getAllUsersFailure: (state, action) => {
    state.usersLoading = false;
    state.userError = action.payload;
  },
  clearErrors: (state) => {
    state.userError = null;
  },
});

export const userProfileReducer = createReducer(initialState, {
  userProfileRequest: (state) => {
    state.loading = true
  },
  userProfileSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },
  userProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});