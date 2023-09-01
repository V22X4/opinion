import axios from "axios";

export const likePost = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "likeRequest",
      });
  
      const { data } = await axios.get(`/api/v1/post/like/${id}`);
      console.log(data);

      dispatch({
        type: "likeSuccess",
        payload: data.message,
        isLiked: data.isLiked,
        votes: data.votes,
        votedpost: data.votedpost,
      });
    } catch (error) {
      dispatch({
        type: "likeFailure",
        payload: error.response.data.message,
      });
    } 
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getpostRequest",
    });

    const { data } = await axios.get(`/api/v1/post/${id}`);
    dispatch({
      type: "getpostsuccess",
      payload: data.post,
    });
  } catch (error) {
    dispatch({
      type: "getpostFailure",
      payload: error.response.data.message,
    });
  } 
};

export const dislikePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "dislikeRequest",
    });

    const { data } = await axios.get(`/api/v1/post/dislike/${id}`);
    console.log(data);
    dispatch({
      type: "dislikeSuccess",
      payload: data.message,
      isLiked: data.isdisLiked,
      votes: data.votes,
      votedpost: data.votedpost,
    });
  } catch (error) {
    dispatch({
      type: "dislikeFailure",
      payload: error.response.data.message,
    });
  } 
};

export const showComments = (showComments, post) => async (dispatch) => {
  try {
    dispatch({
      type: "showCommentRequest",
      payload: post,
     })
  } catch {

  }
 }
  
  export const createNewPost = (caption) => async (dispatch) => {
    try {
      dispatch({
        type: "newPostRequest",
      });

      console.log('newPostRequest')
  
      const { data } = await axios.post(
        'http://localhost:4000/api/v1/post/upload',
        {
          caption,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          // withCredentials: true, 
          credentials: true,

        }
      );

      console.log('newPostSuccess')

      dispatch({
        type: "newPostSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "newPostFailure",
        payload: error.response.data.message,
      });
    }
  };
  
  export const updatePost = (caption, id) => async (dispatch) => {
    try {
      dispatch({
        type: "updateCaptionRequest",
      });
  
      const { data } = await axios.put(
        `/api/v1/post/${id}`,
        {
          caption,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "updateCaptionSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updateCaptionFailure",
        payload: error.response.data.message,
      });
    }
  };
  
  export const deletePost = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "deletePostRequest",
      });

      
  
      const { data } = await axios.delete(`/api/v1/post/${id}`);
      dispatch({
        type: "deletePostSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "deletePostFailure",
        payload: error.response.data.message,
      });
    }
  };