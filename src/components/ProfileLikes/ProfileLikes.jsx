import React, { useEffect, useState } from 'react'
import styles from './ProfileLikes.module.css'
import TypeSwitch from '../TypeSwitch/TypeSwitch'
import { likechange, likedPostchange } from '../../Actions/RenderActions'
import { useDispatch, useSelector } from 'react-redux'
import PostList from '../PostList/PostList'
import CommentSection from '../Comments/CommentSection'
import { getLikedComments, getikedPosts } from '../../Actions/UserActions'
import { useParams } from 'react-router-dom'
import Feed from '../Feed/Feed'

function ProfileLikes() {
    const posttype = useSelector((state) => state.render?.selectedlikedPost);
    const liketype = useSelector((state) => state.render?.selectedlike);
    const profile = useSelector((state) => state.userProfile?.user);
    const [commentList, setCommentsList] = useState([]);
    const [postList, setPostList] = useState([]);
    const likedpostList = useSelector((state) => state.getPosts?.likedPosts);
    const dislikedpostList = useSelector((state) => state.getPosts?.dislikedPosts);
    const likedCommentsList = useSelector((state) => state.getPosts?.likedComments);
    const dislikedCommentsList = useSelector((state) => state.getPosts?.dislikedComments);
    const dispatch = useDispatch();
    const { username } = useParams();

  
    useEffect(() => {
        if (posttype !== "Posts") {
            setCommentsList(liketype === "Liked" ? likedCommentsList : dislikedCommentsList);
        } else {
            setPostList(liketype === "Liked" ? likedpostList : dislikedpostList);
            console.log(postList, "hf")
        }
      
    }, [liketype, posttype, profile]);

    useEffect(() => {
        const sendreq = async () => {
            await dispatch(getikedPosts(username));
            await dispatch(getLikedComments(username));
        }

        sendreq();
    }, [username]);

  return (
    <div className={styles.profileInfo}>
    
        <div className="switch-container">
            <div className={styles.switch}>
                <TypeSwitch types={["Posts", "Comments"]} req={likedPostchange} />
            </div>
            <div className={styles.switch}>
                <TypeSwitch types={["Liked", "Disliked"]} req={likechange} />
            </div>   
        </div>
       
        
          
        <div className="list-container">
                {
                    posttype === "Posts" ? 
                        <Feed posts={ postList }/>
                        :
                        <CommentSection comments={ commentList }/>
                } 
          </div>
    </div>
  )
}

export default ProfileLikes