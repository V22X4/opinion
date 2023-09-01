import React, { useEffect } from 'react'
import styles from './PostList.module.css'
import Post from '../Post/Post'

function PostList({ posts }) {
    useEffect(() => {
        console.log(posts);
    },[])
  return (
        <div className={styles['Post-container']}>
          <div className={styles.Post}>
          {posts.map((postx) => (
                    <div key={postx.id}>
                      <Post post={postx} />
                    </div>
                  ))}
          </div>
        </div>
      )
}

export default PostList