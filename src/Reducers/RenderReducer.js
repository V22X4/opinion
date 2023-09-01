import { createReducer } from "@reduxjs/toolkit";

const initialState = {selectedFeed : "Following", selectedInfo : "follow", selectedfollow: "Followers", selectedPost: "Posts", selectedlikedPost: "Posts", selectedlike: "liked"};

export const RenderReducer = createReducer(initialState, {
    feedchange: (state, action) => {
        state.selectedFeed = action.selectedFeed;
    },
    feedChangeFailure: (state, action) => {
        state.error = action.payload;
    },
    profileInfochange: (state, action) => {
        state.selectedInfo = action.selectedInfo;
    },
    profileInfoFailure: (state, action) => {
        state.error = action.payload;
    },
    followchange: (state, action) => {
        state.selectedfollow = action.selectedfollow;
    },
    followFailure: (state, action) => {
        state.error = action.payload;
    },
    Postchange: (state, action) => {
        state.selectedPost = action.selectedPost;
    },
    PostFailure: (state, action) => {
        state.error = action.payload;
    },
    likedPostchange: (state, action) => {
        state.selectedlikedPost = action.selectedlikedPost;
    },
    likedPostFailure: (state, action) => {
        state.error = action.payload;
    },
    likechange: (state, action) => {
        state.selectedlike = action.selectedlike;
    },
    likeFailure: (state, action) => {
        state.error = action.payload;
    }
})