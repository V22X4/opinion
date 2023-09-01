import React from 'react'
import Post from '../Post/Post'
import FeedCSS from './Feed.module.css'


function Feed(props) {
  return (
    <div className={FeedCSS['Feed-container']}>
      <div className={FeedCSS.Feed}>
      {props?.posts?.map((postx) => (
                <div key={postx._id}>
                  <Post post={postx} />
                </div>
              ))}
      </div>
    </div>
  )
}

export default Feed
