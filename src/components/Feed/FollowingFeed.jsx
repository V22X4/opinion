import React, { useEffect, useState } from 'react';
import styles from './Feed.module.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Feed from './Feed';

function FollowingFeed() {
  const [posts, setPosts] = useState([]);
  const newPostSuccess = useSelector((state) => state.like.newpost);
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchAllPosts = async () => {
        const { data } = await axios.get('http://localhost:4000/api/v1/posts/following');
        setPosts(data.posts);
      };

      fetchAllPosts();
    }
  }, [isAuthenticated, newPostSuccess]);

  
  

  return (
    <>
      {isAuthenticated ? (
        posts.length === 0 ? (
          <div className={styles.DefaultMessage}>
            Follow Users to see opinions of friends and discover other accounts you'll love.
          </div>
        ) : (
            
               <Feed posts={posts} />
        
           )
      ) : (
        <div className={styles.DefaultMessage}>
          Log in to see opinions of friends and discover other accounts you'll love.
        </div>
      )} 
  
    </>
        
  
  );
}

export default FollowingFeed;
