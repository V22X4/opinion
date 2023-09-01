import React from 'react';
import styles from './Profile.module.css';
import Header from '../../components/Header/Header';
import ProfileOptions from '../../components/ProfileOptions/ProfileOptions';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import ProfileLikes from '../../components/ProfileLikes/ProfileLikes';
import Loaduser from '../../components/Loaduser/Loaduser';


const Profile = () => {
    return (
        <>
            <Loaduser/>
            <Header/>
            <div className={styles.profileContainer}>
                <div className={styles.profile}><ProfileOptions /></div>
                <div className={styles.profile}><ProfileInfo /></div>
                <div className={styles.profile}><ProfileLikes /></div>
            </div>
      </>
    
  );
};

export default Profile;
