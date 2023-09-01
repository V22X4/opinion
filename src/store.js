import { configureStore } from "@reduxjs/toolkit";
import { likeReducer, myPostsReducer, userPostsReducer } from "./Reducers/PostReducer";
import { allUsersReducer, getPostsReducer, userProfileReducer, userReducer } from "./Reducers/UserReducer";
import {likeCommentReducer, getCommentReducer} from './Reducers/CommentReducer'
import { RenderReducer } from "./Reducers/RenderReducer";
const initialState = {};

const store = configureStore({
    reducer : {
        user : userReducer,
        getPosts : getPostsReducer,
        allUsers: allUsersReducer,
        like: likeReducer,
        myposts :myPostsReducer,
        userProfile: userProfileReducer,
        userPosts: userPostsReducer,
        likeComment: likeCommentReducer,
        getComment: getCommentReducer,
        render: RenderReducer,
    }
});

export default store