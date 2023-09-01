import React, { useEffect, useMemo, useState } from 'react';
import Comment from './CommentComponent';
import styles from './CommentsSection.module.css';
import { addCommentOnPost, getALLcommentByPost } from '../../Actions/CommentAction';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CommentSection = (props) => {
  const commentList = useSelector((state) => state.getComment?.comments);
  const propComments = props?.comments;
  const addComment = props?.addComment;
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [renderedComments, setRenderedcomments] = useState([]);
  const [newCommentreq, setNewCommentREQ] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const dispatch = useDispatch();


  useEffect(() => {
    if (addComment) {
      const getcomments = async () => {
        dispatch(getALLcommentByPost(props?.post_id));
      }
  
      getcomments();
      setRefresh(1 - refresh);
    }
    
  }, [newCommentreq]);


  const handleAddComment = async () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (newComment.trim() !== '') {
      await dispatch(addCommentOnPost(props?.post_id, newComment)); 
      setNewCommentREQ(1 - newCommentreq);
    }
  };

  useEffect(() => {
    if (addComment) {
      setRenderedcomments(commentList.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
        />
      )))
    } else {
      setRenderedcomments(propComments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
        />
      )))
    }
  }, [commentList, propComments, addComment, refresh])



  return (
    <div className={styles.commentSectionContainer}>
      {
        addComment &&
        <div className={styles.addComment}>
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onFocus={() => {
            if (!isAuthenticated) {
              navigate('/login');
            }
          }}
          className={styles.addCommentInput}
        />
        <button onClick={handleAddComment} className={styles.addCommentButton}>
          Add Comment
        </button>
      </div>
      }
      
      <div className={styles.commentList}>
        {((commentList.length === 0 && addComment) || (propComments.length === 0 && !addComment)) ? (
          <div className={styles.DefaultMessage}>
              No comments here.
          </div>
        ) : 
          (
            renderedComments
        )
        }
      </div>
    </div>
  );
};

export default CommentSection;
