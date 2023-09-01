import axios from "axios";



export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });

    console.log("login");

    const  {data}  = await axios.post(
      `http://localhost:4000/api/v1/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
          // withCredentials: true, 
          // credentials: "include",
          // credentials: true,
        }
      }
    );


    dispatch({
      type: "LoginSuccess",
      payload: data.user,
    });

    console.log("login succ");

  } catch (error) {
    dispatch({
      type: "LoginFailure",
      payload: error.response.data.message,
    });
  }
};


export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

    const  {data}  = await axios.get("/api/v1/me");
    dispatch({
      type: "LoadUserSuccess",
      payload: data,
    });
    dispatch({
      type: "LoginSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const getPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getPostsRequest",
    });

    const { data } = await axios.get("/api/v1/posts");
    dispatch({
      type: "getPostsSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "getPostsFailure",
      payload: error.response.data.message,
    });
  }
};

export const getikedPosts = (username) => async (dispatch) => {
  try {
    dispatch({
      type: "getlikedPostsRequest",
    });

    const { data } = await axios.get(`/api/v1/like/posts/${username}`);
    dispatch({
      type: "getlikedPostsSuccess",
      likedPosts: data.likedPosts,
      dislikedPosts: data.dislikedPosts,
    });
  } catch (error) {
    dispatch({
      type: "getlikedPostsFailure",
      payload: error.response.data.message,
    });
  }
}; 

export const getLikedComments = (username) => async (dispatch) => {
  try {
    dispatch({
      type: "getlikedCommnetsRequest",
    });

    const { data } = await axios.get(`/api/v1/like/comments/${username}`);

    dispatch({
      type: "getlikedCommentsSuccess",
      likedComments: data.likedComments,
      dislikedComments: data.dislikedComments,
    });
  } catch (error) {
    dispatch({
      type: "getlikedCommentsFailure",
      payload: error.response.data.message,
    });
  }
};


export const getAllUsers= (username=null) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllUsersRequest",
    });
    

    const {data} = !username? await axios.get(`/api/v1/users/all?username=`):await axios.get(`/api/v1/users/all?username=${username}`)
    dispatch({
      type: "getAllUsersSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "getAllUsersFailure",
      payload: error.response.data.message,
    });
  }
};

export const getMyPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "myPostsRequest",
    });

    const { data } = await axios.get("/api/v1/me/posts");
    dispatch({
      type: "myPostsSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "myPostsFailure",
      payload: error.response.data.message,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LogoutUserRequest",
    });

    console.log('logout initiated')

    await axios.get("/api/v1/logout");

    console.log('logout success')

    dispatch({
      type: "LogoutUserSuccess",
    });
  } catch (error) {
    dispatch({
      type: "LogoutUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const registerUser =
  (username, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: "RegisterRequest",
      });

      console.log("RegisterRequest")

      const { data } = await axios.post(
        "/api/v1/register",
        { username, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "RegisterSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "RegisterFailure",
        payload: error.response.data.message,
      });
    }
  };

export const updateProfile = (username, email) => async (dispatch) => {
  try {
    dispatch({
      type: "updateProfileRequest",
    });

    const { data } = await axios.put(
      "/api/v1/me/update",
      { username, email},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "updateProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({
        type: "updatePasswordRequest",
      });

      const { data } = await axios.put(
        "/api/v1/me/password/update",
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "updatePasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updatePasswordFailure",
        payload: error.response.data.message,
      });
    }
  };

export const deleteMyProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProfileRequest",
    });

    const { data } = await axios.delete("/api/v1/me/delete");

    dispatch({
      type: "deleteProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "forgotPasswordRequest",
    });

    const { data } = await axios.post(
      "/api/v1/forgot/password",
      {
        email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "forgotPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "forgotPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({
      type: "resetPasswordRequest",
    });

    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      {
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "resetPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "resetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

export const getUserPosts = (username) => async (dispatch) => {
  try {
    dispatch({
      type: "userPostsRequest", 
    });

    const { data } = await axios.get(`/api/v1/user/posts/${username}`);
    dispatch({
      type: "userPostsSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "userPostsFailure",
      payload: error.response.data.message,
    });
  }
};

export const getUserProfile = (username) => async (dispatch) => {
  try {
    dispatch({
      type: "userProfileRequest",
    });

    const { data } = await axios.get(`/api/v1/user/${username}`);
    dispatch({
      type: "userProfileSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "userProfileFailure",
      payload: error.response.data.message,
    });
  }
};



export const followAndUnfollowUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "followUserRequest",
    });

    const { data } = await axios.put(`/api/v1/user/follow/${id}`);
    console.log(data);
    dispatch({
      type: "followUserSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "followUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const CheckfollowUser = (username) => async (dispatch) => {
  try {

    const { data } = await axios.get(`/api/v1/user/checkfollow/${username}`);
    console.log(data, "ffff");
    dispatch({
      type: "CheckfollowUserSuccess",
      isFollowed: data.isFollowed,
    });
  } catch (error) {
    dispatch({
      type: "CheckfollowUserFailure",
      payload: error.response.data.message,
    });
  }
};