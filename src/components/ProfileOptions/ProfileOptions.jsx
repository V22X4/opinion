import React, { useEffect, useState } from 'react';
import styles from './ProfileOptions.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { profileInfochange } from '../../Actions/RenderActions';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckfollowUser, followAndUnfollowUser, getUserProfile } from '../../Actions/UserActions';

const ProfileOptions = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.userProfile?.user);
  const { isAuthenticated } = useSelector((state) => state.user);
  const loggedinuser = useSelector((state) => state.user?.currentUser?.username);
  // const user = useSelector((state) => state.user?.currentUser);
  const followedatStart = useSelector((state) => state.user?.isFollowed);
  const [followed, setFollowed] = useState(followedatStart);
  const { username } = useParams();
  const navigate = useNavigate();

  const handleFollow = () => {

      const sendreq = async () => {
        await dispatch(followAndUnfollowUser(username));
        await dispatch(getUserProfile(username));
        setFollowed(!followed);
      }


      if (isAuthenticated) sendreq();
      else navigate('/login');
    
  }

  const handleFollowChange = () => {

    
      const sendreq = async () => {
        await dispatch(profileInfochange("follow"));
      }
      sendreq();
    
  };

  useEffect(() => {
    console.log(followedatStart, "flas")
    setFollowed(followedatStart);
  }, [followedatStart]);

  const handlePostChange = () => {
    const sendreq = async() => {
      await dispatch(profileInfochange("posts"));
    }
    sendreq();
  };

  useEffect(() => {
    const getProfile = async () => {
      await dispatch(getUserProfile(username));
      await dispatch(CheckfollowUser(username));
    }
    getProfile();
  }, [username, dispatch]);

  return (
    <div className={styles.profileOptions}>
      <div className={styles.userInfo}>
        <h2>{ profile?.username }</h2>
        <p>Joined: {profile?.joined?.substring(0, 10)}</p>
      </div>
      <div className={styles.options}>
        <button className={styles.optionButton} onClick={() => handleFollowChange()}>
          <h3>Followers</h3>
          <p>{ profile?.followers?.length }</p>
        </button>
        <button className={styles.optionButton} onClick={() => handleFollowChange()}>
          <h3>Following</h3>
          <p>{ profile?.following?.length }</p>
        </button>
        <button className={styles.optionButton} onClick={() => handlePostChange()}>
          <h3>Posts</h3>
          <p>{ profile?.posts?.length }</p>
        </button>
        <button className={styles.optionButton} onClick={() => handlePostChange()}>
          <h3>Comments</h3>
          <p>{ profile?.comments?.length }</p>
        </button>
        <button className={styles.optionButton} >
          <h3>Likes</h3>
          <p>-</p>
        </button>
        <button className={styles.followButton} onClick={handleFollow} disabled={loggedinuser === username}>
          {(followed ? "Following" : "Follow")}
        </button>
      </div>
    </div>
  );
};

export default ProfileOptions;
