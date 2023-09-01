import React, { useEffect, useState } from 'react';
import styles from './UserList.module.css';
import { useNavigate } from 'react-router-dom';

const UserList = ({ userList }) => {
  const navigate = useNavigate();
  const [RenderedUserList, setRenderedUserList] = useState();

  const handleUserClick = (username) => {
    navigate(`/user/${username}`);
  };

  useEffect(() => {
    console.log(userList);
    setRenderedUserList(userList?.map((user) => (
      <div
        className={styles.user}
        key={user?._id}
        onClick={() => handleUserClick(user?.username)}
      >
        {user?.username}
      </div>
    )));
  }, [userList]);

  return (
    <div className={styles.userListSectionContainer}>
      <div className={styles.userList}>
        {userList?.length === 0 ? (
          <div className={styles.defaultMessage}>Nothing here.</div>
        ) : (
          RenderedUserList
        )}
      </div>
    </div>
  );
};

export default UserList;
