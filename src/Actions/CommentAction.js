import axios from "axios";

export const addCommentOnPost = (id, comment) => async (dispatch) => {
    try {
      dispatch({
        type: "addCommentRequest",
      });
      
  
      const { data } = await axios.put(
        `/api/v1/post/comment/${id}`,
        {
          comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "addCommentSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "addCommentFailure",
        payload: error.response.data.message,
      });
    }
};

export const getALLcommentByPost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getALLcommentByPostRequest",
    });

    const { data } = await axios.get(`/api/v1/post/comment/${id}`);
    dispatch({
      type: "getALLcommentByPostSuccess",
      payload: data.comments,
    });
  } catch (error) {
    dispatch({
      type: "getALLcommentByPostFailure",
      payload: error.response.data.message,
    });
  } 
};

  

  
  export const deleteCommentOnPost = (id, commentId) => async (dispatch) => {
    try {
      dispatch({
        type: "deleteCommentRequest",
      });
      const data  = await axios.delete(`/api/v1/post/comment/${id}`, {
        data: {commentId} ,
        

      });
      dispatch({
        type: "deleteCommentSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "deleteCommentFailure",
        payload: error.response,
      });
    }
};
  

export const likeComment = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "CommentlikeRequest",
      });
  
      const { data } = await axios.get(`/api/v1/comment/like/${id}`);

      dispatch({
        type: "CommentlikeSuccess",
        payload: data.message,
        isLiked: data.isLiked,
        votes: data.votes,
        votedComment: data.votedComment,
      });
    } catch (error) {
      dispatch({
        type: "CommentlikeFailure",
        payload: error.response.data.message,
      });
    } 
};


export const dislikeComment = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "CommentdislikeRequest",
      });
  
      const { data } = await axios.get(`/api/v1/comment/dislike/${id}`);

      dispatch({
        type: "CommentdislikeSuccess",
        payload: data.message,
        isdisLiked: data.isdisLiked,
        votes: data.votes,
        votedComment: data.votedComment,
      });
    } catch (error) {
      dispatch({
        type: "CommentlikeFailure",
        payload: error.response.data.message,
      });
    } 
};