import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import Feed from './Feed';

function DiscoverFeed() {
  const newPostSuccess = useSelector((state) => state.like.newpost);
  const [posts, setPosts] = useState([]);

  useEffect(() => {

    const fetchallPosts = async() => {
        const { data } = await axios.get('http://localhost:4000/api/v1/posts');
        setPosts(data.posts);
    }
      
    fetchallPosts();
    
  }, [newPostSuccess])

  return (
    <Feed posts={posts}/>
  )
}

export default DiscoverFeed
