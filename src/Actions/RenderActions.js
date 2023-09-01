export const feedchange = (feedtype) => async (dispatch) => {
    try {

      dispatch({
        type: "feedchange",
        selectedFeed: feedtype,
      });
        
    } catch (error) {
      dispatch({
        type: "feedChangeFailure",
        payload: error.response.data.message,
      });
    } 
};

export const profileInfochange = (profileInfotype) => async (dispatch) => {
    try {

      dispatch({
        type: "profileInfochange",
        selectedInfo: profileInfotype,
      });
        
    } catch (error) {
      dispatch({
        type: "profileInfoFailure",
        payload: error.response.data.message,
      });
    } 
};

export const followchange = (followtype) => async (dispatch) => {
    try {

      dispatch({
        type: "followchange",
        selectedfollow: followtype,
      });
        
    } catch (error) {
      dispatch({
        type: "followFailure",
        payload: error.response.data.message,
      });
    } 
};


export const Postchange = (Posttype) => async (dispatch) => {
    try {

      dispatch({
        type: "Postchange",
        selectedPost: Posttype,
      });
        
    } catch (error) {
      dispatch({
        type: "PostFailure",
        payload: error.response.data.message,
      });
    } 
};

export const likedPostchange = (likedPosttype) => async (dispatch) => {
  try {

    dispatch({
      type: "likedPostchange",
      selectedlikedPost: likedPosttype,
    });
      
  } catch (error) {
    dispatch({
      type: "likedPostFailure",
      payload: error.response.data.message,
    });
  } 
};

export const likechange = (like) => async (dispatch) => {
  try {

    dispatch({
      type: "likechange",
      selectedlike: like,
    });
      
  } catch (error) {
    dispatch({
      type: "likeFailure",
      payload: error.response.data.message,
    });
  } 
};

