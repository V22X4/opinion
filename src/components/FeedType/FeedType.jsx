import React, { useEffect, useState } from 'react';
import styles from './FeedType.module.css';
import FollowingFeed from '../Feed/FollowingFeed';
import DiscoverFeed from '../Feed/DiscoverFeed';
import { useSelector } from 'react-redux';
import TypeSwitch from '../TypeSwitch/TypeSwitch';
import { feedchange } from '../../Actions/RenderActions';

const FeedTypeSwitch = () => {
  const showComments = useSelector((state) => state.like.showComments);
  const allcomments = useSelector((state) => state.like.comments);
  const selectedFeed = useSelector((state) => state.render.selectedFeed);
  const [commentsKey, setCommentsKey] = useState(false);


  useEffect(() => {
    if (showComments) {
      setCommentsKey(1 - commentsKey);
    }
  }, [showComments, allcomments]);


  return (
    <div className={styles['FeedType-container']}>
      <div className={styles['feed-type-switch']}>
        <div className={styles['oval-outline']}></div>
        <TypeSwitch types={["Following", "Discover"]} req={feedchange} />
        <div className={styles['feed-content']}>
          {selectedFeed === 'Following' && <FollowingFeed />}
          {selectedFeed === 'Discover' && <DiscoverFeed />}
        </div>
      </div>
    </div>
  );
};

export default FeedTypeSwitch;
