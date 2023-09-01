import React, { useEffect, useState } from 'react';
import styles from './ProfileInfo.module.css'; 
import TypeSwitch from '../TypeSwitch/TypeSwitch';
import { Postchange, followchange } from '../../Actions/RenderActions';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPosts, getUserProfile } from '../../Actions/UserActions';
import { useParams } from 'react-router-dom';
import UserList from '../UserList/UserList';
import PostList from '../PostList/PostList';
import Feed from '../Feed/Feed';
import CommentSection from '../Comments/CommentSection';

function ProfileInfo() {
  const [showFollowing, setShowFollowing] = useState(true);
  const switchtypes = useSelector((state) => state.render?.selectedInfo);
  const followtype = useSelector((state) => state.render?.selectedfollow);
  const Posttype = useSelector((state) => state.render?.selectedPost);
  const profile = useSelector((state) => state.userProfile?.user);
  const postlist = useSelector((state) => state.getPosts?.userposts);
  const commentslist = useSelector((state) => state.userProfile?.user?.comments);
  const [userList, setUserList] = useState([]);
  const { username } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (switchtypes === "follow") {
      setUserList(followtype === "Followers" ? profile?.followers : profile?.following);
    }
  }, [switchtypes, followtype, profile, username]);

  useEffect(() => {
    const getProfile = async () => {
      await dispatch(getUserPosts(username));
    }
    getProfile();
  }, [username, dispatch]);


  return (
    <div className={styles.profileInfo}>
      <TypeSwitch types={(switchtypes === "follow" ? ["Followers", "Following"] : ["Posts", "Comments"])} req={(switchtypes === "follow" ? followchange : Postchange)} />
      <div className="list-container">
        {switchtypes === "follow" ? (
          <UserList userList={userList} />
        ) : (
          Posttype === "Posts" ? (
            <Feed posts={postlist} />
          ) : (
                <CommentSection comments={commentslist} addComment={ false } />
          )
        )}
      </div>
    </div>
  );
}

export default ProfileInfo;
