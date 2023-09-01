import React from 'react';
import Header from '../../components/Header/Header';
import PostOpinion from '../../components/PostOpinion/PostOpinion';
import FeedType from '../../components/FeedType/FeedType';
import HomeCSS from './Home.module.css';
import Loaduser from '../../components/Loaduser/Loaduser';

function Home() {

  return (
    <div className={HomeCSS['home-container']}>
      <Loaduser/>
      <Header />
      <PostOpinion />
      <FeedType />      
    </div>
  );
}

export default Home;
