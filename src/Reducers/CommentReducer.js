import { createReducer } from "@reduxjs/toolkit";

const initialState = { comments: [], newComment: 0 };

export const likeCommentReducer = createReducer(initialState, {

        addCommentRequest: (state) => {
            state.loading = true;
        },
        addCommentSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        addCommentFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
            
        deleteCommentRequest: (state) => {
            state.loading = true;
        },
        deleteCommentSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        deleteCommentFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
            
        CommentlikeRequest: (state) => {
            state.loading = true;
        },  
        CommentlikeSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.isLiked = action.isLiked;
            state.votedComment = action.votedComment;
            state.votes = action.votes;
        },
        
        CommentlikeFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
            
        CommentdislikeRequest: (state) => {
            state.loading = true;
        },
        
        CommentdislikeSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.isdisLiked = action.isdisLiked;
            state.votedComment = action.votedComment;
            state.votes = action.votes;
        },
    
        CommentdislikeFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
});

export const getCommentReducer = createReducer(initialState, {
        getALLcommentByPostRequest: (state) => {
            state.loading = true;
        },
    
        getALLcommentByPostSuccess: (state, action) => {
            state.loading = false;
            state.comments = action.payload;
        },
    
        getALLcommentByPostFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
})