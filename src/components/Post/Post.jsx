import React, { useEffect, useState } from 'react';
import PostCSS from './Post.module.css';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CommentsSection from '../Comments/CommentSection';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { dislikePost, likePost, showComments } from '../../Actions/PostActions';
import { useNavigate } from 'react-router-dom';

const CustomArrowUpwardIcon = styled(ArrowUpwardIcon)(({ theme }) => ({
  fontSize: '12px', 
}));

const CustomArrowDownwardIcon = styled(ArrowDownwardIcon)(({ theme }) => ({
  fontSize: '12px',
}));

const Post = ({ post }) => {
  const [votes, setVotes] = useState(post.likes.length - post.dislikes.length);
  const [showcomments, setShowComments] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);
  const votedpost = useSelector((state) => state.like.votedpost);
  const { loading } = useSelector((state) => state.like);
  const fetchedVotes = useSelector((state) => state.like.votes);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowComment = () => {
    setShowComments(!showcomments);
  }


  const handleUpvote = async () => {
    if (!isAuthenticated) navigate('/login');
    else await dispatch(likePost(post._id));
  };

  const handleDownvote = async() => {
    if (!isAuthenticated) navigate('/login');
    else await dispatch(dislikePost(post._id));
  };
  
  useEffect(() => {
    if (!loading && votedpost === post._id) {
      setVotes(fetchedVotes);
    }
  }, [loading]);

  const handleUserProfileClick = () => {
    navigate(`/user/${post.owner.username}`);
  };
  

  return (
    <>
    <div className={PostCSS.post}>
        <div className={PostCSS.votes}>
                <button onClick={async() => { await handleUpvote();}} className={`${PostCSS.voteButton} ${PostCSS.upvoteButton}`}>
                <CustomArrowUpwardIcon className={`${PostCSS.arrowIcon} ${PostCSS.upvoteButton}`} />
              </button>
              <span className={PostCSS.voteCount}>{votes}</span>
              <button onClick={async() => {await handleDownvote();}} className={`${PostCSS.voteButton} ${PostCSS.downvoteButton}`}>
                <CustomArrowDownwardIcon className={`${PostCSS.arrowIcon} ${PostCSS.downvoteButton}`} />
              </button>
      </div>
      
      <div className={PostCSS.content}>
        <p>{post.caption}</p>
      </div>
      <div className={PostCSS.owner}>
          <p onClick={handleUserProfileClick} className={PostCSS.ownerLink}>: {post.owner.username}</p>
        </div>
      <div className={PostCSS.comments}>
        <button onClick={handleShowComment} className={PostCSS['comments-button']}>View Comments</button>
      </div>
    </div>
      {showcomments && <CommentsSection comments={post.comments} post_id={post._id} addComment={ true } />}
    </>
  );
};

export default Post;
