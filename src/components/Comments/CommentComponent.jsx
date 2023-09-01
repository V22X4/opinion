import React, { useEffect, useState } from 'react';  // Import useState for managing state
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { styled } from '@mui/system';
import styles from './Comment.module.css';
import { dislikeComment, likeComment } from '../../Actions/CommentAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CustomArrowUpwardIcon = styled(ArrowUpwardIcon)(({ theme }) => ({
  fontSize: '12px', 
}));

const CustomArrowDownwardIcon = styled(ArrowDownwardIcon)(({ theme }) => ({
  fontSize: '12px',
}));

const Comment = ({ comment }) => {
  const [votes, setVotes] = useState(comment.likes.length - comment.dislikes.length);
  const { isAuthenticated } = useSelector((state) => state.user);
  const votedComment = useSelector((state) => state.likeComment.votedComment);
  const  loading  = useSelector((state) => state.likeComment.loading);
  const fetchedVotes = useSelector((state) => state.likeComment.votes);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowComment = () => {
    // setShowComments(!showcomments);
  }

  const handleUpvote = async () => {
    if (!isAuthenticated) navigate('/login');
    else await dispatch(likeComment(comment._id));
  };

  const handleDownvote = async() => {
    if (!isAuthenticated) navigate('/login');
    else await dispatch(dislikeComment(comment._id));
  };
  
  useEffect(() => {
    console.log(comment);
    if (!loading && votedComment === comment._id) {
      setVotes(fetchedVotes);
    }
  }, [loading]);


  return (
    <div className={styles.comment}> 
      <div className={styles.votes}>
        <button onClick={async() => { await handleUpvote();}} className={`${styles.voteButton} ${styles.upvoteButton}`}>
          <CustomArrowUpwardIcon className={`${styles.arrowIcon} ${styles.upvoteButton}`} />
        </button>
        <div className={styles.voteCount}>{votes}</div>
        <button onClick={async() => { await handleDownvote();}} className={`${styles.voteButton} ${styles.downvoteButton}`}>
          <CustomArrowDownwardIcon className={`${styles.arrowIcon} ${styles.downvoteButton}`} />
        </button>
      </div>
      {/* <div className={styles.owner}>  
        <p><a href="/thisuser" className={`${styles.ownerLink}`}>{comment.commentedByUser
.username}</a></p>
      </div> */}
      <div className={styles.content}>  
        <p>{comment.comment}</p>
      </div>
      {/* <div className={styles.comments}>  
        <button onClick={handleShowComment} className={styles['comments-button']}>View Comments</button>
      </div> */}
    </div>
  );
};


export default Comment;
